"use client";

import { PortableBodyText } from "@/src/sanity/contentMapper";

interface SanityFeature {
  id: string;
  title: string;
  body: unknown[];
  icon: string | null;
}

interface SanityLandingContentProps {
  bodyText: unknown[];
  features: SanityFeature[];
}

export default function SanityLandingContent({ bodyText, features }: SanityLandingContentProps) {
  const hasBody = Array.isArray(bodyText) && bodyText.length > 0;
  const hasFeatures = Array.isArray(features) && features.length > 0;

  if (!hasBody && !hasFeatures) {
    return null;
  }

  return (
    <section style={{ background: "var(--bg)", borderBottom: "1px solid var(--gold-border)", padding: "clamp(64px, 9vw, 110px) var(--pad)" }}>
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <div className="section-eyebrow-row">
          <div className="section-rule" />
          <span className="eyebrow">From Sanity CMS</span>
        </div>

        {hasBody && (
          <div style={{ maxWidth: "760px", color: "var(--text)", marginTop: "12px" }}>
            <PortableBodyText value={bodyText} />
          </div>
        )}

        {hasFeatures && (
          <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {features.map((feature) => (
              <article
                key={feature.id}
                style={{
                  border: "1px solid var(--gold-border)",
                  background: "var(--bg-surface)",
                  padding: "20px 18px",
                }}
              >
                <h3 style={{ margin: "0 0 10px", fontSize: "17px", color: "var(--text)", fontWeight: 500 }}>
                  {feature.title}
                </h3>
                {Array.isArray(feature.body) && feature.body.length > 0 ? (
                  <PortableBodyText value={feature.body} />
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}