import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArrowRightIcon, CakeIcon, DownloadIcon, MailIcon, MapPinIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Prose } from "@/components/ui/prose";
import { cv } from "@/lib/cv";
import { renderMarkdown } from "@/lib/markdown";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.author.name}: ${cv.title}.`,
  alternates: { canonical: "/about/" },
};

export default async function AboutPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "about.md"), "utf8");
  // The leading H1 ("Who am I?") is replaced by the page header.
  const markdown = matter(raw).content.replace(/^\s*#\s+[^\r\n]+\r?\n/, "");
  const { html } = await renderMarkdown(markdown);

  const links = [
    { href: `mailto:${site.author.email}`, label: "Email", Icon: MailIcon },
    { href: site.social.github, label: "GitHub", Icon: GitHubIcon },
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: site.social.twitter, label: "X / Twitter", Icon: XIcon },
  ];

  return (
    <>
      <PageHeader
        description={cv.summary}
        title="Who am I?"
      />

      <div className="gutter grid grid-cols-[minmax(0,1fr)] gap-12 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="space-y-px border bg-border lg:sticky lg:top-24">
            <div className="bg-background p-5">
              <img
                alt={site.author.name}
                className="aspect-square w-full border object-cover"
                referrerPolicy="no-referrer"
                src={site.author.avatar}
              />
              <p className="mt-5 font-semibold text-xl tracking-tight">{cv.name}</p>
              <p className="text-muted-foreground text-sm">{cv.title}</p>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <dt>
                    <MapPinIcon aria-label="Location" className="size-3.5" />
                  </dt>
                  <dd>{cv.location}</dd>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <dt>
                    <CakeIcon aria-label="Born" className="size-3.5" />
                  </dt>
                  <dd>June 29, 1996 · Bizerte</dd>
                </div>
              </dl>
            </div>
            <ul className="divide-y bg-background">
              {links.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    className="group flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-card hover:text-brand"
                    href={href}
                    rel="noopener noreferrer"
                    target={href.startsWith("http") ? "_blank" : undefined}
                  >
                    <Icon className="size-4 text-muted-foreground group-hover:text-brand" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="bg-background p-5">
              <a
                className={cn(buttonVariants({ size: "lg" }), "w-full bg-brand text-brand-foreground hover:bg-brand/90")}
                download
                href={site.cvPdf}
              >
                <DownloadIcon />
                Download CV (PDF)
              </a>
              <Link className={cn(buttonVariants({ size: "lg", variant: "outline" }), "mt-2 w-full")} href="/cv/">
                View CV online
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </aside>

        <Prose
          className="article about mx-0 w-full max-w-[75ch] lg:col-span-9 xl:col-span-7"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
