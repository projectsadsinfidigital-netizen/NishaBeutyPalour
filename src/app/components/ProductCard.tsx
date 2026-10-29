import { MessageCircle, Phone } from 'lucide-react';
import { salonPhone, displaySalonPhone, salonWhatsAppNumber } from '../../lib/contact';
import type { SalonProduct } from '../../lib/products';
import { ImageWithFallback } from './figma/ImageWithFallback';

const defaultProductImage =
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85';

interface ProductCardProps {
  product: SalonProduct;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function createWhatsAppLink(product: SalonProduct) {
  const productUrl = new URL(
    `/products#product-${encodeURIComponent(product.id)}`,
    window.location.origin,
  ).toString();
  const message = `Hi, I am interested in ${product.name} (${formatPrice(product.price)}). Please share details on how to buy it. ${productUrl}`;
  return `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      id={`product-${product.id}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-[#e9e3dc] bg-white shadow-[0_8px_28px_-20px_rgba(61,48,43,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d8c8bc] hover:shadow-[0_20px_40px_-24px_rgba(61,48,43,0.38)] sm:rounded-3xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#faf8f4]">
        <ImageWithFallback
          src={product.imageUrl || defaultProductImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:p-4"
        />
      </div>

      <div className="flex flex-1 flex-col items-stretch p-5 text-left sm:p-6">
        {product.category && (
          <p className="mb-3 w-fit max-w-full self-start truncate rounded-full bg-[#f5efe8] px-3 py-1 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#815c4e]">
            {product.category}
          </p>
        )}
        <h3 className="mb-2 line-clamp-2 break-words text-left font-sans text-lg font-semibold leading-snug text-[#332a26]">
          {product.name}
        </h3>
        <p className="mb-5 line-clamp-3 whitespace-pre-line break-words text-left font-sans text-sm leading-5 text-[#756b65]">
          {product.description}
        </p>

        <div className="mb-4 mt-auto flex w-full items-center justify-between gap-3 border-t border-[#eee9e4] pt-4 text-left">
          <span className="text-sm text-[#756b65]">Price</span>
          <p className="whitespace-nowrap text-right text-xl font-bold tabular-nums tracking-tight text-[#332a26] sm:text-2xl">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="grid gap-2.5">
          <a
            href={createWhatsAppLink(product)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Buy ${product.name} on WhatsApp`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#168c4a] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_5px_14px_-8px_rgba(22,140,74,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#11763e] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168c4a]/25"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Buy on WhatsApp
          </a>
          <a
            href={`tel:${salonPhone}`}
            aria-label={`Call ${displaySalonPhone}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e5ded8] bg-white px-4 py-3 text-center text-sm font-medium text-[#493f39] transition-colors hover:border-[#bda99a] hover:bg-[#faf8f4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {displaySalonPhone}
          </a>
        </div>
      </div>
    </article>
  );
}
