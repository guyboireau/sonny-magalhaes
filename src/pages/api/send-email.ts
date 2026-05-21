import type { APIRoute } from 'astro';
import { Resend } from 'resend';

/* ─── Rate limiter simple (in-memory, par IP) ──────────────────────────── */
interface RateLimitEntry {
    count: number;
    resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function getClientIP(request: Request): string {
    const xfwd = request.headers.get('x-forwarded-for');
    if (xfwd) return xfwd.split(',')[0].trim();
    return request.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return { allowed: true };
    }
    if (entry.count >= RATE_LIMIT_MAX) {
        return { allowed: false, retryAfter: Math.ceil((entry.resetTime - now) / 1000) };
    }
    entry.count += 1;
    return { allowed: true };
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const ip = getClientIP(request);
        const rate = checkRateLimit(ip);
        if (!rate.allowed) {
            return new Response(JSON.stringify({ error: 'Trop de requêtes, veuillez réessayer plus tard.' }), {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Retry-After': String(rate.retryAfter),
                },
            });
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'RESEND_API_KEY non configurée' }), {
                status: 503, headers: { 'Content-Type': 'application/json' },
            });
        }
        const resend = new Resend(apiKey);
        const body = await request.json();

        /* ─── Honeypot : champ caché que les bots remplissent ─────────────── */
        if (body.website) {
            return new Response(JSON.stringify({ error: 'Requête invalide' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const name = body.name ?? body.nom;
        const email = body.email;
        const message = body.message;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Champs manquants" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
            return new Response(JSON.stringify({ error: "Types invalides" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (name.length > 100 || email.length > 254 || message.length > 5000) {
            return new Response(JSON.stringify({ error: "Champs trop longs" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        // Envoi de l'email via Resend
        const data = await resend.emails.send({
            from: 'Contact <onboarding@resend.dev>', // Modifiez avec votre domaine vérifié
            to: ['votre@email.com'], // Remplacez par votre email de réception
            subject: `Nouveau message de ${safeName} (Site Vitrine)`,
            html: `
                <h3>Nouveau message reçu depuis le site</h3>
                <p><strong>Nom :</strong> ${safeName}</p>
                <p><strong>Email :</strong> ${safeEmail}</p>
                <p><strong>Message :</strong></p>
                <p>${safeMessage}</p>
            `
        });

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erreur serveur" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
