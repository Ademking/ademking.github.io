export type ProjectCategory =
  | "Web platform"
  | "Browser extension"
  | "Developer tool"
  | "Security tool"
  | "Library"
  | "App";

export interface Project {
  name: string;
  category: ProjectCategory;
  /** "YYYY-MM" for repos (first commit), "YYYY" when only the year is known. */
  date: string;
  summary: string;
  /** Screenshot in public/assets/projects/. */
  image: string;
  /** Logos and phone screenshots are letterboxed instead of cropped. */
  fit?: "contain";
  /** Live site, store page or package. */
  href?: string;
  repo?: string;
  /** GitHub stars when the page was last updated. */
  stars?: number;
  featured?: boolean;
}

const gh = (name: string) => `https://github.com/Ademking/${name}`;
const img = (file: string) => `/assets/projects/${file}.webp`;

export const projects: Project[] = [
  {
    name: "T3alem.tn",
    category: "Web platform",
    date: "2024-02",
    summary:
      "Tunisia’s first large-scale e-learning platform in the local dialect: 10,000+ free lessons and 1,400+ playlists across IT, business, languages and more, with a Gemini-powered assistant.",
    image: img("t3alem"),
    href: "https://t3alem.tn/",
    featured: true,
  },
  {
    name: "Thi9a",
    category: "Web platform",
    date: "2026-06",
    summary:
      "Read and share genuine reviews of businesses, restaurants, doctors and freelancers across Tunisia. 90+ categories, searchable by governorate, in Arabic, French, English and Derja.",
    image: img("thi9a"),
    href: "https://thi9a.app/",
    featured: true,
  },
  {
    name: "Élevage Tunisie",
    category: "Web platform",
    date: "2026",
    summary:
      "Online livestock management for Tunisian farmers: herd and animal registry, births, sales, health plans and balanced feed rations.",
    image: img("elevage"),
    href: "https://elevage-tunisie.com/",
    featured: true,
  },
  {
    name: "MD This Page",
    category: "Browser extension",
    date: "2026-04",
    summary:
      "Turn any web page into clean, LLM-ready Markdown in one click. 10,000+ users and #12 Product of the Day on Product Hunt.",
    image: img("md-this-page"),
    href: "https://chromewebstore.google.com/detail/md-this-page/banfcmclfmmlbkhionmemhibbjedhikm",
    repo: gh("MD-This-Page"),
    stars: 1610,
    featured: true,
  },
  {
    name: "BetterViewer",
    category: "Browser extension",
    date: "2021-11",
    summary:
      "A fast image viewer and editor that replaces the browser’s built-in one. Featured in CHIP Magazine and used by Orion Browser.",
    image: img("betterviewer"),
    href: "https://betterviewer.web.app",
    repo: gh("BetterViewer"),
    stars: 536,
    featured: true,
  },
  {
    name: "SkillPrompts",
    category: "Browser extension",
    date: "2026-05",
    summary:
      "Create, organize and reuse AI prompts with variables and reusable blocks, then insert them into ChatGPT and other AI chat platforms.",
    image: img("skillprompts"),
    fit: "contain",
    href: "https://skillprompts.surge.sh",
    repo: gh("SkillPrompts"),
    stars: 173,
    featured: true,
  },
  {
    name: "localportal",
    category: "Developer tool",
    date: "2026-10",
    summary:
      "Mirror any website on 127.0.0.1 with one command: a zero-config local reverse proxy that handles redirects, cookies, links and websockets.",
    image: img("localportal"),
    fit: "contain",
    href: "https://pypi.org/project/localportal-cli/",
    repo: gh("localportal"),
    stars: 1,
  },
  {
    name: "sourcedump",
    category: "Security tool",
    date: "2026-08",
    summary:
      "Recover a website’s original source files from its published JS/CSS sourcemaps, like the Sources panel in Chrome DevTools, but on disk.",
    image: img("sourcedump"),
    fit: "contain",
    repo: gh("sourcedump"),
    stars: 1,
  },
  {
    name: "ng-inertia",
    category: "Library",
    date: "2026-04",
    summary:
      "An Angular adapter for Inertia.js: render pages from a Laravel (or any Inertia) backend with routing, layouts, links and form helpers.",
    image: img("ng-inertia"),
    fit: "contain",
    repo: gh("ng-inertia"),
    stars: 10,
  },
  {
    name: "cascader-shadcn",
    category: "Library",
    date: "2025-12",
    summary:
      "A cascading dropdown for shadcn/ui to pick hierarchical data such as locations, categories or org structures. Inspired by Ant Design.",
    image: img("cascader-shadcn"),
    fit: "contain",
    href: "https://cascader-shadcn.surge.sh",
    repo: gh("cascader-shadcn"),
    stars: 115,
  },
  {
    name: "use-nemo",
    category: "Library",
    date: "2025-11",
    summary:
      "A Vite plugin for custom React-style directives: define your own \"use something\" annotations and the code transforms they trigger.",
    image: img("use-nemo"),
    repo: gh("use-nemo"),
    stars: 169,
  },
  {
    name: "how",
    category: "Developer tool",
    date: "2025-10",
    summary:
      "A terminal assistant powered by Gemini that generates exact shell commands from plain English, aware of your OS, files and tools.",
    image: img("how"),
    repo: gh("how"),
    stars: 154,
  },
  {
    name: "FlashFuzz",
    category: "Security tool",
    date: "2025-10",
    summary:
      "A browser extension to quickly fuzz URLs and scan for exposed secrets directly from your open tabs during recon.",
    image: img("flashfuzz"),
    fit: "contain",
    repo: gh("FlashFuzz"),
    stars: 55,
  },
  {
    name: "repolist",
    category: "Security tool",
    date: "2023-11",
    summary:
      "Generate wordlists of file and directory paths from GitHub repositories, for content discovery during penetration tests.",
    image: img("repolist"),
    href: "https://pypi.org/project/repolist/",
    repo: gh("repolist"),
    stars: 108,
  },
  {
    name: "Entiwin",
    category: "Web platform",
    date: "2023-07",
    summary:
      "The Tunisian GeoGuessr: guess locations across Tunisia from Google Street View images. Built with Angular and Tailwind CSS.",
    image: img("entiwin"),
    href: "https://entiwin.surge.sh",
    repo: gh("Entiwin"),
    stars: 8,
  },
  {
    name: "TeamTrack",
    category: "Web platform",
    date: "2023-03",
    summary: "A web application for employee management.",
    image: img("teamtrack"),
    fit: "contain",
    repo: gh("TeamTrack"),
  },
  {
    name: "Tennis Academy",
    category: "Web platform",
    date: "2022-08",
    summary:
      "Manage a tennis academy’s members, courts and bookings. Built with Laravel and Angular as a university project at SESAME.",
    image: img("tennis-academy"),
    repo: gh("tennis-academy"),
    stars: 3,
  },
  {
    name: "Terminal Portfolio",
    category: "Developer tool",
    date: "2022-05",
    summary: "My portfolio, right in your terminal. Just run npx ademkouki.",
    image: img("terminal-portfolio"),
    href: "https://www.npmjs.com/package/ademkouki",
    repo: gh("terminal-portfolio"),
  },
  {
    name: "Happydia",
    category: "Browser extension",
    date: "2020-10",
    summary:
      "Cleans sad, triggering or just plain annoying news out of your social media feeds. Featured on Product Hunt.",
    image: img("happydia"),
    fit: "contain",
    href: "https://chrome.google.com/webstore/detail/happydia/eppbnnfjppbiockeliifocniohcpnhlm",
    repo: gh("happydia"),
    stars: 9,
  },
  {
    name: "Profile Picture Viewer",
    category: "Browser extension",
    date: "2020-09",
    summary:
      "Bypass the profile picture guard on Facebook, Instagram and TikTok to see profile pictures in full size.",
    image: img("profile-picture-viewer"),
    href: "https://chrome.google.com/webstore/detail/facebook-profile-picture/olhdholihhioakdjhfhligfehfjjfeoc",
    repo: gh("profile-picture-viewer"),
    stars: 71,
  },
  {
    name: "Phonebook",
    category: "App",
    date: "2020-09",
    summary: "A desktop contact manager built with Java and JavaFX.",
    image: img("phonebook"),
    repo: gh("phonebook"),
  },
  {
    name: "SuiviPosteTN",
    category: "App",
    date: "2019-09",
    summary:
      "A Flutter app to track Tunisian Post shipments and get delivery confirmations at any time.",
    image: img("suivipostetn"),
    fit: "contain",
    href: "http://bit.ly/suivi_postetn",
    repo: gh("SuiviPosteTN"),
    stars: 6,
  },
  {
    name: "Koukicons",
    category: "Library",
    date: "2019-07",
    summary:
      "A Flutter package with 700+ colorful icons, designed for easy integration, customization and small app sizes.",
    image: img("koukicons_flutter"),
    fit: "contain",
    href: "https://pub.dev/packages/koukicons",
    repo: gh("koukicons_flutter"),
    stars: 139,
  },
  {
    name: "Foundit",
    category: "Web platform",
    date: "2019-02",
    summary:
      "Keep your things safe: generate a QR code with your contact details to put on your belongings, so whoever finds them can reach you. Featured on Product Hunt.",
    image: img("foundit"),
    href: "https://foundit.surge.sh/",
    repo: gh("Foundit"),
    stars: 15,
  },
  {
    name: "InstaFollower",
    category: "Developer tool",
    date: "2019-01",
    summary: "A small Node.js script that auto-follows Instagram users from a list.",
    image: img("instafollower"),
    repo: gh("InstaFollower"),
    stars: 75,
  },
  {
    name: "RadioChatTN",
    category: "App",
    date: "2018-07",
    summary: "Radio + chat = RadioChat: an Ionic app that pairs Tunisian radio with a chat room.",
    image: img("radiochattn"),
    fit: "contain",
    href: "https://goo.gl/iDTaou",
    repo: gh("RadioChatTN"),
  },
  {
    name: "CoolConsole",
    category: "Library",
    date: "2018-06",
    summary:
      "Write beautiful, styled console.log() output in the browser console, with built-in styles and icons and no CSS required.",
    image: img("coolconsole"),
    fit: "contain",
    repo: gh("CoolConsole"),
    stars: 23,
  },
];

const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export const formatProjectDate = (date: string) =>
  /^\d{4}$/.test(date) ? date : monthFormat.format(new Date(`${date}-01T00:00:00Z`));

export const featuredProjects = projects.filter((p) => p.featured);

/** Everything else, newest first. */
export const otherProjects = projects
  .filter((p) => !p.featured)
  .sort((a, b) => b.date.localeCompare(a.date));
