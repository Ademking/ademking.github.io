export type RecognitionCategory = "Press & media" | "Open source" | "Security" | "Community";

export interface Recognition {
  /** "YYYY-MM", or "YYYY" when only the year is known. Dates are approximate. */
  date: string;
  category: RecognitionCategory;
  title: string;
  detail: string;
  href?: string;
  /** Shown in the short list on the home page. */
  highlight?: boolean;
}

export const recognitions: Recognition[] = [
  // Press & media
  {
    date: "2026-03",
    category: "Press & media",
    title: "BetterViewer featured in CHIP Magazine",
    detail: "One of Europe’s leading tech magazines covered my open-source image viewer.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7440849944414117888/",
    highlight: true,
  },
  {
    date: "2025-07",
    category: "Press & media",
    title: "Mentioned by Al Jazeera",
    detail: "Cited in Al Jazeera’s report on the wave of cyberattacks against Tunisian websites.",
    href: "https://aja.ws/lxyamm",
    highlight: true,
  },
  {
    date: "2024-09",
    category: "Press & media",
    title: "Interviewed on Radio Sfax",
    detail: "Talked about T3alem.tn and how it helps thousands of Tunisians learn for free.",
    href: "https://www.linkedin.com/posts/ademkouki_freeeducation-ugcPost-7243967611653287937-wyxh/",
  },
  {
    date: "2024-03",
    category: "Press & media",
    title: "Interviewed on Tunisian National Radio",
    detail: "Presented T3alem.tn, the free learning platform in Tunisian dialect.",
    href: "https://www.linkedin.com/posts/ademkouki_education-tunisia-radiointerview-ugcPost-7169777155340546048-zNE0/",
    highlight: true,
  },
  {
    date: "2024",
    category: "Press & media",
    title: "BetterViewer reviewed by ODORIZZI",
    detail: "A video review by the Brazilian tech YouTuber, with over 160K subscribers.",
    href: "https://www.youtube.com/watch?v=uo_arb-Lmhc",
  },
  {
    date: "2024-02",
    category: "Press & media",
    title: "T3alem.tn featured by Success Story",
    detail: "The 127K-follower page told the story of the platform and its creator.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7165469936406970368/",
  },

  // Open source
  {
    date: "2026-07",
    category: "Open source",
    title: "MD This Page passes 1,000 GitHub stars and 10,000 users",
    detail: "Shared and reviewed across Twitter, YouTube and developer blogs.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7478895867417096192/",
    highlight: true,
  },
  {
    date: "2026-06",
    category: "Open source",
    title: "SkillPrompts trending on GitHub",
    detail: "The third time one of my projects reached GitHub Trending.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7468751448030474240/",
  },
  {
    date: "2026-05",
    category: "Open source",
    title: "#12 Product of the Day on Product Hunt",
    detail: "MD This Page, on its Product Hunt launch.",
    href: "https://www.producthunt.com/products/md-this-page",
  },
  {
    date: "2025-12",
    category: "Open source",
    title: "use-nemo goes viral in the React community",
    detail: "A joke about React directives turned into a library developers shared widely.",
    href: "https://thisweekinreact.com/newsletter/260",
  },
  {
    date: "2025-04",
    category: "Open source",
    title: "BetterViewer adopted by Orion Browser",
    detail: "Kagi’s Orion Browser uses BetterViewer.",
    href: "https://x.com/KagiHQ/status/1914477027157270767",
    highlight: true,
  },
  {
    date: "2024",
    category: "Open source",
    title: "Default image viewer of Jadua Go Browser",
    detail: "The open-source Firefox-based browser ships BetterViewer as its image viewer.",
    href: "https://www.jaduastudios.com/jadua-go",
  },
  {
    date: "2021-01",
    category: "Open source",
    title: "vsChat featured on daily.dev, #6 on Product Hunt",
    detail: "My VS Code chat extension, on its launch day.",
    href: "https://www.producthunt.com/posts/vschat",
  },
  {
    date: "2020",
    category: "Open source",
    title: "Koukicons used by CodeCanyon’s #1 best seller",
    detail: "The top-selling app on CodeCanyon shipped my Flutter icon library.",
    href: "https://codecanyon.net/item/fluxstore-the-universal-woocommerce-magento-opencart-mobile-app-by-flutter-framework/24020929",
  },

  // Security
  {
    date: "2026-04",
    category: "Security",
    title: "FlashFuzz recommended by a cybersecurity trainer",
    detail: "Martín Oettel (Pasandodata) recommended it to Dev, Ops and Sec teams for finding exposed secrets.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7450251461340434434/",
  },
  {
    date: "2025-07",
    category: "Security",
    title: "Disclosed a supply-chain RCE vector in shadcn/ui registries",
    detail: "Showed with a proof of concept how a malicious registry can run shell commands on a developer’s machine.",
    href: "https://dev.to/ademkouki/the-risk-of-registry-injection-attacks-with-shadcn-4cjl",
  },
  {
    date: "2025-06",
    category: "Security",
    title: "Repolist cited in a security book",
    detail:
      "Featured in “Enumerating Esoteric Attack Surfaces: Recon for Bug Bounty Hunters, Penetration Testers and OSINT aggressors” by Jann Moon.",
    href: "https://www.amazon.com/Enumerating-Esoteric-Attack-Surfaces-Penetration-ebook/dp/B0CWDPHHMR",
    highlight: true,
  },
  {
    date: "2025-06",
    category: "Security",
    title: "Nuclei template for Roundcube CVE-2025-49113",
    detail: "Detection for a critical (CVSS 9.9) post-auth RCE that existed for ten years.",
    href: "https://github.com/Ademking/CVE-2025-49113-nuclei-template",
  },
  {
    date: "2025-03",
    category: "Security",
    title: "Recognized by ProjectDiscovery",
    detail:
      "My Nuclei template for the Next.js middleware bypass CVE-2025-29927 (CVSS 9.1) was accepted into the official templates.",
    href: "https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass",
    highlight: true,
  },
  {
    date: "2025",
    category: "Security",
    title: "Took down phishing campaigns targeting Tunisians",
    detail:
      "Investigated fake bank and D17 login pages and a global Facebook phishing operation, wiped the stolen victim data and got the sites taken down.",
    href: "/posts/phishing-not-on-my-watch/",
  },
  {
    date: "2024-05",
    category: "Security",
    title: "Repolist shared by DailyOSINT",
    detail: "Promoted by SOCRadar’s DailyOSINT to its 14K followers as a recon tool.",
    href: "https://www.linkedin.com/feed/update/urn:li:share:7196801225672032256/",
  },
  {
    date: "2022-01",
    category: "Security",
    title: "First bug bounty from GitHub",
    detail: "Rewarded through GitHub’s program on HackerOne.",
    href: "https://www.linkedin.com/posts/ademkouki_%D8%A7%D9%84%D8%AD%D9%85%D8%AF-%D9%84%D9%84%D9%87-my-first-bug-bounty-from-github-share-6887539625053749248-tzIG/",
  },

  // Community
  {
    date: "2025-01",
    category: "Community",
    title: "T3alem.tn reaches 10,000+ free videos",
    detail: "Less than a year after launch, after 19,000 users on its first day.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7281321709683527681/",
  },
  {
    date: "2024",
    category: "Community",
    title: "T3alem.tn in the Gemini API Developer Competition",
    detail: "Showcased by Google for its Tunisian-dialect learning assistant.",
    href: "https://ai.google.dev/competition/projects/t3alemtn",
  },
  {
    date: "2024-05",
    category: "Community",
    title: "Internship lists for Tunisian students",
    detail:
      "Every year I collect hundreds of internship offers for students; the lists have been viewed tens of thousands of times.",
    href: "https://www.linkedin.com/posts/ademkouki_stage-internship-opportunities-share-7197679176282173440-obK_/",
  },
];

const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export const formatRecognitionDate = (date: string) =>
  /^\d{4}$/.test(date) ? date : monthFormat.format(new Date(`${date}-01T00:00:00Z`));

export const recognitionCategories: RecognitionCategory[] = [
  "Press & media",
  "Open source",
  "Security",
  "Community",
];

export const highlightedRecognitions = recognitions.filter((item) => item.highlight);
