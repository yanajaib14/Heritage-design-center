import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Heritage Design Center's full material library — cabinetry, countertops, tile, fixtures, and bath in our Lacey, WA showroom. Top brands, all in one place.",
  alternates: { canonical: "https://heritagedesignctr.com/collections" },
  openGraph: {
    title: "Collections · Heritage Design Center",
    description:
      "Cabinetry, countertops, tile, fixtures, and bath — explore every material we carry at our Lacey, WA showroom.",
    url: "https://heritagedesignctr.com/collections",
    images: [
      {
        url: "/whitendale.webp",
        width: 1200,
        height: 630,
        alt: "Cabinetry and countertop collections at Heritage Design Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collections · Heritage Design Center",
    description:
      "Explore cabinetry, countertops, tile, fixtures, and bath materials in our Lacey showroom.",
    images: ["/whitendale.webp"],
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
