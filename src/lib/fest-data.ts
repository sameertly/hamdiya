export type FestEvent = {
  slug: string;
  movie: string; // Movie-themed title
  name: string; // Actual event name
  category: string;
  tagline: string;
  description: string;
  firstPrize?: string;
  secondPrize?: string;
  prizeNote?: string;
  day: "Day 1" | "Day 2" | "Both";
  rules: string[];
};

export const FEST = {
  college: "Jamia Hamdard Kannur Campus",
  department: "PG Department of Commerce",
  organizer: "ComConnect",
  title: "National Level Management Fest",
  dates: "September 30 & October 1, 2026",
  dateShort: "Sept 30 – Oct 1, 2026",
  prizeWorth: "Prize worth ₹1 Lakh+",
};

export const EVENTS: FestEvent[] = [
  {
    slug: "management-mavericks",
    movie: "The Wolfs of the Wall Street",
    name: "Management Mavericks",
    category: "Management",
    tagline: "Sell the vision. Win the room.",
    description:
      "A high-stakes management event that tests how you think, decide and lead when the pressure is on. Strategy, case-cracking and boardroom-style pitching — bring your best executive instincts.",
    firstPrize: "₹12,026",
    secondPrize: "₹6,026",
    day: "Day 1",
    rules: [
      "Each team must consist of exactly 4 members.",
      "Registration Fee: ₹250 per participant.",
      "Participants must carry a mobile phone, and each team must have one laptop.",
      "Student Co- Ordinator: Ms. Safa K P, Mob: 94978 59738",
    ],
  },
  {
    slug: "marketing-mania",
    movie: "Goodwill Hunting",
    name: "Marketing Mania",
    category: "Marketing",
    tagline: "Make them believe. Make them buy.",
    description:
      "From ad-making to live selling rounds, Marketing Mania rewards the boldest and sharpest marketing brains on campus. Pitch, promote and out-market the competition.",
    firstPrize: "₹12,026",
    secondPrize: "₹6,026",
    day: "Day 1",
    rules: [
      "Each team must consist of exactly 4 members.",
      "Registration Fee: ₹250 per participant.",
      "Participants must carry a mobile phone, and each team must have one laptop.",
      "Student Co- Ordinator: Ms. Laiba Jabin, Mob: 6282727833",
    ],
  },
  {
    slug: "treasure-hunt",
    movie: "Squid Game",
    name: "Treasure Hunt",
    category: "Fun & Strategy",
    tagline: "Follow the clues. Outplay everyone.",
    description:
      "A fast, clever campus-wide hunt where every clue leads to the next. Solve faster than the rest and claim the pot before the game ends.",
    firstPrize: "₹12,026",
    day: "Day 1",
    rules: [
      "Teams of 3–5 members.",
      "All clues must be solved within the campus premises.",
      "No vehicles; no outside help; phones allowed only where the organizers permit.",
      "Damaging clue stations leads to disqualification.",
    ],
  },
  {
    slug: "the-best-manager",
    movie: "John Wick",
    name: "The Best Manager",
    category: "Flagship",
    tagline: "One title. No second chances.",
    description:
      "Our flagship solo event. Across interviews, rapid-fire rounds, crisis simulations and final presentations, one participant proves they deserve to be called the best manager.",
    firstPrize: "₹15,026",
    day: "Day 2",
    rules: [
      "Individual event — one participant per entry.",
      "Multiple elimination rounds across the day.",
      "Formal dress code is mandatory.",
      "Carry your own stationery; materials for rounds will be provided.",
    ],
  },
  {
    slug: "spot-games",
    movie: "SCAM (1992)",
    name: "Spot Games",
    category: "On-the-spot",
    tagline: "Walk in. Sign up. Win.",
    description:
      "Quick-fire spot events scattered through both days — puzzles, business quiz moments, Dumb-C and more. Register on the spot, no pre-registration needed.",
    prizeNote: "Prizes worth ₹5,766",
    day: "Both",
    rules: [
      "On-the-spot registration at the venue.",
      "Individual and team rounds announced hourly.",
      "Participation is first-come, first-served.",
      "Prize pool of ₹5,766 spread across rounds.",
    ],
  },
  {
    slug: "finance-arena",
    movie: "The Billion Dollar Code",
    name: "Finance Arena",
    category: "Finance",
    tagline: "Where every decision has a price.",
    description:
      "Trade, invest and arbitrage your way through simulated markets, finance quizzes and valuation challenges. Precision and nerve decide who walks away on top.",
    firstPrize: "₹12,026",
    secondPrize: "₹6,026",
    day: "Day 2",
    rules: [
      "Each team must consist of exactly 4 members.",
      "\u00a0 \u00a0Registration Fee: ₹250 per participant.",
      "Participants must carry a mobile phone, and each team must have one laptop.",
      "Student Co- Ordinator: Ms. Hinana Parveen A K, Mob: 94953 91989",
    ],
  },
  {
    slug: "hr-minds",
    movie: "The Office",
    name: "HR Minds",
    category: "Human Resources",
    tagline: "Hire right. Handle it all.",
    description:
      "Step into the recruiter's chair. HR Minds tests interviewing, negotiation and people-management skills through realistic role-play and case rounds.",
    firstPrize: "₹12,026",
    secondPrize: "₹6,026",
    day: "Day 2",
    rules: [
      "Teams of 4 members.",
      "Registration Fee: ₹250 per participant.",
      "Participants must carry a mobile phone, and each team must have one laptop.",
      "Student Co- Ordinator: Ms. Fathimath Saniya T K, Mob: 8891134928",
    ],
  },
];

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug);
}

export const PRIZE_TOTAL = "₹1,00,000+";
