<div align="center">

# 📝 The Journal

**A modern, full-featured blog built with Next.js**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)](https://mongodb.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://vercel.com)

**Live:** [blog-nextjs-pi-two.vercel.app](https://blog-nextjs-pi-two.vercel.app)

</div>

## ✨ Features

- **Dynamic blog** — homepage with featured post, article grid, archive, and full post pages with reading progress bar
- **Admin dashboard** — password-protected CMS to write, edit, publish/unpublish, and delete posts
- **Settings panel** — manage blog title, tagline, SEO metadata, Google Analytics, social links, and password
- **MongoDB** — all content and settings persisted to a MongoDB database
- **SEO** — per-post metadata, semantic HTML, and `generateMetadata`
- **Responsive design** — Tailwind CSS, dark-mode-ready styling, mobile-first layout
- **Geist font** — optimized with `next/font`
- **Cookie-based auth** — single-password admin session (24h expiry)

## 🚀 Getting Started

```bash
npm install
# or
yarn install
# or
pnpm install
```

Set up your environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

### Seed Data

```bash
npx tsx scripts/seed.ts
```

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org) (App Router) |
| **UI Library** | [React](https://react.dev) |
| **Language** | [TypeScript](https://typescriptlang.org) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) |
| **Database** | [MongoDB](https://mongodb.com) |
| **Fonts** | [Geist](https://vercel.com/font) via `next/font` |
| **Deployment** | [Vercel](https://vercel.com) |
