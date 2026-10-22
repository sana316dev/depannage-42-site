"use client";

import { useEffect } from "react";
import {
  suivreAppel,
  suivreClicAvis,
  type EmplacementAppel,
} from "@/lib/tracking";

/**
 * Mesure déléguée des clics d'appel.
 *
 * Un seul écouteur posé sur le document capte TOUS les clics sur un lien
 * `tel:`, où qu'il se trouve dans la page. C'est volontairement préféré à un
 * gestionnaire par bouton : plusieurs liens d'appel vivent dans des composants
 * serveur, qui ne peuvent pas porter de `onClick`, et un lien oublié serait un
 * appel non comptabilisé — donc une conversion invisible dans Google Ads.
 *
 * L'emplacement est lu dans l'attribut `data-appel`. Un lien sans cet attribut
 * est quand même compté, sous l'emplacement « inconnu » : mieux vaut une
 * donnée imprécise qu'une donnée manquante.
 */
export function SuiviAppels() {
  useEffect(() => {
    function auClic(e: MouseEvent) {
      const cible = e.target as HTMLElement | null;
      const lien = cible?.closest?.("a");
      if (!lien) return;

      const href = lien.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        const emplacement = (lien.getAttribute("data-appel") ??
          "inconnu") as EmplacementAppel;
        suivreAppel(emplacement);
        return;
      }

      if (lien.hasAttribute("data-avis")) {
        suivreClicAvis();
      }
    }

    // En phase de capture : l'événement est enregistré même si un gestionnaire
    // en aval arrête la propagation, et avant que le navigateur ne quitte la
    // page pour lancer l'appel.
    document.addEventListener("click", auClic, { capture: true });
    return () =>
      document.removeEventListener("click", auClic, { capture: true });
  }, []);

  return null;
}
