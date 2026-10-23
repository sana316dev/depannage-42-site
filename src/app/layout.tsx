import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import { contact, copy, legal, services, zone } from "@/content/site";
import { Consentement } from "@/components/Consentement";
import "./globals.css";

/* Titres : Bricolage Grotesque.
   Archivo était correcte et sans relief : une grotesque neutre de plus, ce
   qui est exactement le reproche fait au premier rendu. Bricolage a un vrai
   dessin — encoches d'encrage marquées, terminaisons coupées — et un axe de
   largeur qui permet d'élargir les gros titres comme une signalétique
   routière sans charger de seconde famille. */
const titre = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--police-titre",
  display: "swap",
});

/* Texte courant : Space Grotesk.
   Choisie pour ses CHIFFRES, qui sont le cœur de ce site : le numéro de
   téléphone est l'information que la majorité des visiteurs vient chercher.
   Ses chiffres ont un dessin mécanique, légèrement technique, qui évoque
   l'instrumentation plutôt que le texte courant. Geist et Inter, elles, ont
   des chiffres parfaitement neutres. */
const texte = Space_Grotesk({
  subsets: ["latin"],
  variable: "--police-texte",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(contact.siteUrl),
  title: copy.meta.titre,
  description: copy.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: contact.siteUrl,
    siteName: legal.nomCommercial,
    title: copy.meta.titre,
    description: copy.meta.description,
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "FR-42",
    "geo.placename": contact.adresse.ville,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1420",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Données structurées.
 *
 * Type retenu : AutoTowing (sous-type de AutomotiveBusiness chez Schema.org),
 * qui décrit exactement le métier. Seules des informations vérifiées y
 * figurent.
 *
 * aggregateRating est volontairement ABSENT : Google n'accepte pas les notes
 * auto-déclarées pour un LocalBusiness sur sa propre page. La note est donc
 * affichée visuellement avec un lien vers la fiche Google, qui est la source,
 * plutôt que revendiquée dans le balisage.
 */
const donneesStructurees = {
  "@context": "https://schema.org",
  "@type": "AutoTowing",
  "@id": `${contact.siteUrl}/#entreprise`,
  name: legal.nomCommercial,
  legalName: `${legal.raisonSociale} ${legal.formeJuridique}`,
  url: contact.siteUrl,
  telephone: contact.telephoneE164,
  description: copy.meta.description,
  foundingDate: legal.dateCreation,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.adresse.rue,
    postalCode: contact.adresse.codePostal,
    addressLocality: contact.adresse.ville,
    addressRegion: "Loire",
    addressCountry: contact.adresse.pays,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: contact.adresse.latitude,
    longitude: contact.adresse.longitude,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  areaServed: [
    { "@type": "City", name: "Saint-Étienne" },
    { "@type": "City", name: contact.adresse.ville },
    { "@type": "AdministrativeArea", name: "Loire" },
  ],
  sameAs: [contact.googleBusinessUrl],
  identifier: {
    "@type": "PropertyValue",
    propertyID: "SIRET",
    value: legal.siret.replace(/\s/g, ""),
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.titre,
        description: s.description,
      },
    })),
  },
  knowsAbout: [zone.longueDistance.valeur],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning : le script ci-dessous ajoute la classe
    // `js-anime` sur <html> avant l'hydratation, ce que React signalerait
    // sinon comme une divergence serveur/client. C'est voulu, et c'est le seul
    // attribut du document modifié avant hydratation.
    <html
      lang="fr"
      className={`${titre.variable} ${texte.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Consent Mode v2 — défini AVANT tout chargement de balise.
          Tous les signaux publicitaires et analytiques démarrent refusés.
          Le conteneur GTM existant du client (GTM-PL3DVB2B) n'est chargé
          qu'une fois le consentement donné, dans <Consentement />.
        */}
        <script
          id="consent-defaut"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update: 500
});
gtag('set','url_passthrough',true);
gtag('set','ads_data_redaction',true);
            `.trim(),
          }}
        />
        {/*
          Marque le document comme « animable » avant le premier rendu, pour
          que les éléments à révéler partent invisibles sans provoquer de
          clignotement. Si l'internaute demande un mouvement réduit, ou si le
          JavaScript échoue, la classe n'est jamais posée et tout le contenu
          reste visible par défaut : aucun texte ne dépend d'une animation.
        */}
        {/*
          Si le visiteur a déjà répondu au bandeau de consentement, on pose la
          classe AVANT la première peinture : le bandeau n'apparaît jamais, et
          il n'y a aucun clignotement. Le bandeau est rendu dans le HTML
          initial justement pour ne pas devenir un élément LCP tardif.
        */}
        <script
          id="consent-deja-decide"
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('d42-consentement'))document.documentElement.classList.add('consent-decide')}catch(e){}",
          }}
        />
        <script
          id="active-animations"
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-anime')}catch(e){}",
          }}
        />
        {/*
          Préchargement de l'image du hero : c'est l'élément LCP de la page.
          Les deux variantes sont déclarées avec leur media query, pour que le
          navigateur ne télécharge que celle qu'il affichera réellement.
        */}
        <link
          rel="preload"
          as="image"
          href="/assets/flotte-detouree-mobile.webp"
          type="image/webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/flotte-detouree.webp"
          type="image/webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(donneesStructurees),
          }}
        />
      </head>
      <body>
        <a className="saut-contenu" href="#contenu">
          Aller au contenu
        </a>
        {children}
        <Consentement />
      </body>
    </html>
  );
}
