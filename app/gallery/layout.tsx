import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse past kitchen and bath projects designed and supplied by Heritage Design Center in Lacey, WA. Real results for real homeowners across Western Washington.",
  alternates: { canonical: "https://heritagedesignctr.com/gallery" },
  openGraph: {
    title: "Gallery · Heritage Design Center",
    description:
      "Past kitchen and bath projects designed and supplied by Heritage Design Center. Serving all of Western Washington.",
    url: "https://heritagedesignctr.com/gallery",
    images: [
      {
        url: "/project-university-place.png",
        width: 1200,
        height: 630,
        alt: "Kitchen and bath gallery projects by Heritage Design Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery · Heritage Design Center",
    description:
      "Browse real kitchen and bath projects designed and supplied by Heritage Design Center.",
    images: ["/project-university-place.png"],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
