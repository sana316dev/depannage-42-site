"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { contact, legal } from "@/content/site";
import { BoutonAppel } from "./BoutonAppel";

/**
 * En-tête collant.
 *
 * Navigation volontairement courte : trois ancres. Sur un site dont le but
 * est l'appel, chaque entrée de menu supplémentaire est une sortie possible.
 * Le fond ne devient opaque qu'après le hero, pour ne pas couper l'image.
 */
const liens = [
  { href: "#services", libelle: "Prestations" },
  { href: "#zone", libelle: "Zone" },
  { href: "#questions", libelle: "Questions" },
];

export function Entete() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-(--duree-ui-lente) ease-(--ease-sortie) ${
        compact
          ? "border-b border-trait/70 bg-nuit/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between gap-4 px-4 md:h-[76px] md:px-6">
        <a
          href="#contenu"
          /* Pas d'aria-label : le texte visible « Dépannage 42 / by Isra
             Trans » nomme déjà le lien, et un aria-label qui ne le contient
             pas violerait WCAG 2.5.3. */
          className="flex items-center gap-3"
        >
          <Image
            src="/assets/logo-camion.png"
            alt=""
            width={44}
            height={44}
            priority
            className="size-10 md:size-11"
          />
          <span className="flex flex-col leading-none">
            <span className="font-(family-name:--font-titre) text-[1.08rem] font-extrabold tracking-tight md:text-[1.2rem]">
              Dépannage 42
            </span>
            <span className="mt-1 text-[0.72rem] text-sourd">
              {legal.signatureLogo}
            </span>
          </span>
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.92rem] font-medium text-doux">
            {liens.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-[32px] items-center transition-colors duration-(--duree-ui) ease-(--ease-sortie) hover:text-clair"
                >
                  {l.libelle}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Le numéro reste atteignable en permanence sur tablette et desktop.
            Sur mobile c'est la barre basse qui prend le relais, pour ne pas
            écraser le logo dans un en-tête de 68 px. */}
        <div className="hidden md:block">
          <BoutonAppel
            emplacement="entete"
            variante="principal"
            libelle=""
            className="h-11 min-h-11 px-5 text-[0.95rem]"
          />
        </div>
        {/* Lien d'appel : zone tactile portée à 48 px de haut, même si le
            libellé ne fait que deux mots. C'est un chemin de conversion. */}
        <a
          href={contact.telephoneHref}
          data-appel="entete"
          aria-label={`24 h/24, appeler le ${contact.telephone}`}
          className="inline-flex min-h-[48px] items-center px-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-action md:hidden"
        >
          24 h/24
        </a>
      </div>
    </header>
  );
}
