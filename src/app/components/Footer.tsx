import { ArrowUpRight, MapPin, Phone, Sparkles } from 'lucide-react';
import { salonPhone, displaySalonPhone } from '../../lib/contact';

const salonAddress = 'Dadabhai Nauroji Ward, Near Kata Gate, Flipkart Shop, Ballarpur 442701';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salonAddress)}`;

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our story', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Products', href: '/products' },
];

export function Footer() {
  return (
    <footer className="bg-[#382b27] px-4 pb-6 pt-14 text-white sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-14 md:pb-12">
          <div>
            <a href={window.location.pathname === '/' ? '#home' : '/#home'} className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a66f68]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-serif text-lg tracking-[0.12em]">NISHIGANDHA</span>
                <span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-white/55">Beauty Parlour</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Your neighborhood space for beauty, care, and a little time to yourself.
            </p>
            <a
              href="#booking"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#e3c2b5] transition-colors hover:text-white"
            >
              Plan your visit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-white/45">Explore</h2>
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-4 gap-y-3">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-white/75 transition-colors hover:text-[#e3c2b5]">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-white/45">Come by</h2>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 text-sm leading-6 text-white/75 transition-colors hover:text-white"
            >
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#d3a296]" aria-hidden="true" />
              <span>{salonAddress}</span>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#d3a296] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={`tel:${salonPhone}`}
              className="mt-4 inline-flex items-center gap-3 text-sm text-white/75 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#d3a296]" aria-hidden="true" />
              {displaySalonPhone}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Nishigandha Beauty Parlour. All rights reserved.</p>
          <p>Made with care in Ballarpur</p>
        </div>
      </div>
    </footer>
  );
}
