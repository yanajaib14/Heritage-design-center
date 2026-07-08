import { PortableText } from "@portabletext/react";

export const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-relaxed text-[var(--text-dim)]">{children}</p>,
    h2: ({ children }) => <h2 className="text-3xl font-medium mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-medium mt-6 mb-3">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="underline underline-offset-4"
        >
          {children}
        </a>
      );
    },
  },
};

function mapHeroImage(heroImage) {
  return {
    src: heroImage?.asset?.url || "",
    alt: heroImage?.alt || "",
    width: heroImage?.asset?.metadata?.dimensions?.width || undefined,
    height: heroImage?.asset?.metadata?.dimensions?.height || undefined,
    blurDataURL: heroImage?.asset?.metadata?.lqip || undefined,
  };
}

function mapFeatures(features) {
  if (!Array.isArray(features)) return [];

  return features.map((feature, index) => ({
    id: feature?._key || feature?.title || `feature-${index}`,
    title: feature?.title || "",
    body: feature?.body || [],
    icon: feature?.icon || null,
  }));
}

export function mapLandingPageToComponentProps(sanityData = {}) {
  return {
    hero: {
      title: sanityData?.title || "",
      image: mapHeroImage(sanityData?.heroImage),
    },
    bodyText: sanityData?.bodyText || [],
    features: mapFeatures(sanityData?.features),
  };
}

export function PortableBodyText({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value} components={portableTextComponents} />;
}
