import { site } from "@/lib/site";

const links = [
  { href: `mailto:${site.author.email}`, label: "Email" },
  { href: site.social.github, label: "GitHub" },
  { href: site.social.linkedin, label: "LinkedIn" },
  { href: site.social.twitter, label: "X" },
  { href: "/feed.xml", label: "RSS" },
];

export const SiteFooter = () => (
  <footer className="mt-24 border-t" data-site-footer>
    <div className="gutter flex flex-col gap-4 py-8 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
      <span>
        © {new Date().getFullYear()} {site.author.name}
      </span>
      <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map(({ href, label }) => (
          <a
            className="transition-colors hover:text-foreground"
            href={href}
            key={label}
            rel="noopener noreferrer"
            target={href.startsWith("http") ? "_blank" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);
