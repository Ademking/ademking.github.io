import Link from "next/link";
import { formatDate, postHref } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import { cn } from "@/lib/utils";

/** "June 28, 2024 · 6 min read" */
export const PostMetaLine = ({
  post,
  className,
}: {
  post: Pick<PostMeta, "date" | "readingTime">;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-2 text-muted-foreground text-sm", className)}>
    <time dateTime={post.date}>{formatDate(post.date)}</time>
    <span aria-hidden>·</span>
    <span>{post.readingTime} min read</span>
  </div>
);

/**
 * A post as a cell in a hairline grid. Place inside a container with
 * `grid gap-px bg-border border` so neighbouring cells share borders.
 */
export const PostCell = ({ post }: { post: PostMeta }) => (
  <article className="group relative flex flex-col bg-background transition-colors hover:bg-card">
    <div className="aspect-[16/9] overflow-hidden border-b bg-muted">
      <img
        alt=""
        className="size-full object-cover"
        decoding="async"
        loading="lazy"
        referrerPolicy="no-referrer"
        src={post.image}
      />
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <PostMetaLine post={post} />
      <h3 className="text-balance font-semibold text-lg leading-snug tracking-tight">
        <Link className="after:absolute after:inset-0 group-hover:text-brand" href={postHref(post.slug)}>
          {post.title}
        </Link>
      </h3>
      <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
    </div>
  </article>
);

/** A post as a row with a thumbnail (archive). */
export const PostRow = ({ post }: { post: PostMeta }) => (
  <article className="group relative flex gap-4 border-b py-5 sm:gap-6">
    <div className="aspect-[16/10] w-28 shrink-0 overflow-hidden border bg-muted sm:w-48">
      <img
        alt=""
        className="size-full object-cover transition duration-300 group-hover:scale-105"
        decoding="async"
        loading="lazy"
        referrerPolicy="no-referrer"
        src={post.image}
      />
    </div>
    <div className="min-w-0 flex-1">
      <PostMetaLine post={post} />
      <h3 className="mt-1.5 font-semibold leading-snug tracking-tight sm:text-lg">
        <Link className="after:absolute after:inset-0 group-hover:text-brand" href={postHref(post.slug)}>
          {post.title}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-muted-foreground text-sm leading-relaxed max-sm:hidden">
        {post.excerpt}
      </p>
    </div>
  </article>
);
