"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export const TableOfContents = ({ items }: { items: TocItem[] }) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-4 font-medium">On this page</p>
      <ul className="space-y-1 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l border-transparent py-1 text-muted-foreground leading-snug transition-colors hover:text-foreground",
                item.depth === 2 ? "pl-3" : "pl-6",
                "aria-[current=location]:border-brand aria-[current=location]:text-foreground"
              )}
              href={`#${item.id}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
