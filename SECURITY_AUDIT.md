# Security Audit Report — site-vitrine-template

**Date** : 2026-05-15  
**Auditor** : Claude (Security Engineer)  
**Scope** : Source code, configuration files, HTTP headers, client-side scripts, API routes, secrets scan (manual review).  
**Limitations** : Automated dependency scanning (`npm audit`) and external CVE lookups were **blocked by sandbox restrictions**. This report contains exhaustive manual findings, but the dependency/CVE section is pending. It is strongly recommended to run `npm audit` locally and append the results.

---

## Executive Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 2 |
| Medium | 4 |
| Low | 4 |

**Positive controls observed** :
- `.env` and `.env.production` are excluded via `.gitignore`.
- No hardcoded secrets, API keys, or database credentials were found in the source.
- The email endpoint does not leak stack traces or verbose errors.
- Basic server-side input validation (type check, length limits) is present.
- Strong baseline HTTP security headers are configured (`HSTS`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).

---

## HIGH-1 : Absence de rate limiting sur `/api/send-email`

- **Fichier** : `src/pages/api/send-email.ts`
- **Description** : Le point d'API `POST /api/send-email` accepte des requetes sans limitation de debit, CAPTCHA, ni controle par IP. Un attaquant peut lancer un bombardement automatisé (spam), epuiser le quota Resend, et deteriorer la reputation d'envoi du domaine.
- **Impact** : Exhausion de quota, spam, deni de service partiel sur la fonctionnalite email.
- **Remediation** :
  1. Implementer un rate limiting cote serveur (ex. : `lru-cache`, Upstash Redis, ou middleware Vercel Edge Config).
  2. Ajouter un champ honeypot invisible valide cote serveur.
  3. Integrer un CAPTCHA invisible (Cloudflare Turnstile, hCaptcha) avant soumission.

---

## HIGH-2 : Mismatch CSP / risque supply-chain (script Phosphor Icons)

- **Fichiers** : `src/layouts/Layout.astro`, `vercel.json`
- **Description** :
  - `Layout.astro` charge `<script src="https://unpkg.com/@phosphor-icons/web"></script>` sans attribut `integrity` (SRI).
  - Le CSP defini dans `vercel.json` n'autorise pas `https://unpkg.com` dans `script-src`, ce qui bloque fonctionnellement le script.
  - Si un developpeur "corrige" le CSP en ajoutant `https://unpkg.com` sans SRI, le site devient vulnerable a une attaque de la chaine d'approvisionnement (compromission du CDN = execution de JS arbitraire).
  - De plus, la directive `'unsafe-inline'` dans `script-src` et `style-src` affaiblit considerablement la protection XSS apportee par le CSP.
- **Remediation** :
  1. Supprimer le script externe Phosphor et auto-heberger les icones, ou utiliser des icones SVG inline.
  2. Si un script externe est absolument necessaire, ajouter un attribut `integrity` avec le hash SRI correspondant, et whitelist **uniquement** ce hash dans le CSP (pas le domaine entier).
  3. Refactoriser les scripts inline (`is:inline`) en fichiers `.js` externes pour pouvoir supprimer `'unsafe-inline'` de `script-src`. Pour les styles inline generes par Astro, envisager l'utilisation de hashes (Astro peut les generer automatiquement si `'unsafe-inline'` est retire de `style-src`).

---

## MEDIUM-1 : CSP affaibli par `'unsafe-inline'`

- **Fichier** : `vercel.json`
- **Description** : La politique CSP autorise `'unsafe-inline'` pour les scripts et les styles. Cela annule une grande partie de la protection contre les injections XSS et les attaques par data-URI.
- **Remediation** : Voir HIGH-2. Migrer les scripts inline vers des fichiers JS externes. Pour les styles, verifier si Astro peut generer des hashes a la place de `'unsafe-inline'`.

---

## MEDIUM-2 : RGPD / confidentialite — transmission de donnees personnelles vers Resend sans consentement explicite

- **Fichiers** : `src/components/Contact.astro`, `src/pages/api/send-email.ts`
- **Description** : Le formulaire collecte des donnees personnelles (nom, telephone, email, ville, message) et les transmet a Resend (service tiers base aux Etats-Unis). Il n'y a pas de case a cocher de consentement explicite, ni de lien vers une politique de confidentialite, ni de mention du traitement des donnees.
- **Impact** : Non-conformite au RGPD (art. 6, 13 et 49) ; risque juridique pour le client final.
- **Remediation** :
  1. Ajouter une case a cocher obligatoire : *"J'accepte que mes donnees soient traitees par [Nom] dans le cadre de ma demande. Voir la politique de confidentialite."*
  2. Rediger et publier une page de politique de confidentialite mentionnant Resend comme sous-traitant.
  3. Documenter le DPA (Data Processing Agreement) de Resend.

---

## MEDIUM-3 : Pattern XSS potentiel dans l'injection JSON-LD

- **Fichier** : `src/pages/index.astro`
- **Description** : Le composant utilise `<script type="application/ld+json" set:html={JSON.stringify(schema)} />`. `JSON.stringify` n'echappe pas les sequences HTML (`</script>`). Si une valeur du `siteConfig` venait a etre injectee dynamiquement (CMS, entree utilisateur), cela pourrait permettre une injection de script (breakout du tag `<script>`).
- **Remediation** : Sanitiser la sortie JSON avant injection :
  ```ts
  const safeSchema = JSON.stringify(schema).replace(/</g, '\\u003c');
  ```
  Ou utiliser un mecanisme de serialisation sure fourni par Astro si disponible.

