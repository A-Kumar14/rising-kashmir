import type { Article } from "./article";
import { urArticleOverlays } from "./article-i18n-ur";
import { rkAuth, rkPost } from "./rk-cdn";
import { normalizeSlug } from "./slug";

const now = new Date();
const daysAgo = (d: number) =>
  new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();


const rawArticles: Article[] = [
  {
    id: "1",
    slug: "lg-leads-anti-drug-padyatra-srinagar",
    title:
      "‘Enough is enough’: LG leads massive anti-drug Padyatra in Srinagar",
    dek: "Thousands join march through Lal Chowk as administration pledges sustained enforcement and community outreach.",
    body: "<p>Governor-led initiative marshals civil society and police in a visible show of resolve against narcotics in the summer capital.</p>",
    section: "kashmir",
    tags: ["governance", "nasha-mukti"],
    author: {
      name: "Aamir Hameed",
      slug: "aamir-hameed",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f701ea92806.jpeg"),
      alt: "Crowd in downtown Srinagar",
      credit: "RK Photo",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 4,
    is_breaking: true,
  },
  {
    id: "2",
    slug: "uri-baramulla-highway-landslide",
    title: "Uri–Baramulla highway blocked by landslide; traffic diverted",
    dek: "Geology teams clear debris as district administration issues advisories for night travel.",
    body: "<p>Heavy rain triggered a slip near a critical stretch, briefly cutting off the main north Kashmir corridor.</p>",
    section: "kashmir",
    tags: ["weather", "infrastructure"],
    author: { name: "Rifat Jan", slug: "rifat-jan", avatar: null, column: null },
    hero_image: {
      url: rkPost("69f78d7f342af.jpeg"),
      alt: "Mountain road in mist",
      credit: "File",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 3,
    is_breaking: true,
  },
  {
    id: "3",
    slug: "census-2027-srinagar-online-data",
    title: "Census 2027: Srinagar residents asked to submit data online",
    dek: "Enumerators pair digital forms with door visits as authorities stress timely participation.",
    body: "<p>The digital-first workflow aims to reduce repeated visits while preserving verification safeguards.</p>",
    section: "kashmir",
    tags: ["census", "srinagar"],
    author: {
      name: "Samiullah Malik",
      slug: "samiullah-malik",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f773b467424.jpeg"),
      alt: "Laptop and forms",
      credit: "Illustration",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 5,
    is_breaking: false,
  },
  {
    id: "4",
    slug: "hepatitis-a-outbreak-srinagar-surveillance",
    title: "Hepatitis A outbreak in Srinagar infects 21; surveillance intensified",
    dek: "Health teams trace water sources as hospitals expand outpatient screening.",
    body: "<p>Officials urge boiled water and hygiene protocols in affected wards.</p>",
    section: "kashmir",
    tags: ["health"],
    author: {
      name: "Dr. Ruksana Bashir",
      slug: "ruksana-bashir",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f78e70b8bb5.jpeg"),
      alt: "Health surveillance briefing",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 4,
    is_breaking: false,
  },
  {
    id: "5",
    slug: "kolahoi-glacier-melting-alarm",
    title:
      "Melting glaciers: Kolahoi, ‘crown of Kashmir’, melting at alarming rate",
    dek: "Scientists cite temperature anomalies and black carbon deposition on ice fields.",
    body: "<p>Longitudinal studies show accelerated thinning compared with two decades ago.</p>",
    section: "kashmir",
    tags: ["environment", "climate"],
    author: {
      name: "Inayat Gul",
      slug: "inayat-gul",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f58fe94cd0d.jpg"),
      alt: "Snow-covered peaks",
      credit: "RK Nature Desk",
    },
    published_at: daysAgo(2),
    updated_at: daysAgo(2),
    reading_time_minutes: 7,
    is_breaking: false,
  },
  {
    id: "6",
    slug: "jammu-smart-city-amrut-review",
    title: "Jammu MC reviews smart-city timelines after AMRUT project delays",
    dek: "Contractors asked to submit recovery plans before monsoon intensifies.",
    body: "<p>Commissioners emphasise drainage upgrades alongside road widening.</p>",
    section: "jammu",
    tags: ["urban"],
    author: {
      name: "Vikram Singh",
      slug: "vikram-singh",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f8017ecc547.jpg"),
      alt: "City intersection",
      credit: "File",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 5,
    is_breaking: false,
  },
  {
    id: "7",
    slug: "jammu-winter-tourism-push",
    title: "Jammu division eyes winter circuits beyond Vaishno Devi footfall",
    dek: "District planners pitch heritage walks and craft fairs for shoulder season visitors.",
    body: "<p>Hoteliers seek coordinated marketing with Kashmir circuits.</p>",
    section: "jammu",
    tags: ["tourism"],
    author: {
      name: "Neha Jamwal",
      slug: "neha-jamwal",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f8003b5d4ca.jpg"),
      alt: "Trekkers in the hills near Jammu",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(3),
    updated_at: daysAgo(3),
    reading_time_minutes: 4,
    is_breaking: false,
  },
  {
    id: "8",
    slug: "india-lpg-carrier-hormuz-may-13",
    title:
      "India-bound LPG carrier crosses Hormuz; expected in Visakhapatnam on May 13",
    dek: "Shipping ministry tracks convoy routing amid Gulf tensions.",
    body: "<p>Energy planners monitor discharge windows at eastern ports.</p>",
    section: "india",
    tags: ["energy", "shipping"],
    author: {
      name: "Priya Nambiar",
      slug: "priya-nambiar",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f486404b07c.jpg"),
      alt: "Cargo vessel at sea",
      credit: "Reuters",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 3,
    is_breaking: true,
  },
  {
    id: "9",
    slug: "neet-ug-2026-centres-india",
    title:
      "Over 22.79 lakh candidates to appear for NEET (UG) 2026 nationwide",
    dek: "Advisory stresses admit-card checks as centres span metros and towns.",
    body: "<p>Parents throng helplines over last-minute centre changes.</p>",
    section: "india",
    tags: ["education"],
    author: {
      name: "Staff Reporter",
      slug: "staff-reporter",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f49508aa1e0.jpg"),
      alt: "Students outside an examination centre",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 4,
    is_breaking: false,
  },
  {
    id: "10",
    slug: "west-asia-indians-evacuation-iran",
    title:
      "West Asia developments: India facilitates movement of Indian nationals",
    dek: "Embassy adds charter coordination as Gulf airspace remains volatile.",
    body: "<p>Hotlines remain staffed around the clock for families.</p>",
    section: "world",
    tags: ["diplomacy"],
    author: {
      name: "Arjun Mehta",
      slug: "arjun-mehta",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f4d2439070f.jpg"),
      alt: "Airport departure hall",
      credit: "PTI",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 6,
    is_breaking: true,
  },
  {
    id: "11",
    slug: "trump-iran-strikes-comment",
    title:
      "‘If they misbehave’: Trump says US could restart strikes on Iran",
    dek: "White House ties rhetoric to cargo seizures as diplomacy channels flicker.",
    body: "<p>Analysts debate signalling versus operational intent.</p>",
    section: "world",
    tags: ["us", "iran"],
    author: {
      name: "Wire Bureau",
      slug: "wire-bureau",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f46ea71dd52.jpg"),
      alt: "International summit briefing",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 3,
    is_breaking: true,
  },
  {
    id: "12",
    slug: "uae-opec-exit-analysis",
    title:
      "‘Geopolitical earthquake’: UAE energy posture shifts in Gulf calculus",
    dek: "Scholars weigh budget diversification against OPEC cohesion.",
    body: "<p>Oil desks adjust hedging assumptions for Asian buyers.</p>",
    section: "world",
    tags: ["energy"],
    author: {
      name: "Zoya Rahman",
      slug: "zoya-rahman",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f40d024f8cf.jpeg"),
      alt: "Oil and energy sector illustration",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(2),
    updated_at: daysAgo(2),
    reading_time_minutes: 8,
    is_breaking: false,
  },
  {
    id: "13",
    slug: "farooq-abdullah-us-iran-ceasefire",
    title:
      "Farooq Abdullah welcomes US-Iran ceasefire: ‘Talks are the only way forward’",
    dek: "NC patriarch urges regional actors to protect civilians and shipping lanes.",
    body: "<p>Party insiders say Kashmir watchers monitor spillover risks.</p>",
    section: "opinion",
    tags: ["column"],
    author: {
      name: "Farooq Abdullah",
      slug: "farooq-abdullah",
      avatar: rkAuth("69ce4a5b6d732.png"),
      column: "Notes from the Ridge",
    },
    hero_image: {
      url: rkPost("69ec266ae05ed.jpg"),
      alt: "Opinion column illustration",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 5,
    is_breaking: false,
  },
  {
    id: "14",
    slug: "mantasha-rashid-safe-workplaces-women",
    title:
      "Safe workplaces prerequisite for women empowerment; accountability matters",
    dek: "Institutions must publish clear escalation paths, not performative policies.",
    body: "<p>Voluntary pledges without enforcement reproduce silence.</p>",
    section: "opinion",
    tags: ["gender"],
    author: {
      name: "Mantasha Rashid",
      slug: "mantasha-rashid",
      avatar: rkPost("69ea1ce38b0eb.png"),
      column: "The Quiet Ripple",
    },
    hero_image: {
      url: rkPost("69e4e59123da7.png"),
      alt: "Community and governance",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(2),
    updated_at: daysAgo(2),
    reading_time_minutes: 6,
    is_breaking: false,
  },
  {
    id: "15",
    slug: "mehbooba-jk-jobs-crisis-youth",
    title:
      "Jobless youth, income-less families are deepening J&K crisis: Mehbooba Mufti",
    dek: "Former CM argues livelihood panic feeds despair faster than slogans.",
    body: "<p>Statistical gaps on unemployment obscure district-level distress.</p>",
    section: "opinion",
    tags: ["politics"],
    author: {
      name: "Mehbooba Mufti",
      slug: "mehbooba-mufti",
      avatar: rkAuth("69ccd22452135.png"),
      column: "From the Valley Floor",
    },
    hero_image: {
      url: rkPost("69f7277bc2277.jpeg"),
      alt: "Public gathering in Jammu and Kashmir",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(3),
    updated_at: daysAgo(3),
    reading_time_minutes: 7,
    is_breaking: false,
  },
  {
    id: "16",
    slug: "ipl-2026-kkr-rr-rinku-fifty",
    title: "IPL 2026: KKR beat RR after Rinku Singh’s match-winning fifty",
    dek: "Finisher anchors chase as spinners struggle on a tacky Eden strip.",
    body: "<p>Points table tightens as playoff math tilts toward net run rate.</p>",
    section: "sports",
    tags: ["ipl", "cricket"],
    author: {
      name: "Sheikh Sahil",
      slug: "sheikh-sahil",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f72a93bff1e.jpg"),
      alt: "Cricket stadium floodlights",
      credit: "BCCI",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 4,
    is_breaking: false,
  },
  {
    id: "17",
    slug: "ipl-2026-csk-kkr-sanju-brevis",
    title:
      "IPL 2026: CSK dominate KKR as Sanju, Brevis and Noor steal the show",
    dek: "Chennai spin trio ties Kolkata batters in knots under lights.",
    body: "<p>Net bowlers praise tactical mid-innings choke.</p>",
    section: "sports",
    tags: ["ipl"],
    author: {
      name: "Sheikh Sahil",
      slug: "sheikh-sahil",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f80227c552a.jpg"),
      alt: "IPL match action",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 4,
    is_breaking: false,
  },
  {
    id: "18",
    slug: "gdc-anantnag-road-race",
    title: "GDC Anantnag hosts annual road race as colleges revive outdoor sport",
    dek: "Hundreds run a timed loop as department pushes athletics budgets.",
    body: "<p>Winners earn slots at inter-district meet.</p>",
    section: "sports",
    tags: ["athletics"],
    author: {
      name: "Tariq Mir",
      slug: "tariq-mir",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f804106246f.jpg"),
      alt: "Athletics event in Kashmir",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(2),
    updated_at: daysAgo(2),
    reading_time_minutes: 3,
    is_breaking: false,
  },
  {
    id: "19",
    slug: "jammu-kashmir-saffron-export-milestone",
    title: "Kashmir saffron growers test EU-ready packaging for niche buyers",
    dek: "Cooperatives experiment with traceability QR codes on spice tins.",
    body: "<p>Agriculture department subsidises lab certification runs.</p>",
    section: "business",
    tags: ["agriculture", "trade"],
    author: {
      name: "Imran Qureshi",
      slug: "imran-qureshi",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69dcb4fa7dca1.jpg"),
      alt: "Saffron crocus fields",
      credit: "RK Business",
    },
    published_at: daysAgo(4),
    updated_at: daysAgo(4),
    reading_time_minutes: 6,
    is_breaking: false,
  },
  {
    id: "20",
    slug: "bandipora-startup-hub-grant",
    title: "Bandipora youth-led startup hub bags innovation grant",
    dek: "Incubator focuses on cold-chain logistics for perishables.",
    body: "<p>Mentors from IIT roster volunteer remotely.</p>",
    section: "business",
    tags: ["startups"],
    author: {
      name: "Imran Qureshi",
      slug: "imran-qureshi",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69dc5980a6226.jpg"),
      alt: "Young entrepreneurs at an event",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(5),
    updated_at: daysAgo(5),
    reading_time_minutes: 5,
    is_breaking: false,
  },
  {
    id: "21",
    slug: "sci-tech-jmu-lab-quantum-sensing",
    title: "IIT Jammu lab demos quantum sensing prototype for groundwater mapping",
    dek: "Researchers caution field trials remain two seasons away.",
    body: "<p>Partnerships with irrigation department under discussion.</p>",
    section: "sci-tech",
    tags: ["research"],
    author: {
      name: "Aditi Verma",
      slug: "aditi-verma",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69deb16088f80.png"),
      alt: "Laboratory research",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(6),
    updated_at: daysAgo(6),
    reading_time_minutes: 7,
    is_breaking: false,
  },
  {
    id: "22",
    slug: "pahalgam-trekking-season-guidelines",
    title: "Pahalgam trekking season opens with stricter camp-leave rules",
    dek: "Forestry department embeds GPS checkpoints on popular routes.",
    body: "<p>Tour operators welcome clarity after last year’s flash floods.</p>",
    section: "travel",
    tags: ["tourism"],
    author: {
      name: "Hina Bhat",
      slug: "hina-bhat",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69cce83115883.jpeg"),
      alt: "Alpine meadow",
      credit: "RK Travel",
    },
    published_at: daysAgo(3),
    updated_at: daysAgo(3),
    reading_time_minutes: 5,
    is_breaking: false,
  },
  {
    id: "23",
    slug: "srinagar-film-screening-winter-lineup",
    title: "Srinagar cultural centre announces winter film screenings for students",
    dek: "Curators balance Kashmiri shorts with restored classics.",
    body: "<p>Ticket proceeds fund mobile libraries.</p>",
    section: "entertainment",
    tags: ["culture"],
    author: {
      name: "Zara Khan",
      slug: "zara-khan",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69cd077284808.jpeg"),
      alt: "Cultural programme in Srinagar",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(4),
    updated_at: daysAgo(4),
    reading_time_minutes: 4,
    is_breaking: false,
  },
  {
    id: "24",
    slug: "baglihar-dam-gates-closed-treaty",
    title:
      "All gates of Baglihar Dam on Chenab remain closed after treaty tensions",
    dek: "Engineers manage releases amid scrutiny from downstream stakeholders.",
    body: "<p>Seasonal snowmelt profiles guide cautious operations.</p>",
    section: "india",
    tags: ["water"],
    author: {
      name: "Staff Reporter",
      slug: "staff-reporter",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69cf1b852f365.jpeg"),
      alt: "River and hydropower infrastructure",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(2),
    updated_at: daysAgo(2),
    reading_time_minutes: 6,
    is_breaking: false,
  },
  {
    id: "25",
    slug: "mehbooba-editorial-youth-jobs",
    title: "Editorial: Livelihoods must lead the security conversation",
    dek: "Promises without payrolls exhaust public patience.",
    body: "<p>The edit desk argues for measurable outcomes per district.</p>",
    section: "opinion",
    tags: ["editorial"],
    author: {
      name: "RK Editorial Board",
      slug: "rk-editorial-board",
      avatar: null,
      column: "Leader",
    },
    hero_image: {
      url: rkPost("69cb0fc53cbe8.jpeg"),
      alt: "Editorial illustration",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(5),
    updated_at: daysAgo(5),
    reading_time_minutes: 4,
    is_breaking: false,
  },
  {
    id: "26",
    slug: "placeholder-archive-test",
    title: "Placeholder article used for layout regression checks",
    dek: "Internal QA placeholder for archive routing.",
    body: "<p>Test body.</p>",
    section: "kashmir",
    tags: ["test"],
    author: null,
    hero_image: {
      url: rkPost("69c991da38fc4.jpeg"),
      alt: "Kashmir news file photo",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(10),
    updated_at: daysAgo(10),
    reading_time_minutes: 1,
    is_breaking: false,
  },
  {
    id: "27",
    slug: "anantnag-neet-centres-9112",
    title: "NEET-UG 2026: 9,112 candidates appear at 29 centres in Anantnag",
    dek: "District administration adds shuttle buses for remote pockets.",
    body: "<p>Observers note smoother biometric flow versus last cycle.</p>",
    section: "kashmir",
    tags: ["education"],
    author: {
      name: "Rifat Jan",
      slug: "rifat-jan",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f62652261f5.jpg"),
      alt: "NEET examination centre",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 3,
    is_breaking: false,
  },
  {
    id: "28",
    slug: "poonch-volleyball-saqlain-probables",
    title: "Poonch spiker Saqlain sole J&K name in national volleyball probables",
    dek: "Coach credits academy hours in Surankote for technique gains.",
    body: "<p>National camp roster trims next month.</p>",
    section: "sports",
    tags: ["volleyball"],
    author: {
      name: "Tariq Mir",
      slug: "tariq-mir",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f6f5b88b491.jpeg"),
      alt: "Volleyball training",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(0),
    updated_at: daysAgo(0),
    reading_time_minutes: 3,
    is_breaking: false,
  },
  {
    id: "29",
    slug: "satish-sharma-tourism-jk",
    title: "Era of fear is over as tourist inflow rises in J&K: Satish Sharma",
    dek: "Stakeholders cite new flight connections and winter marketing.",
    body: "<p>Hoteliers still seek consistent rate cards for shoulder weeks.</p>",
    section: "kashmir",
    tags: ["tourism"],
    author: {
      name: "Satish Sharma",
      slug: "satish-sharma",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f75b1dd082d.jpeg"),
      alt: "Houseboats on Dal edge",
      credit: "RK",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 5,
    is_breaking: false,
  },
  {
    id: "30",
    slug: "imran-nabi-dar-regularisation-policy",
    title:
      "Employees’ demands to be addressed; phased regularisation to begin this year",
    dek: "NC spokesperson outlines legislative calendar expectations.",
    body: "<p>Unions await written timelines after assembly session.</p>",
    section: "india",
    tags: ["politics"],
    author: {
      name: "Imran Nabi Dar",
      slug: "imran-nabi-dar",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69ec632419cad.jpg"),
      alt: "Press briefing",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(6),
    updated_at: daysAgo(6),
    reading_time_minutes: 6,
    is_breaking: false,
  },
  {
    id: "31",
    slug: "baramulla-uri-reopens-traffic",
    title: "Baramulla–Uri NH reopens after landslide; traffic normalises",
    dek: "Single-lane pilot convoys precede full reopening",
    body: "<p>NHAI monitors slope stabilisation.</p>",
    section: "kashmir",
    tags: ["roads"],
    author: {
      name: "Rifat Jan",
      slug: "rifat-jan",
      avatar: null,
      column: null,
    },
    hero_image: {
      url: rkPost("69f78cb6f24c9.png"),
      alt: "Highway restoration work",
      credit: "Rising Kashmir",
    },
    published_at: daysAgo(1),
    updated_at: daysAgo(1),
    reading_time_minutes: 2,
    is_breaking: false,
  },
];

function normalizeArticle(a: Article): Article {
  const ur = urArticleOverlays[a.id];
  return {
    ...a,
    slug: normalizeSlug(a.slug, a.title),
    i18n: ur ? { ur } : undefined,
  };
}

export const articles: Article[] = rawArticles.map(normalizeArticle);

export function getArticleBySlug(slug: string): Article | undefined {
  const want = normalizeSlug(slug);
  return articles.find((a) => a.slug === want);
}

export function getBreakingArticles(): Article[] {
  return articles.filter((a) => a.is_breaking).sort(
    (x, y) =>
      new Date(y.published_at).getTime() - new Date(x.published_at).getTime(),
  );
}

export function getLeadStory(): Article {
  return articles[0]!;
}

export function getHomeSecondary(): Article[] {
  return articles.slice(1, 4);
}

export function getBySection(section: string, limit?: number): Article[] {
  const s = normalizeSlug(section);
  const list = articles
    .filter((a) => a.section === s)
    .sort(
      (x, y) =>
        new Date(y.published_at).getTime() - new Date(x.published_at).getTime(),
    );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getOpinionFeatured(): Article[] {
  return articles
    .filter((a) => a.section === "opinion" && a.author?.column)
    .slice(0, 3);
}

export function getColumnists(): {
  slug: string;
  name: string;
  column: string | null;
  avatar: string | null;
  articles: Article[];
}[] {
  const map = new Map<
    string,
    {
      slug: string;
      name: string;
      column: string | null;
      avatar: string | null;
      articles: Article[];
    }
  >();
  for (const a of articles) {
    if (a.section !== "opinion" || !a.author) continue;
    const key = a.author.slug;
    const cur = map.get(key) ?? {
      slug: normalizeSlug(a.author.slug),
      name: a.author.name,
      column: a.author.column,
      avatar: a.author.avatar,
      articles: [],
    };
    cur.articles.push(a);
    map.set(key, cur);
  }
  return [...map.values()].map((c) => ({
    ...c,
    articles: c.articles.sort(
      (x, y) =>
        new Date(y.published_at).getTime() -
        new Date(x.published_at).getTime(),
    ),
  }));
}

/** Articles from the last 7 days only — use for any “most read” style module */
export function getRecentArticles(days = 7): Article[] {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return articles.filter((a) => new Date(a.published_at).getTime() >= cutoff);
}

const DEFAULT_PAGE_SIZE = 8;

export function getSectionPage(
  section: string,
  page: number,
  pageSize = DEFAULT_PAGE_SIZE,
): {
  articles: Article[];
  totalPages: number;
  currentPage: number;
  total: number;
} {
  const items = getBySection(section);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const slice = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  return { articles: slice, totalPages, currentPage, total };
}
