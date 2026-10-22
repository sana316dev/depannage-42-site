import { Entete } from "@/components/Entete";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Parcours } from "@/components/Parcours";
import { Avis } from "@/components/Avis";
import { Zone } from "@/components/Zone";
import { Faq } from "@/components/Faq";
import { ContactFinal } from "@/components/ContactFinal";
import { PiedDePage } from "@/components/PiedDePage";
import { BarreAppelMobile } from "@/components/BarreAppelMobile";
import { Revelations } from "@/components/Revelations";
import { SuiviAppels } from "@/components/SuiviAppels";

/**
 * Page unique, une seule intention : faire appeler.
 *
 * L'ordre des sections suit les quatre questions du visiteur en panne :
 *   « Est-ce qu'ils peuvent m'aider ? »      → Hero
 *   « Est-ce qu'on peut leur faire confiance ? » → Avis (note Google)
 *   « Est-ce que ça couvre mon cas ? »        → Services, Zone
 *   « Comment j'appelle ? »                   → présent partout, et en grand
 *                                               à la fin
 *
 * Le parcours d'intervention est placé entre les services et les avis : il
 * répond à l'inquiétude qui suit immédiatement « ils peuvent m'aider », à
 * savoir « qu'est-ce qui va m'arriver si j'appelle ».
 */
export default function Accueil() {
  return (
    <>
      {/* Grain : calque fixe, non interactif, qui donne une matière au fond.
          Sans lui, un aplat sombre reste un aplat sombre. */}
      <div className="grain" aria-hidden="true" />
      {/* Jauge de progression : le marquage de la route parcourue. */}
      <div className="jauge" aria-hidden="true" />
      <Entete />
      <main>
        <Hero />
        <Services />
        <Parcours />
        <Avis />
        <Zone />
        <Faq />
        <ContactFinal />
      </main>
      <PiedDePage />
      <BarreAppelMobile />
      <Revelations />
      <SuiviAppels />
    </>
  );
}
