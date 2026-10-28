import { useState, useEffect } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';

const contactNumber = '+918623097761';
const displayNumber = '+91 86230 97761';
const whatsappUrl = `https://wa.me/${contactNumber.slice(1)}?text=${encodeURIComponent('Hi, I would like to know more about your beauty services.')}`;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '/products' },
    { name: 'Book Now', href: '#booking' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="flex shrink-0 items-center" onClick={(e) => handleNavClick(e, '#home')}>
            <h1 className={`text-xl sm:text-2xl xl:text-3xl font-serif tracking-wider transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              NISHIGANDHA
            </h1>
          </a>

          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.href.startsWith('#') ? (e) => handleNavClick(e, link.href) : undefined}
                className={`whitespace-nowrap transition-colors hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-white'
                } ${link.name === 'Book Now' ? 'bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Chat on WhatsApp at ${displayNumber}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`tel:${contactNumber}`}
              aria-label={`Call ${displayNumber}`}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                isScrolled
                  ? 'border-border text-foreground hover:border-primary hover:text-primary'
                  : 'border-white/60 text-white hover:bg-white/10'
              }`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {displayNumber}
            </a>
          </div>

          <button
            type="button"
            className={`xl:hidden rounded-full p-2 transition-colors ${
              isScrolled ? 'text-foreground hover:bg-secondary' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden border-t border-border bg-card/95 shadow-lg backdrop-blur-md">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.href.startsWith('#') ? (e) => handleNavClick(e, link.href) : undefined}
                className={`block rounded-xl px-4 py-3 text-foreground transition-colors hover:bg-secondary hover:text-primary ${
                  link.name === 'Book Now' ? 'bg-primary text-center text-white hover:bg-primary/90 hover:text-white' : ''
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp us
              </a>
              <a
                href={`tel:${contactNumber}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {displayNumber}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