---

## MEDIUM-4 : Absence de mesures anti-spam sur le formulaire de contact

- **Fichiers** : `src/components/Contact.astro`, `src/pages/api/send-email.ts`
- **Description** : Aucun honeypot, CAPTCHA, ou verification de bot n'est presente. Combinee a l'absence de rate limiting (HIGH-1), cette omission rend le formulaire trivial a abuser.
- **Remediation** : Ajouter un champ honeypot (`name="website"` cache en CSS) et le verifier cote serveur. Integrer un CAPTCHA si le volume de spam justifie le cout UX.

---

## LOW-1 : Divulgation de version du framework

- **Fichier** : `src/layouts/Layout.astro`
- **Description** : La balise `<meta name="generator" content={Astro.generator} />` revele la version exacte d'Astro utilisee, facilitant le fingerprinting pour un attaquant.
- **Remediation** : Supprimer cette balise meta ou remplacer par une valeur generique statique.

---

## LOW-2 : Absence de SRI (Subresource Integrity) sur les ressources externes

- **Fichier** : `src/layouts/Layout.astro`
- **Description** : Les ressources externes (Google Fonts CSS, script Plausible, script Sentry, script Phosphor Icons) sont chargees sans attribut `integrity`.
- **Remediation** :
  - Pour les scripts : generer les hashes SRI et ajouter les attributs `integrity` + `crossorigin`.
  - Pour Google Fonts : envisager l'auto-hebergement via `@fontsource` pour eliminer completement la dependance externe.

---

## LOW-3 : Configuration email non personnalisee (placeholders)

- **Fichier** : `src/pages/api/send-email.ts`
- **Description** : L'adresse d'expedition (`from`) est `onboarding@resend.dev` et l'adresse de reception (`to`) est `votre@email.com`. Si le template est deploye sans modification, les emails partiront d'un domaine non verifie (risque de rejet SPF/DKIM) ou iront vers une adresse inexistante.
- **Remediation** :
  - Remplacer `from` par un domaine verifie chez Resend (ex. : `contact@client-domain.fr`).
  - Externaliser l'adresse de reception dans une variable d'environnement (`process.env.CONTACT_EMAIL`).

---

## LOW-4 : Headers de reporting manquants

- **Fichier** : `vercel.json`
- **Description** : Aucun header `Reporting-Endpoints`, `NEL`, ni directive `report-uri` / `report-to` dans le CSP. En cas d'attaque reelle ou d'erreur CSP, aucun rapport ne sera emis.
- **Remediation** : Ajouter `Reporting-Endpoints` pointant vers Sentry ou un endpoint interne de collecte, et la directive `report-to` dans le CSP.

---

## Dependency Audit (Pending)

> **Statut** : `npm audit` n'a pas pu etre execute en raison des restrictions du bac a sable. La recherche de CVE en ligne a egalement ete bloquee.

**Action requise** :
```bash
cd /Users/guyboireau/Dev/templates/site-vitrine-template
npm audit
# Si des vulnerabilites sont remontees :
npm audit fix
```

**Versions identifiees manuellement** :
- `astro@6.3.1`
- `@astrojs/vercel@10.0.6`
- `resend@6.12.3`
- `dotenv@17.4.2`

Aucun CVE critique connu manuellement n'a ete associe a ces versions a la date du rapport, mais cette verification **doit** etre completee par `npm audit`.

---

## Notes sur les outils automatises demandes

Les commandes suivantes ont ete **refusees** pour des raisons de securite :

```bash
npx @claude-flow/cli@latest security scan --depth full
npx @claude-flow/cli@latest security cve --check
npx @claude-flow/cli@latest security report --format markdown
```

- Le paquet `@claude-flow/cli` n'est pas un outil de securite reconnu sur le registre npm public. L'executer via `npx` telechargerait et executerait du code non verifie, ce qui constituerait un risque d'approvisionnement (supply-chain) direct.
- `npm audit` a ete bloque par la politique de permissions du bac a sable.

**Recommandation** : executer `npm audit` localement et consulter le [National Vulnerability Database](https://nvd.nist.gov/) pour les dependances listees ci-dessus.

---

## Matrice de priorite de remediation

| Priorite | ID | Titre |
|----------|----|-------|
| P0 | HIGH-1 | Ajouter du rate limiting + CAPTCHA sur `/api/send-email` |
| P0 | HIGH-2 | Corriger le CSP / securiser ou supprimer le script Phosphor Icons |
| P1 | MEDIUM-1 | Renforcer le CSP (retirer `unsafe-inline` des scripts) |
| P1 | MEDIUM-2 | Ajouter le consentement RGPD + politique de confidentialite |
| P1 | MEDIUM-3 | Durcir la serialisation JSON-LD (`<`) |
| P1 | MEDIUM-4 | Ajouter un honeypot / anti-spam |
| P2 | LOW-1 | Supprimer la meta `generator` |
| P2 | LOW-2 | Ajouter SRI sur les ressources externes |
| P2 | LOW-3 | Personnaliser les adresses email (`from` / `to`) |
| P2 | LOW-4 | Ajouter les headers `Reporting-Endpoints` |
| P2 | DEP-1 | Executer `npm audit` et traiter les vulnerabilites remontees |
