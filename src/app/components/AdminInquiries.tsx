import { useEffect, useState } from 'react';
import { onValue, orderByChild, query, ref, update } from 'firebase/database';
import { Check, Clock, Phone, User } from 'lucide-react';
import { database } from '../../lib/firebase';
import type { ProductInquiry } from '../../lib/products';

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => onValue(
    query(ref(database, 'inquiries'), orderByChild('createdAt')),
    (snapshot) => {
      const nextInquiries: ProductInquiry[] = [];
      snapshot.forEach((inquirySnapshot) => {
        nextInquiries.push({ ...inquirySnapshot.val(), id: inquirySnapshot.key });
      });
      setInquiries(nextInquiries.reverse());
      setErrorMessage('');
      setIsLoading(false);
    },
    (error) => {
      console.error('Unable to load product inquiries:', error);
      setErrorMessage('Could not load product inquiries. Check the Firebase Realtime Database rules and try again.');
      setIsLoading(false);
    },
  ), []);

  const markResolved = async (inquiry: ProductInquiry) => {
    setErrorMessage('');
    try {
      await update(ref(database, `inquiries/${inquiry.id}`), {
        status: inquiry.status === 'resolved' ? 'new' : 'resolved',
      });
    } catch (error) {
      console.error('Unable to update product inquiry:', error);
      setErrorMessage('Could not update this inquiry. Check your admin database permissions and try again.');
    }
  };

  return (
    <section aria-labelledby="inquiries-heading">
      <div className="mb-6">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-primary">Customer messages</p>
        <h3 id="inquiries-heading" className="font-serif text-2xl text-foreground">Product inquiries ({inquiries.length})</h3>
      </div>
      {errorMessage && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-800" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground" role="status">Loading inquiries…</p>
      ) : inquiries.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">No product inquiries yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {inquiries.map((inquiry) => (
            <article key={inquiry.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${inquiry.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                  {inquiry.status}
                </span>
                <time className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(inquiry.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="space-y-2">
                <p className="inline-flex items-center gap-2 font-medium text-foreground"><User className="h-4 w-4 text-primary" />{inquiry.name}</p>
                <p><a href={`tel:${inquiry.phone}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><Phone className="h-4 w-4 text-primary" />{inquiry.phone}</a></p>
                {inquiry.productName && <p className="text-sm text-muted-foreground">Product: <span className="font-medium text-foreground">{inquiry.productName}</span></p>}
                <p className="whitespace-pre-line break-words rounded-xl bg-secondary/40 p-4 text-sm leading-relaxed text-foreground">{inquiry.message}</p>
              </div>
              <button
                type="button"
                onClick={() => void markResolved(inquiry)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Check className="h-4 w-4" />
                {inquiry.status === 'resolved' ? 'Mark as new' : 'Mark resolved'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
