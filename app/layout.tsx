import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import PromoBar from "@/components/PromoBar";
import ScrollAnimations from "@/components/ScrollAnimations";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAF8",
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
    "Kitchen and bath design showroom in Lacey, Washington — serving all of Western Washington. Cabinetry, countertops, tile, and fixtures — all under one roof. Free design consultations available.",
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
    "kitchen showroom Western Washington",
    "bath remodel Seattle WA",
    "kitchen design Tacoma WA",
    "kitchen remodel Bellevue WA",
    "cabinetry Western Washington",
    "countertops Tacoma",
    "kitchen showroom Puget Sound",
    "bath design Western WA",
    "kitchen remodel Thurston County",
    "design showroom Pacific Northwest",
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
      "Kitchen and bath design showroom in Lacey, WA — serving all of Western Washington. Cabinetry, countertops, tile, and fixtures — all under one roof. Free design consultations.",
    images: [
      {
        url: "/hero-kitchen-custom.png",
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
    images: ["/hero-kitchen-custom.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE_NAME,
  description:
    "Kitchen and bath design showroom offering cabinetry, countertops, tile, and fixtures in Lacey, Washington — serving all of Western Washington including Seattle, Tacoma, Olympia, and the Puget Sound region.",
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
  areaServed: [
    { "@type": "State", name: "Western Washington" },
    { "@type": "City", name: "Lacey", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Olympia", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Tumwater", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Tacoma", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Seattle", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Bellevue", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Puyallup", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Gig Harbor", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Centralia", containedInPlace: { "@type": "State", name: "Washington" } },
    { "@type": "City", name: "Chehalis", containedInPlace: { "@type": "State", name: "Washington" } },
  ],
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-US",
  description:
    "Kitchen and bath design showroom in Lacey, WA serving Western Washington with cabinetry, countertops, tile, and fixtures.",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/logo.png`,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <PromoBar />
        <ScrollAnimations />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
