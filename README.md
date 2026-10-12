# 🍪 Adem's Dev Journey

A blog documenting a developer's learning and growth in the tech industry: [ademking.github.io](https://ademking.github.io)

Built with [Next.js](https://nextjs.org) (static export), [Tailwind CSS v4](https://tailwindcss.com) and [Shark UI](https://shark-ui.com).

## Development

Requires Node.js 22+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static site in ./out
pnpm preview      # serve ./out on http://localhost:4173
```

## Writing a post

Add a Markdown file to `content/posts/` named `YYYY-MM-DD-your-slug.md`. It is published at `/posts/your-slug/`.

```markdown
---
title: "My new post"
date: 2026-10-12 10:00:00
categories: [javascript, tutorial]
image: /assets/images/my-cover.png # optional, falls back to a default cover
description: "Optional summary for cards, the post header and social previews."
---

Your content here. GitHub-flavored Markdown and inline HTML are supported.
```

- Images and other static files live in `public/assets/` and are referenced as `/assets/...`.
- Posts with a future `date` stay hidden until a build runs on or after that date (the deploy workflow rebuilds daily).
- Files in `content/drafts/` are never published.
- The About page is `content/about.md`. Site-wide settings (name, social links, giscus) are in `lib/site.ts`.
- The CV page (`/cv/`), home-page projects and profile card all read from `lib/cv.ts`.

## Project structure

```
app/                Routes (home, /posts, /posts/[slug], /categories, /about, feed.xml, sitemap)
components/         Site components; components/ui/ holds Shark UI components (managed by the shadcn CLI)
content/            Markdown posts and pages
lib/                Content loading, Markdown pipeline (unified + Shiki), site config
public/assets/      Images and icons
```

Add more Shark UI components with:

```bash
pnpm dlx shadcn@latest add @shark/<component>
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys `out/` to GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Contributing

If you find a typo, error, or think something can be clarified, please open an issue or submit a PR. Contributions are greatly appreciated!
