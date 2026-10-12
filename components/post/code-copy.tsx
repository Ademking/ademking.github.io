"use client";

import { useEffect } from "react";

const COPY_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const CHECK_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

/** Adds a copy button to every highlighted code block inside `#article`. */
export const CodeCopy = () => {
  useEffect(() => {
    const figures = document.querySelectorAll<HTMLElement>(
      "#article figure[data-rehype-pretty-code-figure]"
    );
    const buttons: HTMLButtonElement[] = [];

    for (const figure of figures) {
      const pre = figure.querySelector("pre");
      if (!pre) continue;

      const button = document.createElement("button");
      button.type = "button";
      button.ariaLabel = "Copy code";
      button.innerHTML = COPY_ICON;
      button.className =
        "absolute right-2 bottom-2 grid size-7 place-items-center rounded-md border bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition hover:text-foreground focus-visible:opacity-100 group-hover/code:opacity-100 max-md:opacity-100";
      button.addEventListener("click", async () => {
        await navigator.clipboard.writeText(pre.innerText);
        button.innerHTML = CHECK_ICON;
        setTimeout(() => {
          button.innerHTML = COPY_ICON;
        }, 1500);
      });

      figure.classList.add("group/code");
      figure.append(button);
      buttons.push(button);
    }

    return () => {
      for (const button of buttons) button.remove();
    };
  }, []);

  return null;
};
