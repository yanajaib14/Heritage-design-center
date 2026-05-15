import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "From free consultation to material delivery — Heritage Design Center handles every step of your kitchen or bath project in Lacey, WA. See exactly what to expect.",
  alternates: { canonical: "https://heritagedesignctr.com/process" },
  openGraph: {
    title: "Our Process · Heritage Design Center",
    description:
      "From free consultation to material delivery — see how we handle every step of your kitchen or bath project.",
    url: "https://heritagedesignctr.com/process",
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
