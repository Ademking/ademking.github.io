import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PostCell } from "@/components/post-card";
import { categoryHref } from "@/lib/format";
import { getCategories, getPostsByCategory } from "@/lib/posts";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getCategories().map(({ name }) => ({ category: name }));

const titleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export async function generateMetadata({
  params,
}: PageProps<"/categories/[category]">): Promise<Metadata> {
  const category = decodeURIComponent((await params).category);
  return {
    title: `${titleCase(category)} articles`,
    description: `All articles about ${category}.`,
    alternates: { canonical: categoryHref(category) },
  };
}

export default async function CategoryPage({ params }: PageProps<"/categories/[category]">) {
  const category = decodeURIComponent((await params).category);
  const posts = getPostsByCategory(category);
  if (posts.length === 0) notFound();

  return (
    <>
      <PageHeader
        description={`${posts.length} ${posts.length === 1 ? "article" : "articles"} filed under this topic.`}
        eyebrow={
          <Link className="inline-flex items-center gap-2 hover:text-foreground" href="/categories/">
            <ArrowLeftIcon className="size-3.5" />
            All topics
          </Link>
        }
        title={
          <>
            <span className="capitalize">{category}</span>
          </>
        }
      />
      <div className="gutter py-12">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {posts.map((post) => (
            <PostCell key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
