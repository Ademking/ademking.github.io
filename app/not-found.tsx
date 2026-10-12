import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="gutter py-32">
      <p className="text-muted-foreground">404</p>
      <h1 className="mt-3 font-semibold text-4xl tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
        This page doesn&apos;t exist, or it moved when the blog was redesigned.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className={buttonVariants({ size: "lg" })} href="/">
          Back home
        </Link>
        <Link className={buttonVariants({ size: "lg", variant: "outline" })} href="/posts/">
          Browse articles
        </Link>
      </div>
    </section>
  );
}
