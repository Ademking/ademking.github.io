import type { MetadataRoute } from "next";
import { categoryHref, postHref } from "@/lib/format";
import { getAllPosts, getCategories } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date;

  return [
    { url: absoluteUrl("/"), lastModified: latest, priority: 1 },
    { url: absoluteUrl("/posts/"), lastModified: latest, priority: 0.8 },
    { url: absoluteUrl("/categories/"), lastModified: latest, priority: 0.5 },
    { url: absoluteUrl("/projects/"), priority: 0.7 },
    { url: absoluteUrl("/cv/"), priority: 0.7 },
    { url: absoluteUrl("/about/"), priority: 0.5 },
    ...posts.map((post) => ({
      url: absoluteUrl(postHref(post.slug)),
      lastModified: post.date,
      priority: 0.7,
    })),
    ...getCategories().map(({ name }) => ({
      url: absoluteUrl(categoryHref(name)),
      priority: 0.4,
    })),
  ];
}
