import type { MetadataRoute } from "next";
import { contact } from "@/content/site";

/**
 * robots.txt — l'ancien site n'en avait pas : l'URL renvoyait une page de
 * parking de l'hébergeur, ce qui est pire que rien.
 */
/* Rend la route prérendue au build plutôt que servie à la demande.
   Sans cela, `output: "export"` échoue : ces deux routes sont la seule
   chose qui empêchait un export entièrement statique, donc un
   hébergement sur le serveur actuel du client. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${contact.siteUrl}/sitemap.xml`,
    host: contact.siteUrl,
  };
}
