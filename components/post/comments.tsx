"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/** giscus comments (GitHub Discussions), re-themed when the site theme changes. */
export const Comments = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark_dimmed" : "light";

  // Mount the giscus script once.
  useEffect(() => {
    const container = ref.current;
    if (!container || container.hasChildNodes()) return;

    const script = document.createElement("script");
    const attrs: Record<string, string> = {
      src: "https://giscus.app/client.js",
      "data-repo": site.giscus.repo,
      "data-repo-id": site.giscus.repoId,
      "data-category": site.giscus.category,
      "data-category-id": site.giscus.categoryId,
      // Same mapping as the Jekyll site, so existing discussions stay attached.
      "data-mapping": "url",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": theme,
      "data-lang": "en",
      "data-loading": "lazy",
      crossorigin: "anonymous",
    };
    for (const [key, value] of Object.entries(attrs)) script.setAttribute(key, value);
    script.async = true;
    container.append(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- theme updates are pushed below
  }, []);

  // Keep the iframe in sync with the site theme.
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
  }, [theme]);

  return <div className="giscus" ref={ref} />;
};
