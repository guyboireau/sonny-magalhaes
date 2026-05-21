<p align="center">
  <!-- Ajoutez ici le logo ou un aperçu du site vitrine -->
  <!-- <img src="public/preview.png" alt="Site Vitrine Template Preview" width="800" /> -->
</p>

<h1 align="center">🚀 Template Site Vitrine (Single Page)</h1>

<p align="center">
  <strong>Template performant et professionnel conçu pour les indépendants, artisans et TPE souhaitant une présence en ligne rapide et efficace.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-6.3-FF5D01?style=flat-square&logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vercel-Ready-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Resend-Emailing-black?style=flat-square&logo=minutemailer&logoColor=white" alt="Resend" />
</p>

---

## 📖 Présentation

Ce template est la fondation idéale pour déployer un **site vitrine "One-Page"** performant et moderne. Il est pré-configuré avec les meilleures pratiques d'Astro pour garantir un chargement ultra-rapide (score Lighthouse de 100) et un excellent référencement (SEO).

Idéal pour :
- Artisans (Plombiers, Électriciens, etc.)
- Consultants et Freelances
- TPE et commerces locaux

---

## ✨ Fonctionnalités incluses

- ⚡ **Performance extrême** : Génération statique / SSR avec Astro.
- 📱 **100% Responsive** : Design adaptatif sur mobile, tablette et desktop.
- ✉️ **Formulaire de contact intégré** : Prêt à l'emploi grâce à l'API **Resend**.
- 🔍 **SEO Optimisé** : Balises meta dynamiques et génération automatique du `sitemap.xml`.
- 🎨 **Personnalisable** : Système de variables pour modifier facilement les couleurs, typographies et images.

---

## 🚀 Démarrage Rapide

```bash
# 1. Cloner le projet
git clone <votre-url-de-repo> mon-site-vitrine && cd mon-site-vitrine

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Remplissez votre clé API Resend dans le fichier .env (RESEND_API_KEY)

# 4. Lancer le serveur de développement
npm run dev
```

> **Site accessible sur :** [http://localhost:4321](http://localhost:4321)

---

## 🛠️ Personnalisation du Template

### 1. Informations de l'Entreprise (`src/config/site.ts`)
Toutes les données globales (nom, adresse, téléphone, liens réseaux sociaux) sont centralisées. Modifiez ce fichier pour que les informations se répercutent sur tout le site.

### 2. Design et Couleurs (`src/styles/global.css` ou `src/layouts/Layout.astro`)
Le template utilise des variables CSS. Changez simplement la couleur primaire et secondaire pour adapter le site à votre charte graphique.

### 3. Contenu de la Page (`src/pages/index.astro`)
La page d'accueil est construite sous forme de sections (`Hero`, `Services`, `About`, `Contact`). Remplacez les textes et les images directement dans ces composants.

### 4. Formulaire de Contact
Le formulaire de contact utilise [Resend](https://resend.com) pour l'envoi d'emails.
1. Créez un compte sur Resend.
2. Obtenez votre clé API et ajoutez-la dans votre `.env` (`RESEND_API_KEY=re_...`).
3. Adaptez l'adresse email de destination dans l'endpoint de l'API (dossier `src/pages/api`).

---

## ☁️ Déploiement (Vercel)

Ce projet est pré-configuré pour un déploiement fluide sur **Vercel** (incluant le package `@astrojs/vercel`).

1. Poussez votre code sur GitHub/GitLab.
2. Connectez-vous sur [Vercel](https://vercel.com) et importez votre dépôt.
3. Allez dans les paramètres Vercel du projet (onglet **Settings > Environment Variables**) et ajoutez votre variable `RESEND_API_KEY`.
4. Cliquez sur **Deploy**.

---

## 📂 Architecture du Projet

```text
site-vitrine-template/
├── src/
│   ├── components/      # Composants de l'interface (Header, Footer, Sections)
│   ├── config/          # Fichiers de configuration globale (ex: site.ts)
│   ├── layouts/         # Structure de base des pages (Layout.astro)
│   ├── pages/           # Pages de l'application et endpoints API
│   │   ├── api/         # Routes API (ex: envoi du formulaire)
│   │   ├── index.astro  # Page d'accueil (One-Page)
│   │   └── sitemap.xml.ts # Générateur de sitemap pour le SEO
├── public/              # Images, icônes, fonts, robots.txt
├── astro.config.mjs     # Configuration d'Astro
└── vercel.json          # Configuration pour le déploiement Vercel
```

---

## 📞 Support & Maintenance

Si vous rencontrez des problèmes ou souhaitez ajouter des fonctionnalités (prise de RDV en ligne, multilingue, etc.), référez-vous à la documentation officielle d'Astro ou contactez le développeur en charge.

---
*Template développé pour garantir une présence en ligne rapide, esthétique et performante.*
