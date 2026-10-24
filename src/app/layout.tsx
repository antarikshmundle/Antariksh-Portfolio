import type { Metadata, Viewport } from "next";
import { PortfolioChrome } from "@/components/layout/portfolio-chrome";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0e",
  colorScheme: "dark",
};

/** scroll-pt-header keeps anchor targets clear of the sticky header. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full scroll-pt-header`}
    >
      <body className="flex min-h-full flex-col">
        <PortfolioChrome>
          <a
            href="#content"
            className="type-label sr-only z-50 bg-accent px-4 py-3 text-accent-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
        </PortfolioChrome>
        <MotionProvider>
          <PortfolioChrome>
            <SiteHeader />
          </PortfolioChrome>
          {children}
          <PortfolioChrome>
            <SiteFooter />
          </PortfolioChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
