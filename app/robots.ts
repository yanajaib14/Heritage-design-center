import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All standard search crawlers
      {
        userAgent: "*",
        allow: "/",
      },
      // OpenAI / ChatGPT
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // Anthropic / Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      // Google AI (Gemini / AI Overviews)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      // Apple
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // Common Crawl (used to train many AI models)
      {
        userAgent: "CCBot",
        allow: "/",
      },
      // Diffbot
      {
        userAgent: "Diffbot",
        allow: "/",
      },
    ],
    sitemap: "https://heritagedesignctr.com/sitemap.xml",
    host: "https://heritagedesignctr.com",
  };
}
