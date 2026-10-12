const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export const formatDate = (iso: string) => longDate.format(new Date(iso));

export const formatShortDate = (iso: string) => shortDate.format(new Date(iso));

export const categoryHref = (category: string) =>
  `/categories/${encodeURIComponent(category)}/`;

export const postHref = (slug: string) => `/posts/${slug}/`;
