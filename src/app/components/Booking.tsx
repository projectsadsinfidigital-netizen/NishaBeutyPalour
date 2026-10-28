import { useState } from 'react';
import { push, ref, set } from 'firebase/database';
import { database } from '../../lib/firebase';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage('');
    setSubmissionError('');

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
      setSubmissionMessage('Thank you! Your appointment request has been received. We will contact you shortly to confirm.');
    } catch (error) {
      console.error('Unable to submit booking:', error);
      setSubmissionError('We could not submit your booking. Please try again or contact the salon directly.');
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30" id="booking">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">Book Your Appointment</h2>
          <p className="text-muted-foreground text-lg">
            Schedule your visit and let us pamper you
          </p>
        </div>

        <div className="bg-card p-8 sm:p-12 rounded-3xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-foreground">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your phone"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block mb-2 text-foreground">
                Select Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
                <label htmlFor="date" className="block mb-2 text-foreground">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="time" className="block mb-2 text-foreground">
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {submissionMessage && (
              <p className="rounded-xl bg-green-50 p-4 text-green-800" role="status">
                {submissionMessage}
              </p>
            )}
            {submissionError && (
              <p className="rounded-xl bg-red-50 p-4 text-red-800" role="alert">
                {submissionError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Book Now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
