import { ArrowUpRightIcon, DownloadIcon, MailIcon, MapPinIcon } from "lucide-react";
import type { Metadata } from "next";
import type React from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { RecognitionList } from "@/components/recognition-list";
import { cv } from "@/lib/cv";
import { recognitionCategories, recognitions } from "@/lib/recognition";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CV",
  description: `${cv.name}: ${cv.title}. ${cv.summary}`,
  alternates: { canonical: "/cv/" },
};

/** A CV section: sticky mono label on the left, content on the right. */
const Section = ({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
}) => (
  <section className="gutter grid scroll-mt-14 gap-6 border-b py-14 md:grid-cols-12 print:break-inside-avoid print:py-6" id={id}>
    <h2 className="flex items-center gap-2 self-start text-muted-foreground text-meta md:sticky md:top-24 md:col-span-3">
      {label}
    </h2>
    <div className="md:col-span-9">{children}</div>
  </section>
);

const YearList = ({ items }: { items: readonly { year: string; name: string; issuer: string }[] }) => (
  <ul className="divide-y border-y">
    {items.map((item) => (
      <li className="grid grid-cols-[4rem_1fr] gap-4 py-4 sm:grid-cols-[5rem_1fr_auto]" key={item.name}>
        <span className="pt-0.5 text-brand text-meta">{item.year}</span>
        <span className="font-medium">{item.name}</span>
        <span className="col-start-2 text-muted-foreground text-sm sm:col-start-auto">{item.issuer}</span>
      </li>
    ))}
  </ul>
);

export default function CvPage() {
  const contacts = [
    { href: `mailto:${site.author.email}`, label: site.author.email, Icon: MailIcon },
    { href: site.social.github, label: "github.com/Ademking", Icon: GitHubIcon },
    { href: site.social.linkedin, label: "linkedin.com/in/ademkouki", Icon: LinkedInIcon },
  ];

  return (
    <div>
      {/* Header */}
      <header className="relative border-b">
        <div className="gutter relative grid gap-10 pt-16 pb-14 sm:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-2 text-muted-foreground text-meta">
              <span className="inline-block size-1.5 bg-brand" />
              Curriculum vitae
            </p>
            <h1 className="mt-6 font-semibold text-6xl leading-[0.9] tracking-tighter sm:text-8xl">
              {cv.name}
            </h1>
            <p className="mt-6 text-2xl text-brand tracking-tight sm:text-3xl">{cv.title}</p>
            <p className="mt-6 max-w-3xl text-pretty text-lg text-muted-foreground leading-relaxed">
              {cv.summary}
            </p>
          </div>

          <div className="flex flex-col gap-6 self-end lg:col-span-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPinIcon className="size-4" />
                {cv.location}
              </li>
              {contacts.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    className="group inline-flex items-center gap-3 transition-colors hover:text-brand"
                    href={href}
                    rel="noopener noreferrer"
                    target={href.startsWith("http") ? "_blank" : undefined}
                  >
                    <Icon className="size-4 text-muted-foreground group-hover:text-brand" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 print:hidden" data-print-hidden>
              <a
                className={cn(buttonVariants({ size: "lg" }), "bg-brand text-brand-foreground hover:bg-brand/90")}
                download
                href={site.cvPdf}
              >
                <DownloadIcon />
                Download CV (PDF)
              </a>
              <a className={buttonVariants({ size: "lg", variant: "outline" })} href={`mailto:${site.author.email}`}>
                Contact me
              </a>
            </div>
          </div>
        </div>
      </header>

      <Section label="Experience">
        <ol className="space-y-px border bg-border">
          {cv.experience.map((job) => (
            <li className="grid gap-4 bg-background p-6 sm:p-8 lg:grid-cols-12" key={`${job.company}-${job.role}`}>
              <div className="lg:col-span-4">
                <p className="text-brand text-meta">{job.period}</p>
                <p className="mt-3 font-semibold text-lg">{job.company}</p>
                <p className="text-muted-foreground text-sm">{job.location}</p>
              </div>
              <div className="lg:col-span-8">
                <h3 className="font-semibold text-xl tracking-tight">{job.role}</h3>
                <ul className="mt-4 space-y-3">
                  {job.points.map((point) => (
                    <li className="flex gap-3 text-muted-foreground leading-relaxed" key={point}>
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Skills">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {cv.skills.map(({ group, items }) => (
            <div className="bg-background p-5" key={group}>
              <h3 className="text-muted-foreground text-meta">{group}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <li className="border bg-card px-2 py-1 text-sm" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Projects">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px border bg-border md:grid-cols-2">
          {cv.projects.map((project) => {
            const href = "href" in project ? project.href : undefined;
            const external = href?.startsWith("http");
            return (
              <article className="group relative flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-card" key={project.name}>
                <div className="flex items-center justify-between text-muted-foreground text-meta">
                  <span>{project.kind}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="flex items-center gap-2 font-semibold text-xl tracking-tight">
                  {href ? (
                    <a
                      className="after:absolute after:inset-0 group-hover:text-brand"
                      href={href}
                      rel={external ? "noopener noreferrer" : undefined}
                      target={external ? "_blank" : undefined}
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                  {href && <ArrowUpRightIcon className="size-4 text-muted-foreground group-hover:text-brand" />}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
                <p className="mt-auto pt-2 text-brand text-meta">{project.highlight}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="recognition" label="Recognition">
        <div className="space-y-10">
          {recognitionCategories.map((category) => (
            <div key={category}>
              <h3 className="mb-2 font-semibold text-lg tracking-tight">{category}</h3>
              <RecognitionList items={recognitions.filter((item) => item.category === category)} />
            </div>
          ))}
        </div>
      </Section>

      <Section label="Education">
        <ol className="divide-y border-y">
          {cv.education.map((item) => (
            <li className="grid gap-2 py-6 lg:grid-cols-12 lg:gap-6" key={item.degree}>
              <p className="text-brand text-meta lg:col-span-3 lg:pt-1.5">{item.period}</p>
              <div className="lg:col-span-9">
                <h3 className="font-semibold text-xl tracking-tight">{item.degree}</h3>
                <p className="mt-1 text-muted-foreground">
                  {item.school} — {item.location}
                </p>
                <p className="mt-2 text-muted-foreground text-sm">{item.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Certifications">
        <YearList items={cv.certifications} />
      </Section>

      <Section label="Honors & awards">
        <YearList items={cv.awards} />
      </Section>
    </div>
  );
}
