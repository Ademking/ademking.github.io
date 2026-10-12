import type React from "react";

export const PageHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}) => (
  <header className="gutter border-b pt-16 pb-12 sm:pt-20">
    {eyebrow && <div className="mb-4 text-muted-foreground text-sm">{eyebrow}</div>}
    <h1 className="text-balance font-display text-5xl leading-[0.95] sm:text-7xl">{title}</h1>
    {description && (
      <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    )}
  </header>
);
