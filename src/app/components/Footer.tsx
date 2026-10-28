import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const salonAddress = 'Dadabhai Nauroji Ward, Near Kata Gate, Flipkart Shop, Ballarpur 442701';
const salonPhone = '+918623097761';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salonAddress)}`;

export function Footer() {
  return (
    <footer className="bg-primary/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-3xl mb-2 text-foreground font-serif tracking-wider">NISHIGANDHA</h3>
            <div className="w-20 h-0.5 bg-[#D4AF37] mb-4"></div>
            <p className="text-muted-foreground leading-relaxed">
              Your premier destination for luxury beauty services and transformative experiences.
            </p>
          </div>

          <div>
            <h4 className="text-lg mb-6 text-foreground">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {salonAddress}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${salonPhone}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Call +91 86230 97761
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">hello@nishigandha.com</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-6 text-foreground">Opening Hours</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p className="mt-2">Saturday: 10:00 AM - 6:00 PM</p>
                  <p className="mt-2">Sunday: 11:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-6 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; 2026 NISHIGANDHA Beauty Salon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
