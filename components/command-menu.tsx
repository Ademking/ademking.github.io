"use client";

import { useFilter, useListCollection } from "@ark-ui/react";
import {
  CornerDownLeftIcon,
  FileTextIcon,
  HashIcon,
  SearchIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Command,
  CommandContent,
  CommandDialog,
  CommandDialogContent,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useClientValue } from "@/hooks/use-client-value";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface CommandPost {
  slug: string;
  title: string;
  categories: string[];
}

interface CommandEntry {
  value: string;
  label: string;
  group: "Pages" | "Articles" | "Topics";
  keywords?: string;
  href?: string;
  /** Plain browser navigation (files), not a client-side route. */
  external?: boolean;
}

const PAGES: CommandEntry[] = [
  { value: "page:home", label: "Home", group: "Pages", href: "/" },
  { value: "page:articles", label: "Blog", group: "Pages", href: "/posts/" },
  { value: "page:projects", label: "Projects", group: "Pages", href: "/projects/" },
  { value: "page:topics", label: "Topics", group: "Pages", href: "/categories/" },
  { value: "page:cv", label: "CV / Resume", group: "Pages", href: "/cv/" },
  { value: "file:cv-pdf", label: "Download CV (PDF)", group: "Pages", href: site.cvPdf, external: true },
  { value: "page:about", label: "About me", group: "Pages", href: "/about/" },
];


const ICONS = {
  Pages: FileTextIcon,
  Articles: FileTextIcon,
  Topics: HashIcon,
} as const;


interface CommandMenuProps {
  posts: CommandPost[];
  categories: string[];
  className?: string;
}

export const CommandMenu = ({ posts, categories, className }: CommandMenuProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isMac = useClientValue(() => /mac|iphone|ipad/i.test(navigator.userAgent), true);

  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection<CommandEntry>({
    initialItems: [
      ...PAGES,
      ...posts.map<CommandEntry>((post) => ({
        value: `post:${post.slug}`,
        label: post.title,
        group: "Articles",
        keywords: post.categories.join(" "),
        href: `/posts/${post.slug}/`,
      })),
      ...categories.map<CommandEntry>((category) => ({
        value: `topic:${category}`,
        label: category,
        group: "Topics",
        href: `/categories/${encodeURIComponent(category)}/`,
      })),
    ],
    filter: contains,
    itemToString: (item) => `${item.label} ${item.keywords ?? ""}`,
    groupBy: (item) => item.group,
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");

      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const runEntry = (entry: CommandEntry | undefined) => {
    if (!entry) return;
    setOpen(false);
    filter("");
    if (entry.external && entry.href) window.location.assign(entry.href);
    else if (entry.href) router.push(entry.href);
  };

  return (
    <CommandDialog
      onOpenChange={({ open: next }) => {
        setOpen(next);
        if (!next) filter("");
      }}
      open={open}
    >
      <button
        aria-label="Search articles"
        className={cn(
          "inline-flex h-8 items-center gap-2 border bg-card px-2.5 text-muted-foreground text-sm",
          "transition-colors hover:bg-accent hover:text-accent-foreground",
          "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/32",
          className
        )}
        onClick={() => setOpen(true)}
        type="button"
      >
        <SearchIcon className="size-4" />
        <span className="hidden flex-1 text-left md:inline">Search articles…</span>
        <KbdGroup className="hidden md:inline-flex">
          <Kbd variant="outline">{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd variant="outline">K</Kbd>
        </KbdGroup>
      </button>

      <CommandDialogContent
        description="Search articles, topics and pages"
        title="Search"
      >
        <Command
          collection={collection}
          onInputValueChange={({ inputValue }) => filter(inputValue)}
          onValueChange={({ items }) => runEntry(items[0])}
        >
          <CommandInput placeholder="Search articles, topics, pages…" />
          <CommandContent>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {collection.group().map(([group, items]) => (
                <CommandGroup heading={group} key={group}>
                  {items.map((item) => {
                    const Icon = ICONS[item.group];
                    return (
                      <CommandItem item={item} key={item.value}>
                        <Icon className="size-4 shrink-0 opacity-60" />
                        <span className={cn("truncate", item.group === "Topics" && "capitalize")}>
                          {item.label}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </CommandContent>
          <CommandFooter>
            <span className="flex items-center gap-1.5">
              <Kbd variant="outline">↑</Kbd>
              <Kbd variant="outline">↓</Kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd variant="outline">
                <CornerDownLeftIcon />
              </Kbd>
              to open
            </span>
          </CommandFooter>
        </Command>
      </CommandDialogContent>
    </CommandDialog>
  );
};
