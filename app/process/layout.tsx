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
    images: [
      {
        url: "/Design%20Review%20Meeting.png",
        width: 1200,
        height: 630,
        alt: "Heritage Design Center kitchen and bath design process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process · Heritage Design Center",
    description:
      "See the 4-step process from free consultation to coordinated material delivery.",
    images: ["/Design%20Review%20Meeting.png"],
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
