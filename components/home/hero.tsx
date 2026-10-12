import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cv } from "@/lib/cv";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const socials = [
  { href: site.social.github, label: "GitHub" },
  { href: site.social.linkedin, label: "LinkedIn" },
  { href: site.social.twitter, label: "X" },
];

export const Hero = () => (
  <section className="gutter border-b py-10 sm:py-14">
    <div className="max-w-4xl">
      <div className="flex items-center gap-5">
        <img
          alt={`Portrait of ${site.author.name}`}
          className="size-20 border object-cover sm:size-28"
          height={112}
          referrerPolicy="no-referrer"
          src={site.author.avatar}
          width={112}
        />
        <div>
          <p className="font-semibold text-lg sm:text-xl">{site.author.name}</p>
          <p className="mt-1 text-muted-foreground text-sm sm:text-base">
            {cv.title} · {cv.location}
          </p>
        </div>
      </div>

      <h1 className="mt-8 text-balance font-semibold text-3xl leading-tight tracking-tight sm:text-5xl sm:leading-tight">
        Software developer &amp; pentester.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Java, Spring Boot, PHP and TypeScript by day, application security on the side. I write
        about what I learn doing both.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
        <div className="flex flex-wrap gap-3">
          <Link
            className={cn(buttonVariants({ size: "xl" }), "bg-brand text-brand-foreground hover:bg-brand/90")}
            href="/posts/"
          >
            Read the blog
            <ArrowRightIcon />
          </Link>
          <a className={buttonVariants({ size: "xl", variant: "outline" })} download href={site.cvPdf}>
            <DownloadIcon />
            Download CV
          </a>
        </div>
        <nav aria-label="Social" className="flex gap-6 text-muted-foreground text-sm">
          {socials.map(({ href, label }) => (
            <a
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              href={href}
              key={label}
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </section>
);
