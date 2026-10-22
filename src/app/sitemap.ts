import type { MetadataRoute } from "next";
import { contact } from "@/content/site";

/**
 * Deux URL seulement, et c'est volontaire : le brief interdit de fabriquer
 * des pages géographiques vides pour capter des recherches locales.
 *
 * La date est une constante et non `new Date()` : une date calculée à chaque
 * requête rendrait la route dynamique, ce qui interdirait l'export statique
 * et donc l'hébergement sur le serveur actuel du client. À mettre à jour
 * lors d'une refonte du contenu.
 */
const DERNIERE_MODIFICATION = "2026-10-22";

/* Rend la route prérendue au build plutôt que servie à la demande.
   Sans cela, `output: "export"` échoue : ces deux routes sont la seule
   chose qui empêchait un export entièrement statique, donc un
   hébergement sur le serveur actuel du client. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: contact.siteUrl,
      lastModified: DERNIERE_MODIFICATION,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${contact.siteUrl}/mentions-legales`,
      lastModified: DERNIERE_MODIFICATION,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
