import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

/** Section title with an optional "view all" link on the right. */
export const SectionHeading = ({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
    <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
    {href && (
      <Link
        className="group inline-flex shrink-0 items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href={href}
      >
        {linkLabel}
        <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    )}
  </div>
);
