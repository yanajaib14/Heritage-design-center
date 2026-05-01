const brands = [
  { label: "KCD Kitchen Cabinet Distributors", href: "https://www.kcdus.com/" },
  { label: "Lectus Cabinetry", href: "https://www.lectuscabinets.com/" },
  { label: "Merit Cabinetry", href: "https://www.merit-kitchens.com/custom-kitchen-cabinetry/" },
  { label: "Showplace Cabinetry", href: "https://showplacecabinetry.com/" },
  { label: "MSI Surfaces", href: "https://www.msisurfaces.com/" },
  { label: "Cambria", href: "https://www.cambriausa.com/" },
  { label: "Top Knobs", href: "https://www.topknobs.com/" },
];

export default function BrandMarquee() {
  return (
    <section className="marquee-section">
      <span className="eyebrow">Our Trusted Partners</span>

      <div className="marquee-row">
        <div className="marquee-track">
          {[...brands, ...brands].map((b, i) => (
            <a key={i} className="brand-pill" href={b.href} target="_blank" rel="noopener">
              {b.label}
            </a>
          ))}
        </div>
      </div>

      <div className="marquee-row reverse">
        <div className="marquee-track">
          {[...brands.slice().reverse(), ...brands.slice().reverse()].map((b, i) => (
            <a key={i} className="brand-pill" href={b.href} target="_blank" rel="noopener">
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
