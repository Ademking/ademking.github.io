import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getAllPosts, getCategories } from "@/lib/posts";
import { site } from "@/lib/site";
import "./globals.css";

// JetBrains Mono is the only typeface: body text, headings and code.
const jetbrainsSans = JetBrains_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author.name, url: site.url }],
  creator: site.author.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: site.name }] },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kouki__adem",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const posts = getAllPosts().map(({ slug, title, categories }) => ({
    slug,
    title,
    categories,
  }));
  const categories = getCategories().map(({ name }) => name);

  return (
    <html
      className={`${jetbrainsSans.variable} ${jetbrainsMono.variable} dark`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground focus:text-sm"
            href="#content"
          >
            Skip to content
          </a>
          <SiteHeader categories={categories} posts={posts} />
          <main className="[&>*]:w-full" id="content">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.googleAnalyticsId}');`}
        </Script>
      </body>
    </html>
  );
}
