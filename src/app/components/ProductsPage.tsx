import { useEffect, useState } from 'react';
import { onValue, push, ref, set } from 'firebase/database';
import { MessageCircle, Phone, ShoppingBag, Sparkles } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { database } from '../../lib/firebase';
import type { SalonProduct } from '../../lib/products';

const contactNumber = '+918623097761';
const displayNumber = '+91 86230 97761';
const defaultProductImage = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function createWhatsAppLink(product: SalonProduct) {
  const message = `Hi, I am interested in ${product.name} (${formatPrice(product.price)}). Please share details on how to buy it.`;
  return `https://wa.me/${contactNumber.slice(1)}?text=${encodeURIComponent(message)}`;
}

export function ProductsPage() {
  const [products, setProducts] = useState<SalonProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', productId: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => onValue(
    ref(database, 'products'),
    (snapshot) => {
      const nextProducts: SalonProduct[] = [];
      snapshot.forEach((productSnapshot) => {
        const product = productSnapshot.val();
        if (product.isAvailable) {
          nextProducts.push({ ...product, id: productSnapshot.key });
        }
      });
      setProducts(nextProducts.sort((first, second) => first.name.localeCompare(second.name)));
      setLoadError('');
      setIsLoading(false);
    },
    (error) => {
      console.error('Unable to load salon products:', error);
      setLoadError('We could not load products right now. Please try again later or contact the salon directly.');
      setIsLoading(false);
    },
  ), []);

  const handleInquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');
    setFormError('');

    try {
      const selectedProduct = products.find((product) => product.id === formData.productId);
      const inquiryRef = push(ref(database, 'inquiries'));
      if (!inquiryRef.key) {
        throw new Error('Could not create an inquiry reference.');
      }

      await set(inquiryRef, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        productId: selectedProduct?.id ?? '',
        productName: selectedProduct?.name ?? '',
        message: formData.message.trim(),
        status: 'new',
        createdAt: Date.now(),
      });
      setFormData({ name: '', phone: '', productId: '', message: '' });
      setFormMessage('Thanks for reaching out! The salon will contact you shortly.');
    } catch (error) {
      console.error('Unable to send product inquiry:', error);
      setFormError('We could not send your message. Please try again or contact the salon by phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-secondary/30 px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-36">
          <div className="mx-auto max-w-7xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Salon favourites
            </p>
            <h1 className="mb-4 font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">Beauty Products</h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Discover the products we love. Contact us directly for availability, recommendations, and orders.
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="product-list-heading">
          <div className="mx-auto max-w-7xl">
            <h2 id="product-list-heading" className="sr-only">Available beauty products</h2>
            {isLoading ? (
              <p className="py-16 text-center text-muted-foreground" role="status">Loading products…</p>
            ) : loadError ? (
              <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800" role="alert">
                {loadError}
              </div>
            ) : products.length === 0 ? (
              <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-sm">
                <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-primary" aria-hidden="true" />
                <h2 className="mb-2 font-serif text-2xl text-foreground">Products coming soon</h2>
                <p className="text-muted-foreground">Contact us and we’ll be happy to help you find the right product.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-secondary/40">
                      <ImageWithFallback
                        src={product.imageUrl || defaultProductImage}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">{product.category}</p>
                      <h3 className="mb-2 break-words font-serif text-xl text-foreground">{product.name}</h3>
                      <p className="mb-5 flex-1 whitespace-pre-line break-words text-sm leading-relaxed text-muted-foreground">
                        {product.description}
                      </p>
                      <p className="mb-5 text-2xl font-semibold text-foreground">{formatPrice(product.price)}</p>
                      <div className="grid grid-cols-1 gap-2">
                        <a
                          href={createWhatsAppLink(product)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-green-700"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          Buy on WhatsApp
                        </a>
                        <a
                          href={`tel:${contactNumber}`}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-center font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Phone className="h-4 w-4" aria-hidden="true" />
                          Call {displayNumber}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-secondary/30 px-4 py-14 sm:px-6 sm:py-20" id="product-contact">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="pt-2">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">We’re here to help</p>
              <h2 className="mb-4 font-serif text-3xl text-foreground sm:text-4xl">Ask us about a product</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Need help choosing, checking availability, or placing an order? Send us a message and our team will get back to you.
              </p>
              <a
                href={`tel:${contactNumber}`}
                className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-foreground"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {displayNumber}
              </a>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="inquiry-name" className="mb-2 block text-foreground">Your name</label>
                  <input
                    id="inquiry-name"
                    name="name"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    maxLength={100}
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-phone" className="mb-2 block text-foreground">Phone number</label>
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                    maxLength={20}
                    autoComplete="tel"
                    required
                    className="w-full rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+91"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="inquiry-product" className="mb-2 block text-foreground">Product (optional)</label>
                <select
                  id="inquiry-product"
                  value={formData.productId}
                  onChange={(event) => setFormData({ ...formData, productId: event.target.value })}
                  className="w-full rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">I need a recommendation</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="inquiry-message" className="mb-2 block text-foreground">How can we help?</label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  maxLength={1000}
                  required
                  rows={4}
                  className="w-full resize-y rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Ask us about a product, availability, or an order…"
                />
              </div>
              {formMessage && <p className="rounded-xl bg-green-50 p-4 text-green-800" role="status">{formMessage}</p>}
              {formError && <p className="rounded-xl bg-red-50 p-4 text-red-800" role="alert">{formError}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary px-6 py-4 font-medium text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? 'Sending…' : 'Send inquiry'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
