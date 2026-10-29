import { useState } from 'react';
import { ArrowUpRight, Menu, Phone, Sparkles, X } from 'lucide-react';
import { salonPhone, displaySalonPhone } from '../../lib/contact';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Our story', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Products', href: '/products' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
      return;
    }

    if (window.location.pathname !== '/') {
      event.preventDefault();
      window.location.assign(`/${href}`);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#e9dfd7] bg-[#fbf8f4]/95 shadow-sm shadow-[#493733]/5 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[84px] lg:px-8">
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, '#home')}
          className="group flex shrink-0 items-center gap-3"
          aria-label="Nishigandha Beauty Parlour home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8d5555] text-white transition-transform duration-300 group-hover:rotate-12">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg tracking-[0.12em] text-[#3d302b] sm:text-xl">NISHIGANDHA</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-[#92786e]">Beauty Parlour</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="text-sm text-[#685751] transition-colors duration-200 hover:text-[#8d5555]"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${salonPhone}`}
            aria-label={`Call ${displaySalonPhone}`}
            className="inline-flex items-center gap-2 text-sm text-[#685751] transition-colors duration-200 hover:text-[#8d5555]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {displaySalonPhone}
          </a>
          <a
            href="#booking"
            onClick={(event) => handleNavClick(event, '#booking')}
            className="group inline-flex items-center gap-2 rounded-full bg-[#8d5555] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#754343]"
          >
            Book a visit
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-[#493733] transition-colors hover:bg-[#f0e5df] lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-[#e9dfd7] bg-[#fbf8f4] px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => {
                  handleNavClick(event, link.href);
                  if (!link.href.startsWith('#')) setIsOpen(false);
                }}
                className="block rounded-xl px-4 py-3 text-sm text-[#594842] transition-colors hover:bg-[#f0e5df] hover:text-[#8d5555]"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={(event) => handleNavClick(event, '#booking')}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#8d5555] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#754343]"
            >
              Book an appointment
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`tel:${salonPhone}`}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-[#685751]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {displaySalonPhone}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
