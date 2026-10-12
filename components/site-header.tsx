"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CommandMenu, type CommandPost } from "@/components/command-menu";
import { GitHubIcon } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

interface SiteHeaderProps {
  posts: CommandPost[];
  categories: string[];
}

export const SiteHeader = ({ posts, categories }: SiteHeaderProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl" data-site-header>
      <div className="gutter flex h-14 items-center gap-8">
        <Link className="shrink-0 font-semibold tracking-tight" href="/" onClick={() => setOpen(false)}>
          {site.author.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground",
                "aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <CommandMenu categories={categories} className="lg:w-64" posts={posts} />
          <a
            aria-label="GitHub"
            className={buttonVariants({ variant: "ghost", size: "icon-md" })}
            href={site.social.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-4" />
          </a>
          <Button
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
            size="icon-md"
            variant="ghost"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {open && (
        <nav aria-label="Main mobile" className="border-t lg:hidden" id="mobile-nav">
          {site.nav.map((item) => (
            <Link
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "gutter block border-b py-3.5 text-muted-foreground last:border-b-0",
                "aria-[current=page]:text-foreground aria-[current=page]:shadow-[inset_2px_0_0_var(--brand)]"
              )}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
