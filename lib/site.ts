export const site = {
  name: "Adem's Dev Journey",
  shortName: "Adem Kouki",
  description:
    "Engineering notes from a senior full-stack developer: Java, TypeScript, web security, tooling and lessons learned shipping enterprise software.",
  url: "https://ademking.github.io",
  locale: "en_US",
  defaultImage: "/assets/images/default-blog-post.png",
  ogImage: "/assets/ademkouki.site.png",
  googleAnalyticsId: "G-XE03XBH6YV",
  /** Downloadable CV, served from public/. */
  cvPdf: "/CV_ADEM_KOUKI.pdf",
  author: {
    name: "Adem Kouki",
    email: "ademkouki.tn@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/12462188?v=4",
    role: "Senior Full-Stack Software Engineer",
    location: "Tunis, Tunisia",
    bio: "I build enterprise web applications with Java, Spring Boot and modern front-ends, with a focus on clean architecture and secure-by-design development. Here I write about what I learn along the way.",
  },
  social: {
    github: "https://github.com/Ademking",
    linkedin: "https://www.linkedin.com/in/ademkouki",
    twitter: "https://twitter.com/kouki__adem",
  },
  giscus: {
    repo: "Ademking/ademking.github.io",
    repoId: "R_kgDOItKIrQ",
    category: "General",
    categoryId: "DIC_kwDOItKIrc4CTcrN",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/posts/", label: "Blog" },
    { href: "/projects/", label: "Projects" },
    { href: "/categories/", label: "Topics" },
    { href: "/cv/", label: "CV" },
    { href: "/about/", label: "About" },
  ],
} as const;

export const absoluteUrl = (path = "/") =>
  path.startsWith("http") ? path : `${site.url}${path}`;
