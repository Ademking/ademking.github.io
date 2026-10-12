/** Full years since starting at NextGRC in September 2019. */
export const yearsOfExperience = () => {
  const now = new Date();
  return now.getUTCFullYear() - 2019 - (now.getUTCMonth() < 8 ? 1 : 0);
};

export const cv = {
  name: "Adem Kouki",
  title: "Senior Full-Stack Software Engineer",
  location: "Tunis, Tunisia",
  summary:
    `Full-Stack Software Engineer with ${yearsOfExperience()}+ years of experience building and maintaining enterprise web applications, mainly using Java, Spring Boot, and modern frontend frameworks. Strong focus on clean architecture, scalability, and secure-by-design development. Experienced in mentoring junior developers and delivering production-ready systems.`,

  skills: [
    {
      group: "Languages",
      items: ["Java", "TypeScript", "JavaScript", "PHP", "Python", "Dart", "Go", "C#", "Bash", "PowerShell"],
    },
    { group: "Front-end", items: ["React", "Angular", "Vue.js", "Tailwind CSS", "Sass", "Less"] },
    {
      group: "Back-end",
      items: ["Spring Boot", "Laravel", "Next.js", "Node.js", "Django", "REST APIs", "GraphQL"],
    },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    {
      group: "DevOps & Cloud",
      items: ["Docker", "AWS", "Azure", "GitHub Actions", "GitLab CI/CD", "Travis CI", "Jenkins"],
    },
    { group: "Security", items: ["OWASP Top 10", "Metasploit", "Nexus", "Nuclei"] },
    { group: "Testing", items: ["JUnit", "Jest", "Vitest", "PHPUnit"] },
    { group: "Spoken", items: ["English (Fluent)", "French (Fluent)", "Arabic (Native)"] },
  ],

  experience: [
    {
      role: "Full-Stack Web Developer",
      company: "NextGRC",
      location: "Tunis, Tunisia",
      period: "Sep 2019 – Present",
      points: [
        "Built and maintained a large-scale GRC (Governance, Risk, and Compliance) platform used by major banks and large enterprises in Tunisia.",
        "Designed, developed, and evolved key business modules including Internal Audit and Operational Risk Management, improving reliability and usability of the system.",
        "Mentored junior developers through code reviews and technical guidance, contributing to higher code quality and team efficiency.",
      ],
    },
    {
      role: "Freelance Application Security & Web Developer",
      company: "ITC (Innovation Technology Consulting)",
      location: "Tunis, Tunisia",
      period: "2020 – Present",
      points: [
        "Performed security assessments on web applications, identifying common vulnerabilities and providing clear remediation recommendations to development teams.",
        "Worked closely with clients to improve application robustness by reviewing code-level issues and validating fixes in real-world environments.",
      ],
    },
    {
      role: "Graduation Internship",
      company: "NextGRC",
      location: "Bizerte, Tunisia",
      period: "2019",
      points: [
        "Developed an application for planning, monitoring, and reporting on audit missions using a risk-based approach to digitalize GRC processes.",
        "Managed the project throughout development, working with a team to identify and solve issues as they arose.",
        "Continued on the project after the internship, improving it and adding new features.",
      ],
    },
    {
      role: "Web Developer (Internship)",
      company: "ISET Bizerte",
      location: "Bizerte, Tunisia",
      period: "2018",
      points: ["Created a platform to manage students and internships at universities using Laravel."],
    },
    {
      role: "Technician (Internship)",
      company: "Tunisian Post",
      location: "Bizerte, Tunisia",
      period: "2017",
      points: [
        "Installed and configured computer operating systems, and diagnosed and solved hardware/software faults.",
      ],
    },
  ],

  education: [
    {
      degree: "Software Engineering Degree",
      school: "SESAME (Higher School of Technology and Management)",
      location: "Ariana, Tunisia",
      period: "Sep 2019 – Nov 2023",
      note: "Work-study program · Graduated with highest honors (mention Très bien)",
    },
    {
      degree: "Bachelor Degree in IT",
      school: "ISET Bizerte (Higher Institute of Technological Studies of Bizerte)",
      location: "Bizerte, Tunisia",
      period: "Sep 2016 – Jul 2019",
      note: "Field: Development of Information Systems",
    },
    {
      degree: "High School Degree",
      school: "“Jeune Fille” High School",
      location: "Bizerte, Tunisia",
      period: "2016",
      note: "Field: Experimental Sciences",
    },
  ],

  certifications: [
    { year: "2022", name: "IT Specialist – Software Development", issuer: "Certiport" },
    { year: "2021", name: "AWS Academy Graduate – Cloud Foundations", issuer: "Amazon Web Services" },
    { year: "2020", name: "Scrum Foundation Professional Certification (SFPC)", issuer: "CertiProf" },
    { year: "2020", name: "Scrum Fundamentals Certified", issuer: "SCRUMstudy" },
    { year: "2019", name: "MTA: Introduction to Programming Using Java", issuer: "Microsoft" },
    { year: "2018", name: "MTA: Database Fundamentals", issuer: "Microsoft" },
    { year: "2018", name: "MTA: HTML5 Application Development Fundamentals", issuer: "Microsoft" },
    { year: "2018", name: "MTA: Software Development Fundamentals", issuer: "Microsoft" },
  ],

  awards: [
    { year: "2022", name: "First bug bounty from GitHub", issuer: "HackerOne" },
    { year: "2019", name: "Best Student of the Year 2018–2019", issuer: "ISET Bizerte" },
    { year: "2019", name: "InnovaCon 2.0 Hackathon – First place", issuer: "Bizerte" },
    { year: "2017", name: "IBeDroid Challenge – First place", issuer: "ISET Bizerte" },
  ],

  projects: [
    {
      name: "T3alem.tn",
      kind: "E-learning platform",
      year: "2024",
      href: "https://t3alem.tn",
      summary:
        "Tunisia’s first large-scale e-learning platform in the local dialect: 10,000+ lessons and 1,400+ playlists across IT, business, languages and more.",
      highlight: "10,000+ lessons",
    },
    {
      name: "BetterViewer",
      kind: "Browser extension",
      year: "2024",
      href: "/posts/betterviewer-extension/",
      summary:
        "A fast, keyboard-friendly image viewer that replaces the browser’s default one, with intuitive controls for navigating, zooming and editing images.",
      highlight: "Users worldwide",
    },
    {
      name: "VSChat",
      kind: "VS Code extension",
      year: "2021",
      summary:
        "A chat platform inside VS Code for developers worldwide, with nickname-based interaction, user highlighting, inline image previews and auto-linked URLs.",
      highlight: "Real-time chat",
    },
    {
      name: "Koukicons",
      kind: "Flutter package",
      year: "2020",
      summary:
        "A Flutter package with 700+ colorful icons, built for easy integration, customization and small app sizes.",
      highlight: "700+ icons",
    },
    {
      name: "Tunbot",
      kind: "Chatbot",
      year: "2020",
      summary:
        "A popular Tunisian-dialect chatbot on Facebook Messenger offering news, entertainment, personalized content and essential services.",
      highlight: "150K+ users",
    },
  ],
} as const;
