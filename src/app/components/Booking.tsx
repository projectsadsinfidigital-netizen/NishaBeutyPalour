import { useState } from 'react';
import { CalendarDays, Clock3, Sparkles } from 'lucide-react';
import { push, ref, set } from 'firebase/database';
import { database } from '../../lib/firebase';
import { createWhatsAppUrl, openWhatsAppChat } from '../../lib/contact';

const serviceNames: Record<string, string> = {
  haircut: 'Haircut & Styling',
  facial: 'Facial Treatment',
  makeup: 'Makeup Artistry',
  spa: 'Spa & Wellness',
};

export function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [whatsAppFallbackUrl, setWhatsAppFallbackUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage('');
    setSubmissionError('');
    setWhatsAppFallbackUrl('');

    const bookingMessage = [
      'New appointment request',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Service: ${serviceNames[formData.service] ?? formData.service}`,
      `Preferred date: ${formData.date}`,
      `Preferred time: ${formData.time}`,
    ].join('\n');
    const whatsappOpened = openWhatsAppChat(bookingMessage);

    try {
      const bookingRef = push(ref(database, 'bookings'));
      if (!bookingRef.key) {
        throw new Error('Could not create a booking reference.');
      }

      await set(bookingRef, {
        ...formData,
        status: 'pending',
        createdAt: Date.now(),
      });
      setFormData({ name: '', phone: '', service: '', date: '', time: '' });
      setSubmissionMessage('Your appointment request was saved. WhatsApp opened with your details—tap Send there to message the salon.');
      if (!whatsappOpened) setWhatsAppFallbackUrl(createWhatsAppUrl(bookingMessage));
    } catch (error) {
      console.error('Unable to submit booking:', error);
      setSubmissionError('We could not submit your booking. Please try again or contact the salon directly.');
      if (!whatsappOpened) setWhatsAppFallbackUrl(createWhatsAppUrl(bookingMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmissionMessage('');
    setSubmissionError('');
  };

  return (
    <section className="bg-[#fbf8f4] px-4 py-20 sm:px-6 sm:py-24 lg:px-8" id="booking">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#eee5dc] shadow-xl shadow-[#493733]/[0.07] lg:grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-[#754747] p-8 text-white sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="relative">
            <span className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/70">Your time, your way</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Make time
              <span className="block italic text-[#ebd6c6]">for you.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
              Tell us what you have in mind. We will be in touch to confirm your visit.
            </p>
          </div>
          <div className="relative mt-10 space-y-4 border-t border-white/20 pt-6">
            <p className="flex items-center gap-3 text-sm text-white/85">
              <CalendarDays className="h-4 w-4 text-[#ebd6c6]" aria-hidden="true" />
              Choose a day that works for you
            </p>
            <p className="flex items-center gap-3 text-sm text-white/85">
              <Clock3 className="h-4 w-4 text-[#ebd6c6]" aria-hidden="true" />
              We will confirm your preferred time
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#594842]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#e7ded6] bg-[#fbf8f4] px-4 py-3.5 text-sm text-[#493733] transition-all placeholder:text-[#a59790] focus:border-[#a66f68] focus:outline-none focus:ring-2 focus:ring-[#a66f68]/20"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#594842]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#e7ded6] bg-[#fbf8f4] px-4 py-3.5 text-sm text-[#493733] transition-all placeholder:text-[#a59790] focus:border-[#a66f68] focus:outline-none focus:ring-2 focus:ring-[#a66f68]/20"
                  placeholder="Enter your phone"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="mb-2 block text-sm font-medium text-[#594842]">
                Select Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#e7ded6] bg-[#fbf8f4] px-4 py-3.5 text-sm text-[#493733] transition-all focus:border-[#a66f68] focus:outline-none focus:ring-2 focus:ring-[#a66f68]/20"
              >
                <option value="">Choose a service</option>
                <option value="haircut">Haircut & Styling</option>
                <option value="facial">Facial Treatment</option>
                <option value="makeup">Makeup Artistry</option>
                <option value="spa">Spa & Wellness</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-[#594842]">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#e7ded6] bg-[#fbf8f4] px-4 py-3.5 text-sm text-[#493733] transition-all focus:border-[#a66f68] focus:outline-none focus:ring-2 focus:ring-[#a66f68]/20"
                />
              </div>

              <div>
                <label htmlFor="time" className="mb-2 block text-sm font-medium text-[#594842]">
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#e7ded6] bg-[#fbf8f4] px-4 py-3.5 text-sm text-[#493733] transition-all focus:border-[#a66f68] focus:outline-none focus:ring-2 focus:ring-[#a66f68]/20"
                />
              </div>
            </div>

            {submissionMessage && (
              <p className="rounded-xl bg-green-50 p-4 text-sm leading-6 text-green-800" role="status">
                {submissionMessage}
                {whatsAppFallbackUrl && (
                  <>
                    {' '}
                    <a className="font-semibold underline underline-offset-2" href={whatsAppFallbackUrl} target="_blank" rel="noreferrer">
                      Open WhatsApp
                    </a>
                  </>
                )}
              </p>
            )}
            {submissionError && (
              <p className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800" role="alert">
                {submissionError}
                {whatsAppFallbackUrl && (
                  <>
                    {' '}
                    <a className="font-semibold underline underline-offset-2" href={whatsAppFallbackUrl} target="_blank" rel="noreferrer">
                      Open WhatsApp
                    </a>
                  </>
                )}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#8d5555] px-8 py-4 text-sm font-medium text-white shadow-md shadow-[#8d5555]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#754343] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Book Now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
