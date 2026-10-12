import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCell, PostMetaLine } from "@/components/post-card";
import { CodeCopy } from "@/components/post/code-copy";
import { Comments } from "@/components/post/comments";
import { PostActions } from "@/components/post/post-actions";
import { ReadingProgress } from "@/components/post/reading-progress";
import { TableOfContents } from "@/components/post/table-of-contents";
import { Prose } from "@/components/ui/prose";
import { categoryHref, postHref } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import { getAdjacentPosts, getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export const generateStaticParams = () => getAllPosts().map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  const url = postHref(post.slug);
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.categories,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [site.author.name],
      tags: post.categories,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const { html, toc } = await renderMarkdown(post.content);
  const { newer, older } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug, 3);
  const url = absoluteUrl(postHref(post.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: absoluteUrl(post.image),
    url,
    keywords: post.categories.join(", "),
    author: { "@type": "Person", name: site.author.name, url: site.url },
  };


  return (
    <>
      <ReadingProgress />
      <CodeCopy />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <article>
        <header className="gutter pt-14 pb-10 sm:pt-20">
          <Link
            className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/posts/"
          >
            <ArrowLeftIcon className="size-3.5" />
            Back to blog
          </Link>
          <h1 className="mt-8 max-w-4xl text-balance font-semibold text-4xl leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 max-w-3xl text-pretty text-muted-foreground text-xl leading-relaxed">
              {post.description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground text-sm">
            <span>{site.author.name}</span>
            <PostMetaLine post={post} />
            <span className="flex flex-wrap gap-x-3">
              {post.categories.map((category) => (
                <Link
                  className="capitalize transition-colors hover:text-brand"
                  href={categoryHref(category)}
                  key={category}
                >
                  #{category}
                </Link>
              ))}
            </span>
            <div className="sm:ml-auto">
              <PostActions title={post.title} url={url} />
            </div>
          </div>
        </header>

        <figure className="gutter">
          <img
            alt=""
            className="aspect-[21/9] max-h-[460px] w-full border bg-muted object-cover"
            referrerPolicy="no-referrer"
            src={post.image}
          />
        </figure>

        <div className="gutter grid grid-cols-[minmax(0,1fr)] gap-12 py-16 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100svh-8rem)] overflow-y-auto">
              <TableOfContents items={toc} />
            </div>
          </aside>

          <Prose
            className="article mx-0 w-full max-w-[75ch]"
            dangerouslySetInnerHTML={{ __html: html }}
            id="article"
          />
        </div>

        {/* Previous / next */}
        {(newer || older) && (
          <nav aria-label="More articles" className="grid border-y sm:grid-cols-2">
            {older ? (
              <Link
                className="group gutter flex flex-col gap-3 border-b py-10 transition-colors hover:bg-card sm:border-r sm:border-b-0"
                href={postHref(older.slug)}
              >
                <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                  <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="text-balance font-semibold text-xl tracking-tight group-hover:text-brand sm:text-2xl">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                className="group gutter flex flex-col items-end gap-3 py-10 text-right transition-colors hover:bg-card"
                href={postHref(newer.slug)}
              >
                <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                  Next
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-balance font-semibold text-xl tracking-tight group-hover:text-brand sm:text-2xl">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* Comments */}
        <section aria-labelledby="comments-heading" className="gutter py-16">
          <h2 className="mb-6 font-semibold text-xl tracking-tight" id="comments-heading">
            Comments
          </h2>
          <Comments />
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="gutter border-t py-16">
            <h2 className="mb-8 font-semibold text-2xl tracking-tight">Keep reading</h2>
            <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <PostCell key={item.slug} post={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
