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

const EMPTY: Sponsor = { name: "", logo: "", instagram: "" };

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: "powered-by",
    title: "Powered By",
    note: "Title partner of HAMDIYA'26",
    sponsors: [{ ...EMPTY }],
  },
  {
    id: "stage-sponsor",
    title: "Stage Sponsor",
    note: "Main stage partner",
    sponsors: [{ ...EMPTY }],
  },
  {
    id: "best-manager-sponsor",
    title: "Best Manager Sponsor",
    note: "Flagship event partner",
    sponsors: [{ ...EMPTY }],
  },
  {
    id: "co-sponsors",
    title: "Co-Sponsors",
    note: "Supporting partners",
    sponsors: [{ ...EMPTY }, { ...EMPTY }, { ...EMPTY }],
  },
];
