import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects, otherProjects, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web platforms, browser extensions, developer and security tools I have built, with screenshots and dates.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        description={`${projects.length} things I’ve built and shipped: web platforms, browser extensions, developer tools, security tools and libraries.`}
        title="Projects"
      />

      <section className="gutter py-12">
        <SectionHeading title="Featured" />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} large project={project} />
          ))}
        </div>
      </section>

      <section className="gutter py-12">
        <SectionHeading title="More projects" />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {otherProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
