import { MessageCircle } from 'lucide-react';
import { salonWhatsAppNumber } from '../../lib/contact';

export function WhatsAppChatButton() {
  const message = 'Hi, I would like to know more about your services.';
  const chatUrl = `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Nishigandha Beauty Parlour on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 animate-in items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg duration-700 fade-in slide-in-from-bottom-4 transition-transform hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 motion-reduce:animate-none motion-reduce:transition-none sm:bottom-6 sm:right-6"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-full border-2 border-[#25D366]/60 motion-safe:animate-ping"
      />
      <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
    </a>
  );
}
