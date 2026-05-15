import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import PromoBar from "@/components/PromoBar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1c1917",
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const SITE_URL = "https://heritagedesignctr.com";
const SITE_NAME = "Heritage Design Center";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Heritage Design Center · Kitchen & Bath Showroom · Lacey, WA",
    template: "%s · Heritage Design Center",
  },
  description:
    "Kitchen and bath design showroom in Lacey, Washington. Cabinetry, countertops, tile, and fixtures — all under one roof. Free design consultations available.",
  keywords: [
    "kitchen design Lacey WA",
    "bathroom design Olympia WA",
    "kitchen showroom Lacey Washington",
    "bath remodel Thurston County",
    "cabinetry showroom Lacey WA",
    "countertops Lacey WA",
    "Heritage Design Center",
    "kitchen remodel Olympia",
    "custom cabinetry Lacey",
    "tile showroom Lacey WA",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Heritage Design Center · Kitchen & Bath Showroom · Lacey, WA",
    description:
      "Kitchen and bath design showroom in Lacey, WA. Cabinetry, countertops, tile, and fixtures — all under one roof. Free design consultations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Heritage Design Center showroom — Lacey, WA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heritage Design Center · Kitchen & Bath Showroom · Lacey, WA",
    description:
      "Kitchen and bath design showroom in Lacey, WA. Cabinetry, countertops, tile, and fixtures all under one roof.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE_NAME,
  description:
    "Kitchen and bath design showroom offering cabinetry, countertops, tile, and fixtures in Lacey, Washington.",
  url: SITE_URL,
  telephone: "+13605573441",
  email: "showroom@heritagedesignctr.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8695 Martin Way E #101",
    addressLocality: "Lacey",
    addressRegion: "WA",
    postalCode: "98516",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.0558,
    longitude: -122.7987,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "00:00",
      closes: "00:00",
      description: "By appointment only",
    },
  ],
  hasMap: "https://maps.google.com/?q=8695+Martin+Way+E+STE+101,+Lacey,+WA+98516",
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        <PromoBar />
        {children}
      </body>
    </html>
  );
}
