import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { formatProjectDate, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const compact = new Intl.NumberFormat("en", { notation: "compact" });

/**
 * A project as a cell in a hairline grid. Place inside a container with
 * `grid gap-px bg-border border` so neighbouring cells share borders.
 */
export const ProjectCard = ({ project, large = false }: { project: Project; large?: boolean }) => {
  const primary = project.href ?? project.repo;
  const external = primary?.startsWith("http");

  return (
    <article className="group relative flex flex-col bg-background transition-colors hover:bg-card">
      <div className={cn("overflow-hidden border-b bg-muted", large ? "aspect-[16/9]" : "aspect-[16/10]")}>
        <img
          alt={`Screenshot of ${project.name}`}
          className={cn(
            "size-full transition duration-300 group-hover:scale-[1.03]",
            project.fit === "contain" ? "object-contain p-4" : "object-cover object-top"
          )}
          decoding="async"
          loading="lazy"
          src={project.image}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3 text-muted-foreground text-sm">
          <span>{project.category}</span>
          <time dateTime={project.date}>{formatProjectDate(project.date)}</time>
        </div>

        <h3 className={cn("font-semibold tracking-tight", large ? "text-2xl" : "text-lg")}>
          {primary ? (
            <a
              className="after:absolute after:inset-0 group-hover:text-brand"
              href={primary}
              rel={external ? "noopener noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-sm">
          {project.href && (
            <a
              className="inline-flex items-center gap-1 transition-colors hover:text-brand"
              href={project.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Visit
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          )}
          {project.repo && (
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
              href={project.repo}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon className="size-3.5" />
              Code
            </a>
          )}
          {!!project.stars && (
            <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
              <StarIcon className="size-3.5" />
              {compact.format(project.stars)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
