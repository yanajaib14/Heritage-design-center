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
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
