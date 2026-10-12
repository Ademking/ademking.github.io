import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { categoryHref, postHref } from "@/lib/format";
import { getCategories, getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse articles by topic.",
  alternates: { canonical: "/categories/" },
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <>
      <PageHeader
        description={`${categories.length} topics, from JavaScript tricks to penetration testing.`}
        title="Topics"
      />
      <div className="gutter py-12">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {categories.map(({ name, count }) => {
            const latest = getPostsByCategory(name).slice(0, 3);
            return (
              <section
                className="group relative flex min-w-0 flex-col bg-background p-6 transition-colors hover:bg-card"
                key={name}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold text-2xl capitalize tracking-tight">
                    <Link className="after:absolute after:inset-0 group-hover:text-brand" href={categoryHref(name)}>
                      {name}
                    </Link>
                  </h2>
                  <span className="pt-1.5 text-muted-foreground text-meta">
                    {count}
                  </span>
                </div>
                <ul className="mt-5 space-y-2 border-t pt-4 text-muted-foreground text-sm">
                  {latest.map((post) => (
                    <li className="relative z-10 truncate" key={post.slug}>
                      <Link className="hover:text-foreground" href={postHref(post.slug)}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
