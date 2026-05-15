import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Showroom",
  description:
    "Visit Heritage Design Center at 8695 Martin Way E in Lacey, WA. A dedicated design space with full cabinetry displays, stone slabs, tile, and hardware — all under one roof.",
  alternates: { canonical: "https://heritagedesignctr.com/showroom" },
  openGraph: {
    title: "Our Showroom · Heritage Design Center",
    description:
      "Visit us at 8695 Martin Way E, Lacey, WA. Full cabinetry displays, stone slabs, tile, and hardware. Mon–Fri 9am–5:30pm.",
    url: "https://heritagedesignctr.com/showroom",
  },
};

export default function ShowroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
