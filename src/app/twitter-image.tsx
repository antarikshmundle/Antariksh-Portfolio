import { renderPortfolioCard } from "@/lib/og/portfolio-card";

// Config is declared here (not imported) so Next can read it statically.
export const alt = "Antariksh Mundle — AI & Data Science Engineer. Portfolio of AI, data and software projects.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderPortfolioCard();
}
