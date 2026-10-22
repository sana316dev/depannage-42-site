"use client";

import { useEffect } from "react";
import { suivreConsentement } from "@/lib/tracking";

/**
 * Bandeau de consentement.
 *
 * Il est rendu dès le HTML initial, et non affiché après un délai.
 *
 * Pourquoi : une première version l'affichait au bout de 1,2 s, pour ne pas
 * retarder le numéro de téléphone. Résultat mesuré au Lighthouse mobile, ce
 * bandeau devenait l'élément LCP de la page, avec 2,5 s de « render delay » :
 * un gros bloc de texte peint tardivement est exactement ce que cette mesure
 * sanctionne. Rendu avec le reste de la page, il n'est plus un candidat
 * tardif, et le visiteur n'a plus de surgissement sous les doigts.
 *
 * Pour les visiteurs ayant déjà choisi, un script placé dans le <head> pose la
 * classe `consent-decide` sur <html> AVANT la première peinture : le bandeau
 * n'apparaît donc jamais, sans clignotement.
 *
 * Identifiant du conteneur : celui DÉJÀ présent sur le site actuel du client.
 * Il n'a pas été inventé, il a été relevé dans le code en production.
 * À faire confirmer au client avant mise en ligne.
 */
const GTM_ID = "GTM-PL3DVB2B";
export const CLE_STOCKAGE = "d42-consentement";

type Choix = "accepte" | "refuse";

function chargerGtm() {
  if (document.getElementById("gtm-script")) return;
  const s = document.createElement("script");
  s.id = "gtm-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

function majConsentement(choix: Choix) {
  const accorde = choix === "accepte" ? "granted" : "denied";
  // gtag() est défini par le script Consent Mode inline du <head>, avant tout
  // chargement de balise. Il pousse l'appel sous la forme attendue par Google.
  window.gtag?.("consent", "update", {
    ad_storage: accorde,
    ad_user_data: accorde,
    ad_personalization: accorde,
    analytics_storage: accorde,
  });
}

export function Consentement() {
  useEffect(() => {
    let dejaChoisi: string | null = null;
    try {
      dejaChoisi = localStorage.getItem(CLE_STOCKAGE);
    } catch {
      // Navigation privée ou stockage bloqué : on redemandera, sans planter.
    }
    if (dejaChoisi === "accepte") {
      majConsentement("accepte");
      chargerGtm();
    }
  }, []);

  function choisir(choix: Choix) {
    try {
      localStorage.setItem(CLE_STOCKAGE, choix);
    } catch {
      // Sans stockage, le choix vaut pour la session en cours.
    }
    majConsentement(choix);
    if (choix === "accepte") chargerGtm();
    suivreConsentement(choix);
    // Masquage par la même classe que le script pré-peinture, pour qu'il n'y
    // ait qu'un seul mécanisme d'affichage à comprendre.
    document.documentElement.classList.add("consent-decide");
  }

  return (
    <div
      role="dialog"
      aria-labelledby="consentement-titre"
      className="bandeau-consentement fixed inset-x-0 z-50 px-3 pb-3 md:left-auto md:right-4 md:max-w-sm"
      style={{ bottom: "var(--h-barre-appel)" }}
    >
      <div className="rounded-[6px] border border-trait bg-acier-clair p-4 shadow-[0_18px_50px_rgba(0,0,0,0.6)]">
        <p id="consentement-titre" className="text-sm font-semibold">
          Mesure d&rsquo;audience
        </p>
        {/* Formulation courte : sur un écran de 390 px, chaque ligne de ce
            bandeau masque du contenu. Le détail complet est dans les
            mentions légales. */}
        <p className="mt-1.5 text-[0.82rem] leading-relaxed text-doux">
          Mesurer les visites et les appels ? Rien n&rsquo;est déposé sans
          votre accord, et le site fonctionne à l&rsquo;identique si vous
          refusez.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => choisir("refuse")}
            className="min-h-[44px] flex-1 rounded-[4px] border border-trait px-3 py-2.5 text-[0.82rem] font-semibold text-doux transition-colors duration-(--duree-ui) ease-(--ease-sortie) hover:border-trait-vif hover:text-clair"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choisir("accepte")}
            className="min-h-[44px] flex-1 rounded-[4px] bg-ambre px-3 py-2.5 text-[0.82rem] font-bold text-nuit transition-colors duration-(--duree-ui) ease-(--ease-sortie) hover:bg-ambre-clair"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
