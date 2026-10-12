import type { Element, Root } from "hast";
import { toString } from "hast-util-to-string";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { SKIP, visit } from "unist-util-visit";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

const HEADING_RE = /^h([1-6])$/;

/**
 * The page already renders the title as the only <h1>. Many posts use `#` for
 * sections, so when a post contains an h1, shift every heading down one level.
 */
const rehypeDemoteHeadings = () => (tree: Root) => {
  let hasH1 = false;
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "h1") hasH1 = true;
  });
  if (!hasH1) return;

  visit(tree, "element", (node: Element) => {
    const match = HEADING_RE.exec(node.tagName);
    if (match) node.tagName = `h${Math.min(6, Number(match[1]) + 1)}`;
  });
};

/** Collects h2/h3 headings (after rehype-slug assigned ids) for the table of contents. */
const rehypeCollectToc = (toc: TocItem[]) => () => (tree: Root) => {
  visit(tree, "element", (node: Element) => {
    if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
      toc.push({
        id: String(node.properties.id),
        text: toString(node).trim(),
        depth: node.tagName === "h2" ? 2 : 3,
      });
    }
  });
};

/** External links open in a new tab; images load lazily (many are hotlinked). */
const rehypeEnhanceElements = () => (tree: Root) => {
  visit(tree, "element", (node: Element) => {
    const props = (node.properties ??= {});

    if (node.tagName === "a" && typeof props.href === "string" && /^https?:\/\//.test(props.href)) {
      props.target = "_blank";
      props.rel = ["noopener", "noreferrer"];
    }

    if (node.tagName === "img") {
      props.loading = "lazy";
      props.decoding = "async";
      props.referrerPolicy = "no-referrer";
    }

    // Wide tables scroll instead of breaking the layout on mobile.
    if (node.tagName === "table") {
      const table = { ...node };
      node.tagName = "div";
      node.properties = { className: ["overflow-x-auto"] };
      node.children = [table];
      return SKIP;
    }
  });
};

export const renderMarkdown = async (markdown: string) => {
  const toc: TocItem[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeDemoteHeadings)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor"] },
    })
    .use(rehypeCollectToc(toc))
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark-default" },
      keepBackground: false,
      defaultLang: "plaintext",
    })
    .use(rehypeEnhanceElements)
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), toc };
};
