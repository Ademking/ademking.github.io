"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PostRow } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { PostMeta } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface PostBrowserProps {
  posts: PostMeta[];
  categories: { name: string; count: number }[];
}

const matches = (post: PostMeta, terms: string[]) => {
  const haystack = `${post.title} ${post.excerpt} ${post.categories.join(" ")}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
};

export const PostBrowser = ({ posts, categories }: PostBrowserProps) => {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);

  // Deep links: /posts/?q=angular&topic=javascript (old /search?query= links redirect here).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") ?? params.get("query");
    const t = params.get("topic");
    // Syncing from the URL once on mount; reading it during render would break the static HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q) setQuery(q);
    if (t) setTopic(t);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (topic) params.set("topic", topic);
    const search = params.toString();
    window.history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
  }, [query, topic]);

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter(
      (post) => (!topic || post.categories.includes(topic)) && matches(post, terms)
    );
  }, [posts, query, topic]);

  const byYear = useMemo(() => {
    const groups = new Map<number, PostMeta[]>();
    for (const post of filtered) {
      const year = new Date(post.date).getUTCFullYear();
      groups.set(year, [...(groups.get(year) ?? []), post]);
    }
    return [...groups.entries()];
  }, [filtered]);

  const topics = [{ name: null, count: posts.length }, ...categories];

  return (
    <div className="gutter grid grid-cols-[minmax(0,1fr)] gap-10 py-12 lg:grid-cols-12 lg:gap-12">
      {/* Filters */}
      <aside className="lg:col-span-3">
        <div className="space-y-6 lg:sticky lg:top-20">
          <div>
            <p className="mb-3 text-muted-foreground text-meta">Search</p>
            <InputGroup size="lg">
              <InputGroupAddon>
                <SearchIcon aria-hidden className="opacity-64" />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Search articles"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, summary or topic…"
                type="search"
                value={query}
              />
              {query && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Clear search" onClick={() => setQuery("")} size="icon-xs">
                    <XIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
          </div>

          <div>
            <p className="mb-3 text-muted-foreground text-meta">Topics</p>
            {/* Horizontal chips on small screens, vertical list on large ones */}
            <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:max-h-[calc(100svh-16rem)] lg:flex-col lg:gap-0 lg:overflow-y-auto lg:border lg:p-0">
              {topics.map(({ name, count }) => (
                <button
                  aria-pressed={topic === name}
                  className={cn(
                    "flex shrink-0 items-center justify-between gap-3 border px-3 py-2 text-left text-sm capitalize transition-colors",
                    "lg:border-0 lg:border-b lg:last:border-b-0",
                    "hover:bg-card hover:text-foreground",
                    topic === name
                      ? "border-brand bg-brand text-brand-foreground hover:bg-brand hover:text-brand-foreground"
                      : "text-muted-foreground"
                  )}
                  key={name ?? "all"}
                  onClick={() => setTopic(name)}
                  type="button"
                >
                  {name ?? "All posts"}
                  <span className="font-mono text-xs tabular-nums opacity-70">{count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="min-w-0 lg:col-span-9">
        <p aria-live="polite" className="border-b pb-4 text-muted-foreground text-meta">
          {filtered.length === posts.length
            ? `Showing all ${posts.length} articles`
            : `${filtered.length} of ${posts.length} articles`}
          {topic && <span className="text-brand"> · #{topic}</span>}
        </p>

        {byYear.length === 0 ? (
          <div className="mt-10 border border-dashed p-16 text-center">
            <p className="font-medium text-lg">No articles match your search.</p>
            <Button
              className="mt-6"
              onClick={() => {
                setQuery("");
                setTopic(null);
              }}
              variant="outline"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          byYear.map(([year, items]) => (
            <section className="mt-12" key={year}>
              <h2 className="flex items-baseline justify-between gap-3 border-b pb-4">
                <span className="font-semibold text-5xl tabular-nums tracking-tighter sm:text-6xl">{year}</span>
                <span className="text-muted-foreground text-meta">
                  {items.length} {items.length === 1 ? "article" : "articles"}
                </span>
              </h2>
              <div>
                {items.map((post) => (
                  <PostRow key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};
