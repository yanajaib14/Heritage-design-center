import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse past kitchen and bath projects designed and supplied by Heritage Design Center in Lacey, WA. Real results for real homeowners across Thurston County.",
  alternates: { canonical: "https://heritagedesignctr.com/gallery" },
  openGraph: {
    title: "Gallery · Heritage Design Center",
    description:
      "Past kitchen and bath projects designed and supplied by Heritage Design Center. Serving Lacey, Olympia, and Thurston County.",
    url: "https://heritagedesignctr.com/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
