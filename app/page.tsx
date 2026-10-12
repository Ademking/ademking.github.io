import { Hero } from "@/components/home/hero";
import { PostCell } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { RecognitionList } from "@/components/recognition-list";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/posts";
import { featuredProjects } from "@/lib/projects";
import { highlightedRecognitions } from "@/lib/recognition";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 12);

  return (
    <>
      <Hero />

      {/* Latest */}
      <section className="gutter py-20">
        <SectionHeading href="/posts/" linkLabel="View all" title="Latest articles" />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCell key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="gutter pb-8">
        <SectionHeading href="/projects/" linkLabel="All projects" title="Projects" />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border sm:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className="gutter pt-16 pb-8">
        <SectionHeading href="/cv/#recognition" linkLabel="All recognition" title="Recognition" />
        <RecognitionList items={highlightedRecognitions} showCategory />
      </section>
    </>
  );
}
