import { ArrowUpRightIcon } from "lucide-react";
import { formatRecognitionDate, type Recognition } from "@/lib/recognition";
import { cn } from "@/lib/utils";

/** Recognition items as rows: date on the left, title and detail on the right. */
export const RecognitionList = ({
  items,
  showCategory = false,
  className,
}: {
  items: Recognition[];
  showCategory?: boolean;
  className?: string;
}) => (
  <ul className={cn("divide-y border-y", className)}>
    {items.map((item) => {
      const external = item.href?.startsWith("http");
      return (
        <li
          className="group relative grid gap-1 py-5 transition-colors sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
          key={item.title}
        >
          <time className="text-muted-foreground text-sm sm:pt-0.5" dateTime={item.date}>
            {formatRecognitionDate(item.date)}
          </time>
          <div>
            <h3 className="flex items-start gap-2 font-semibold leading-snug">
              {item.href ? (
                <a
                  className="after:absolute after:inset-0 group-hover:text-brand"
                  href={item.href}
                  rel={external ? "noopener noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
              {item.href && (
                <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-brand" />
              )}
            </h3>
            <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
              {showCategory && <span className="text-brand">{item.category} · </span>}
              {item.detail}
            </p>
          </div>
        </li>
      );
    })}
  </ul>
);
