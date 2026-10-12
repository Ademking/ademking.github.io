"use client";

import Link from "next/link";
import { useEffect } from "react";

/** The Jekyll site had `/search?query=…`; forward those links to the archive search. */
export default function LegacySearchRedirect() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("query");
    window.location.replace(query ? `/posts/?q=${encodeURIComponent(query)}` : "/posts/");
  }, []);

  return (
    <p className="mx-auto max-w-3xl px-4 py-20 text-muted-foreground">
      Redirecting to <Link className="underline" href="/posts/">articles</Link>…
    </p>
  );
}
