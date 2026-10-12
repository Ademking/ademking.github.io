import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostBrowser } from "@/components/post-browser";
import { getAllPosts, getCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Every article on web development, security, tooling and the occasional rant.",
  alternates: { canonical: "/posts/" },
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        description="Tutorials, security write-ups, tool roundups and opinions. Search everything, or filter by topic."
        title="Blog"
      />
      <PostBrowser categories={getCategories()} posts={posts} />
    </>
  );
}
