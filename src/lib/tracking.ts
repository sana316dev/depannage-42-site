/**
 * MESURE DES CONVERSIONS
 * ======================
 * Le site n'installe aucun identifiant inventé. Il se contente de pousser des
 * événements nommés dans `window.dataLayer`, que le conteneur GTM existant du
 * client (GTM-PL3DVB2B) pourra consommer une fois configuré.
 *
 * CE QUI EST FAIT ICI
 *   - Les événements sont émis, nommés et documentés (tableau ci-dessous).
 *   - Ils partent même avant consentement : ce sont des événements de
 *     dataLayer, pas des traceurs. Rien n'est envoyé à un tiers tant que GTM
 *     n'est pas chargé, et GTM ne se charge qu'après acceptation.
 *
 * CE QUI RESTE À FAIRE CÔTÉ CLIENT (accès requis)
 *   - Dans GTM : créer un déclencheur « Événement personnalisé » par nom
 *     ci-dessous, et le relier à une balise de conversion Google Ads et/ou à
 *     un événement GA4.
 *   - Dans Google Ads : créer l'action de conversion « Appel depuis le site »
 *     et récupérer son identifiant de conversion. Aucun identifiant n'est
 *     inscrit dans ce code.
 *   - Vérifier en mode Aperçu GTM que chaque événement remonte.
 *
 * Émettre un événement n'est pas vérifier une conversion : tant que les
 * points ci-dessus ne sont pas faits, aucune conversion n'est enregistrée.
 *
 * ┌────────────────────────┬──────────────────────────────────────────────┐
 * │ Nom de l'événement     │ Déclenché quand                              │
 * ├────────────────────────┼──────────────────────────────────────────────┤
 * │ appel_telephone        │ clic sur n'importe quel lien tel:            │
 * │ clic_avis_google       │ clic vers la fiche Google Business Profile   │
 * │ ouverture_faq          │ ouverture d'une question de la FAQ           │
 * │ consentement_choisi    │ l'internaute accepte ou refuse les mesures   │
 * └────────────────────────┴──────────────────────────────────────────────┘
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    /** Défini par le script Consent Mode inline du <head>. */
    gtag?: (...args: unknown[]) => void;
  }
}

/** Identifie d'où part l'appel, pour savoir quel bloc convertit. */
export type EmplacementAppel =
  | "entete"
  | "hero"
  | "barre_mobile"
  | "parcours"
  | "service"
  | "zone"
  | "faq"
  | "contact_final"
  | "pied_de_page";

function pousser(evenement: string, donnees: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: evenement, ...donnees });
}

/** Conversion principale du site. */
export function suivreAppel(emplacement: EmplacementAppel) {
  pousser("appel_telephone", { emplacement_appel: emplacement });
}

/** Conversion secondaire : consultation des avis, signal de réassurance. */
export function suivreClicAvis() {
  pousser("clic_avis_google");
}

/** Signal d'engagement : quelle objection bloque réellement l'appel. */
export function suivreOuvertureFaq(question: string) {
  pousser("ouverture_faq", { question_faq: question });
}

export function suivreConsentement(choix: "accepte" | "refuse") {
  pousser("consentement_choisi", { choix_consentement: choix });
}
