import { useEffect, useState } from 'react';
import { onValue, push, ref, set, update } from 'firebase/database';
import { Check, Eye, EyeOff, Pencil, Plus, X } from 'lucide-react';
import { database } from '../../lib/firebase';
import type { SalonProduct } from '../../lib/products';

type ProductForm = Omit<SalonProduct, 'id' | 'createdAt' | 'isAvailable'>;

const emptyForm: ProductForm = {
  name: '',
  description: '',
  price: 0,
  category: '',
  imageUrl: '',
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'An unexpected error occurred.';
}

export function AdminProducts() {
  const [products, setProducts] = useState<SalonProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => onValue(
    ref(database, 'products'),
    (snapshot) => {
      const nextProducts: SalonProduct[] = [];
      snapshot.forEach((productSnapshot) => {
        nextProducts.push({ ...productSnapshot.val(), id: productSnapshot.key });
      });
      setProducts(nextProducts.sort((first, second) => first.name.localeCompare(second.name)));
      setIsLoading(false);
    },
    (error) => {
      console.error('Unable to load product catalog:', error);
      setErrorMessage(`Unable to load products: ${getErrorMessage(error)}`);
      setIsLoading(false);
    },
  ), []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const startEditing = (product: SalonProduct) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    });
    setErrorMessage('');
    setSuccessMessage('');
    document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const productData = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        imageUrl: form.imageUrl.trim(),
      };

      if (editingId) {
        await update(ref(database, `products/${editingId}`), productData);
        setSuccessMessage('Product details updated.');
      } else {
        const productRef = push(ref(database, 'products'));
        if (!productRef.key) {
          throw new Error('Could not create a product record.');
        }
        await set(productRef, { ...productData, isAvailable: true, createdAt: Date.now() });
        setSuccessMessage('Product added to the catalog.');
      }

      setForm(emptyForm);
      setEditingId(null);
    } catch (error) {
      console.error('Unable to save product:', error);
      setErrorMessage(`Unable to save product: ${getErrorMessage(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAvailability = async (product: SalonProduct) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await update(ref(database, `products/${product.id}`), { isAvailable: !product.isAvailable });
      setSuccessMessage(`${product.name} is now ${product.isAvailable ? 'hidden from' : 'visible in'} the store.`);
    } catch (error) {
      console.error('Unable to update product availability:', error);
      setErrorMessage(`Unable to update product: ${getErrorMessage(error)}`);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section id="product-form" className="h-fit rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              {editingId ? 'Edit listing' : 'New listing'}
            </p>
            <h3 className="font-serif text-2xl text-foreground">
              {editingId ? 'Update product' : 'Add a product'}
            </h3>
          </div>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Cancel editing">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="product-name" className="mb-2 block text-sm font-medium text-foreground">Product name</label>
            <input id="product-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} maxLength={100} required className="w-full rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Hydrating Face Cream" />
          </div>
          <div>
            <label htmlFor="product-category" className="mb-2 block text-sm font-medium text-foreground">Category</label>
            <input id="product-category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} maxLength={50} required className="w-full rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Skincare" />
          </div>
          <div>
            <label htmlFor="product-price" className="mb-2 block text-sm font-medium text-foreground">Price (₹)</label>
            <input id="product-price" type="number" value={form.price || ''} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} min={1} max={10000000} step="1" required className="w-full rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter price in rupees" />
          </div>
          <div>
            <label htmlFor="product-description" className="mb-2 block text-sm font-medium text-foreground">Product details</label>
            <textarea id="product-description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} maxLength={1000} rows={4} required className="w-full resize-y rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Describe the product and its benefits" />
          </div>
          <div>
            <label htmlFor="product-image" className="mb-2 block text-sm font-medium text-foreground">Image URL (optional)</label>
            <input id="product-image" type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} maxLength={1000} className="w-full rounded-xl border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="https://…" />
          </div>
          {errorMessage && <p className="rounded-xl bg-red-50 p-4 text-red-800" role="alert">{errorMessage}</p>}
          {successMessage && <p className="rounded-xl bg-green-50 p-4 text-green-800" role="status">{successMessage}</p>}
          <button type="submit" disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
            {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isSaving ? 'Saving…' : editingId ? 'Save changes' : 'Add product'}
          </button>
        </form>
      </section>

      <section aria-labelledby="catalog-heading">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-primary">Store catalog</p>
            <h3 id="catalog-heading" className="font-serif text-2xl text-foreground">Products ({products.length})</h3>
          </div>
        </div>
        {isLoading ? (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground" role="status">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">No products yet. Add your first product using the form.</p>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
                <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl bg-secondary/40 sm:w-24">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="break-words font-medium text-foreground">{product.name}</h4>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-secondary text-muted-foreground'}`}>
                      {product.isAvailable ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category} · ₹{product.price.toLocaleString('en-IN')}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => startEditing(product)} aria-label={`Edit ${product.name}`} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
                    <Pencil className="h-4 w-4" />
                    <span className="sm:hidden lg:inline">Edit</span>
                  </button>
                  <button type="button" onClick={() => void toggleAvailability(product)} aria-label={`${product.isAvailable ? 'Hide' : 'Show'} ${product.name}`} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
                    {product.isAvailable ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sm:hidden lg:inline">{product.isAvailable ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
