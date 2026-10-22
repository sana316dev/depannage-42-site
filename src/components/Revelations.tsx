"use client";

import { useEffect } from "react";

/**
 * Révélations au scroll, et tracé de la trajectoire.
 *
 * PRINCIPE : le risque est inversé. Tout est visible par défaut dans le CSS ;
 * un élément n'est masqué que par l'attribut `data-cache`, posé en JavaScript
 * juste avant d'être observé, et retiré dès qu'il entre à l'écran. Si le
 * JavaScript échoue, si l'observateur ne se déclenche jamais, ou si
 * l'internaute demande un mouvement réduit, rien ne disparaît.
 *
 * Une première version faisait l'inverse : masquer en CSS, révéler avec
 * `ScrollTrigger.batch`. Les 22 blocs de la page sont restés invisibles, y
 * compris ceux déjà présents à l'écran. Une mise en scène capable d'effacer la
 * page n'a pas sa place sur un site dont le seul rôle est de permettre à
 * quelqu'un en panne de passer un appel.
 *
 * Aucune bibliothèque : un observateur d'intersection et des transitions CSS
 * suffisent. GSAP coûtait une septantaine de kilo-octets compressés pour ce
 * seul usage.
 */
/**
 * Au bout de ce délai, tout est révélé quoi qu'il arrive.
 *
 * Le filet ne fait jamais que RENDRE VISIBLE : l'allonger ne présente donc
 * aucun risque, et le raccourcir écrase l'effet. À 2,5 s, seules les deux
 * premières sections avaient le temps d'être révélées au scroll, le reste
 * apparaissait d'un bloc. Six secondes laissent le temps d'une lecture
 * normale tout en garantissant qu'aucun contenu ne reste perdu.
 */
const DELAI_SECURITE_MS = 6000;

export function Revelations() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-anime")) return;
    if (!("IntersectionObserver" in window)) return;

    const blocs = Array.from(document.querySelectorAll<HTMLElement>(".revele"));

    // La trajectoire doit connaître sa propre longueur pour être tracée
    // progressivement. On la mesure ici plutôt que d'inscrire une valeur
    // approximative dans le CSS.
    const traces = Array.from(
      document.querySelectorAll<SVGPathElement>(".trajectoire path"),
    );
    traces.forEach((p) => {
      const longueur = p.getTotalLength();
      p.style.setProperty("--longueur", String(longueur));
      p.style.strokeDasharray = String(longueur);
    });

    const aReveler = [...blocs, ...traces];

    /** Filet de sécurité : quoi qu'il arrive, tout est révélé au bout du délai. */
    const toutReveler = () =>
      aReveler.forEach((e) => e.removeAttribute("data-cache"));
    const filet = window.setTimeout(toutReveler, DELAI_SECURITE_MS);

    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.removeAttribute("data-cache");
          observateur.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    aReveler.forEach((element, i) => {
      const rect = element.getBoundingClientRect();
      const dejaVisible = rect.top < window.innerHeight * 0.95;

      element.setAttribute("data-cache", "1");

      if (dejaVisible) {
        // Déjà à l'écran au chargement : on révèle tout de suite, en décalant
        // légèrement pour que la page se pose au lieu d'apparaître d'un bloc.
        window.setTimeout(
          () => element.removeAttribute("data-cache"),
          60 + i * 70,
        );
      } else {
        observateur.observe(element);
      }
    });

    return () => {
      window.clearTimeout(filet);
      observateur.disconnect();
    };
  }, []);

  return null;
}
