"use client";

import { useEffect } from "react";

/**
 * Mise en scène au scroll : révélations, tracés, et jauge de progression.
 *
 * PRINCIPE, valable pour tout ce fichier : le risque est inversé. Tout est
 * visible par défaut dans le CSS ; un élément n'est masqué que par l'attribut
 * `data-cache`, posé en JavaScript juste avant d'être observé, et retiré dès
 * qu'il entre à l'écran. Si le JavaScript échoue, si l'observateur ne se
 * déclenche jamais, ou si l'internaute demande un mouvement réduit, rien ne
 * disparaît.
 *
 * Une première version faisait l'inverse : masquer en CSS, révéler ensuite.
 * Les 22 blocs de la page sont restés invisibles, y compris ceux déjà
 * présents à l'écran. Une mise en scène capable d'effacer la page n'a pas sa
 * place sur un site dont le seul rôle est de permettre à quelqu'un en panne
 * de passer un appel.
 *
 * Aucune bibliothèque : un observateur d'intersection, un écouteur de scroll
 * sur rAF, et des transitions CSS. GSAP coûtait une septantaine de kilo-octets
 * compressés pour ce seul usage.
 */

/** Au bout de ce délai, tout est révélé quoi qu'il arrive. Le filet ne fait
 *  jamais que RENDRE VISIBLE : l'allonger ne présente aucun risque, le
 *  raccourcir écrase l'effet. */
const DELAI_SECURITE_MS = 6000;

export function Revelations() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-anime")) return;

    /* ------------------------------------------------------------------
       1. Jauge de progression : la route parcourue, en haut de page.
    ------------------------------------------------------------------ */
    const jauge = document.querySelector<HTMLElement>(".jauge");
    let enAttente = false;

    const majProgression = () => {
      if (enAttente) return;
      enAttente = true;
      requestAnimationFrame(() => {
        enAttente = false;
        if (!jauge) return;
        const parcourable =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = parcourable > 0 ? window.scrollY / parcourable : 0;
        jauge.style.setProperty("--progression", String(Math.min(1, p)));
      });
    };

    majProgression();
    window.addEventListener("scroll", majProgression, { passive: true });
    window.addEventListener("resize", majProgression, { passive: true });

    /* ------------------------------------------------------------------
       2. Mesure des tracés. Chaque trait doit connaître sa propre longueur
          pour pouvoir se dessiner ; une valeur en dur se désynchroniserait
          au premier redessin.
    ------------------------------------------------------------------ */
    type Traçable = SVGPathElement | SVGCircleElement | SVGRectElement;

    const traces = Array.from(
      document.querySelectorAll<Traçable>(
        ".trajectoire path, .dessin path, .dessin circle, .dessin rect",
      ),
    ).filter((t) => typeof t.getTotalLength === "function");

    traces.forEach((t, i) => {
      let longueur = 0;
      try {
        longueur = t.getTotalLength();
      } catch {
        return; // Élément non rendu (display:none) : on le laisse intact.
      }
      if (!longueur) return;
      t.style.setProperty("--longueur", String(longueur));
      t.style.strokeDasharray = String(longueur);
      // Décalage par trait : le dessin se construit, il n'apparaît pas d'un bloc.
      t.style.transitionDelay = `${(i % 14) * 55}ms`;
    });

    /* ------------------------------------------------------------------
       3. Révélations et tracés, pilotés par l'observateur d'intersection.
    ------------------------------------------------------------------ */
    const blocs = Array.from(document.querySelectorAll<HTMLElement>(".revele"));
    const aReveler: Element[] = [...blocs, ...traces];

    const toutReveler = () =>
      aReveler.forEach((e) => e.removeAttribute("data-cache"));
    const filet = window.setTimeout(toutReveler, DELAI_SECURITE_MS);

    let observateur: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      observateur = new IntersectionObserver(
        (entrees) => {
          entrees.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.removeAttribute("data-cache");
            observateur?.unobserve(e.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );

      aReveler.forEach((element, i) => {
        const rect = element.getBoundingClientRect();
        const dejaVisible = rect.top < window.innerHeight * 0.95;

        element.setAttribute("data-cache", "1");

        if (dejaVisible) {
          window.setTimeout(
            () => element.removeAttribute("data-cache"),
            60 + i * 60,
          );
        } else {
          observateur!.observe(element);
        }
      });
    } else {
      // Sans observateur, on ne masque rien du tout.
      toutReveler();
    }

    return () => {
      window.clearTimeout(filet);
      observateur?.disconnect();
      window.removeEventListener("scroll", majProgression);
      window.removeEventListener("resize", majProgression);
    };
  }, []);

  return null;
}
