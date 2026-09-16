import apsAcademyLogo from "@/assets/aps-academy-logo.png.asset.json";
import citaPaniLogo from "@/assets/cita-pani-logo.png.asset.json";
import edrootsLogo from "@/assets/edroots-logo.png.asset.json";
import elanzaLogo from "@/assets/elanza-logo.png.asset.json";
import prodigyLogo from "@/assets/prodigy-logo.png.asset.json";
import regalJewellersLogo from "@/assets/regal-jewellers-logo.png.asset.json";

export type Sponsor = {
  /** Sponsor display name — leave "" until confirmed */
  name: string;
  /** Logo image URL or imported asset path — leave "" to show a placeholder box */
  logo: string;
  /** Instagram handle without the @ — leave "" to hide the link */
  instagram: string;
};

export type SponsorTier = {
  id: string;
  title: string;
  note: string;
  sponsors: Sponsor[];
};

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: "powered-by",
    title: "Powered By",
    note: "Title partner of HAMDIYA'26",
    sponsors: [
      {
        name: "APS Academy",
        logo: apsAcademyLogo.url,
        instagram: "apsacademy",
      },
    ],
  },
  {
    id: "stage-sponsor",
    title: "Stage Sponsor",
    note: "Main stage partner",
    sponsors: [
      {
        name: "Prodigy Institute of Management Studies",
        logo: prodigyLogo.url,
        instagram: "",
      },
    ],
  },
  {
    id: "best-manager-sponsor",
    title: "Best Manager Sponsor",
    note: "Flagship event partner",
    sponsors: [
      {
        name: "Edroots",
        logo: edrootsLogo.url,
        instagram: "",
      },
    ],
  },
  {
    id: "co-sponsors",
    title: "Co-Sponsors",
    note: "Supporting partners",
    sponsors: [
      {
        name: "Cita Pani Fried & Grilled",
        logo: citaPaniLogo.url,
        instagram: "",
      },
      {
        name: "Regal Jewellers",
        logo: regalJewellersLogo.url,
        instagram: "",
      },
      {
        name: "Elanza",
        logo: elanzaLogo.url,
        instagram: "",
      },
    ],
  },
];
