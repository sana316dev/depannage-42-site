import type { NextConfig } from "next";

/**
 * CHOIX D'ARCHITECTURE
 *
 * `cacheComponents` (activé par défaut par create-next-app) est volontairement
 * retiré : il interdit `export const dynamic`, donc il empêchait de prérendre
 * robots.txt et sitemap.xml, donc il bloquait tout export statique. Or le site
 * actuel du client est servi en statique derrière nginx et Cloudflare : garder
 * la possibilité d'un hébergement statique évite de lui imposer un changement
 * d'infrastructure qu'il n'a pas demandé.
 *
 * Le site est donc 100 % prérendu. Pour produire une version déposable sur
 * n'importe quel hébergement : `npm run build:statique` (voir package.json).
 * Cette variante désactive l'optimisation d'images de Next, d'où les versions
 * WebP pré-générées dans public/assets.
 */
const exportStatique = process.env.EXPORT_STATIQUE === "1";

const nextConfig: NextConfig = {
  ...(exportStatique ? { output: "export" as const, images: { unoptimized: true } } : {}),
  turbopack: {
    // Le package-lock.json du dossier parent n'appartient pas à ce dépôt :
    // on ancre explicitement la racine Turbopack sur le projet.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
