const brands = [
  { label: "KCD Kitchen Cabinet Distributors", href: "https://www.kcdus.com/", imgSrc: "/kcd.png" },
  { label: "Lectus Cabinetry", href: "https://www.lectuscabinets.com/", imgSrc: "/luctus.png" },
  { label: "Merit Cabinetry", href: "https://www.merit-kitchens.com/custom-kitchen-cabinetry/", imgSrc: "/Merit logo.png" },
  { label: "Showplace Cabinetry", href: "https://showplacecabinetry.com/", imgSrc: "/showplce logo.jpg" },
  { label: "MSI Surfaces", href: "https://www.msisurfaces.com/", imgSrc: "/MSI logo.png" },
  { label: "Cambria", href: "https://www.cambriausa.com/", imgSrc: "/CAMBRIA logo.png" },
  { label: "Caesarstone", href: "https://www.caesarstoneus.com", imgSrc: "/CAESARSTONE logo.png" },
  { label: "Vicostone", href: "https://us.vicostone.com/", imgSrc: "/VICOSTONE logo.png" },
  { label: "Jaaron Wood Countertops", href: "https://www.jaaronwoodcountertops.com/", imgSrc: "/J-Aaron-Logo1.png" },
  { label: "Jeffrey Alexander", href: "https://www.hardwareresources.com/", imgSrc: "/JEFFREY ALEXANDER logo.png" },
];

export default function BrandMarquee() {
  return (
    <section className="marquee-section overflow-hidden w-full relative">
      <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>Our Trusted Partners</span>

      <div className="marquee-row relative flex overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        
        <div className="marquee-track flex items-center min-w-[200%]">
          {[...brands, ...brands].map((b, i) => (
            <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" className="mx-8 transition-transform hover:scale-105 flex-shrink-0">
              <img 
                src={b.imgSrc} 
                alt={b.label} 
                className="h-16 md:h-20 w-auto object-contain" 
                draggable={false} 
              />
            </a>
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>

      <div className="marquee-row relative flex overflow-hidden mt-8">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        
        <div className="marquee-track flex items-center min-w-[200%]" style={{ animationDirection: "reverse" }}>
          {[...brands.slice().reverse(), ...brands.slice().reverse()].map((b, i) => (
            <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" className="mx-8 transition-transform hover:scale-105 flex-shrink-0">
              <img 
                src={b.imgSrc} 
                alt={b.label} 
                className="h-16 md:h-20 w-auto object-contain" 
                draggable={false} 
              />
            </a>
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
