import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { site } from "@/lib/site";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
// Jekyll-style filenames: `YYYY-MM-DD-the-slug.md`
const FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
const WORDS_PER_MINUTE = 200;

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  image: string;
  /** Explicit `description` from front matter, if any. */
  description?: string;
  /** Description, or a summary of the first paragraph. Used for cards and meta tags. */
  excerpt: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

const normalizeImage = (image: unknown) => {
  if (typeof image !== "string" || !image.trim()) return site.defaultImage;
  if (/^https?:\/\//.test(image)) return image;
  return image.startsWith("/") ? image : `/${image}`;
};

const normalizeCategories = (value: unknown): string[] => {
  const list = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[\s,]+/)
      : [];
  return [...new Set(list.map((c) => String(c).trim().toLowerCase()).filter(Boolean))];
};

/** Drops Liquid `{% raw %}` wrappers left over from the Jekyll days. */
const stripLiquid = (markdown: string) =>
  markdown.replace(/\{%-?\s*(end)?raw\s*-?%\}/g, "");

/** Plain-text summary from the first real paragraph of the post. */
const makeExcerpt = (markdown: string, maxLength = 180) => {
  const paragraph =
    markdown
      .replace(/```[\s\S]*?```/g, "")
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^(#|!\[|<|>|\||-|\*|\d+\.)/.test(block)) ?? "";

  const text = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > maxLength
    ? `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`
    : text;
};

const readingTime = (markdown: string) => {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

const parsePost = (filename: string): Post | null => {
  const match = FILENAME_RE.exec(filename);
  if (!match) return null;

  const [, fileDate, slug] = match;
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content: body } = matter(raw);
  const content = stripLiquid(body);

  const date =
    data.date instanceof Date
      ? data.date
      : new Date(data.date ? String(data.date) : `${fileDate}T00:00:00Z`);

  return {
    slug,
    title: String(data.title ?? slug),
    date: date.toISOString(),
    categories: normalizeCategories(data.categories ?? data.category),
    image: normalizeImage(data.image),
    description: data.description ? String(data.description) : undefined,
    excerpt: data.description ? String(data.description) : makeExcerpt(content),
    readingTime: readingTime(content),
    content,
  };
};

let cache: Post[] | null = null;

const loadPosts = () => {
  // Posts dated in the future stay hidden until a build runs on/after that date
  // (the deploy workflow rebuilds daily).
  const now = new Date().toISOString();
  cache ??= fs
    .readdirSync(POSTS_DIR)
    .map(parsePost)
    .filter((post): post is Post => post !== null && post.date <= now)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
};

const toMeta = (post: Post): PostMeta => {
  const { content, ...meta } = post;
  void content;
  return meta;
};

export const getAllPosts = (): PostMeta[] => loadPosts().map(toMeta);

export const getPost = (slug: string) =>
  loadPosts().find((post) => post.slug === slug);

/** Older/newer neighbours for the post footer. */
export const getAdjacentPosts = (slug: string) => {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
};

/** Posts sharing the most categories with the given one. */
export const getRelatedPosts = (slug: string, limit = 3) => {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.categories.filter((c) => current.categories.includes(c)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map(({ post }) => post);
};

export const getCategories = () => {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const category of post.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

export const getPostsByCategory = (category: string) =>
  getAllPosts().filter((post) => post.categories.includes(category));
