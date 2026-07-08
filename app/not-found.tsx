import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found · Heritage Design Center",
};

export default function NotFound() {
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(15,14,13,0.95)", backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.25)",
        padding: "14px clamp(24px,6vw,120px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" aria-label="Heritage Design Center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt="Heritage Design Center"
            style={{ height: 52, width: "auto", display: "block" }}
          />
        </Link>
        <Link
          href="/"
          style={{
            fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--gold)", fontWeight: 300, textDecoration: "none",
          }}
        >
          Back to Home ↗
        </Link>
      </nav>

      <section style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "120px clamp(24px,6vw,120px) 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative background number */}
        <div aria-hidden="true" style={{
          position: "absolute",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(200px, 35vw, 420px)",
          fontWeight: 400,
          color: "var(--gold)",
          opacity: 0.04,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
        }}>
          404
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 300,
            display: "block",
            marginBottom: "24px",
          }}>
            Error 404
          </span>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 6vw, 72px)",
            fontWeight: 500,
            lineHeight: 1.06,
            marginBottom: "24px",
            color: "var(--white)",
          }}>
            Page Not<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Found.</em>
          </h1>

          <p style={{
            color: "rgba(245,240,232,0.6)",
            fontSize: "17px",
            lineHeight: 1.75,
            fontWeight: 300,
            marginBottom: "40px",
          }}>
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Head back to the homepage or visit our showroom.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-solid">
              Back to Home
            </Link>
            <Link href="/showroom" className="btn btn-ghost">
              Visit Showroom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
