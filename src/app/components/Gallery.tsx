import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1762745103094-6760fab8eb50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc3NzExMjg1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Hair Styling',
  },
  {
    url: 'https://images.unsplash.com/photo-1698181842119-a5283dea1440?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzc3MTEyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Bridal Makeup',
  },
  {
    url: 'https://images.unsplash.com/photo-1630595633877-9918ee257288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzcxMDkzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Spa Treatment',
  },
  {
    url: 'https://images.unsplash.com/photo-1761931403667-a6753db21f32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc3NzExMjg1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Hair Coloring',
  },
  {
    url: 'https://images.unsplash.com/photo-1723150512429-bfa92988d845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzc3MTEyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Makeup Products',
  },
  {
    url: 'https://images.unsplash.com/photo-1731514771613-991a02407132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzcGElMjB3ZWxsbmVzcyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzcxMDkzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Facial Treatment',
  },
];

export function Gallery() {
  return (
    <section className="bg-[#faf6f0] px-4 py-20 sm:px-6 sm:py-24 lg:px-8" id="gallery">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-[#9b6b60]">Little moments, lovely details</p>
            <h2 className="font-serif text-4xl font-normal leading-tight text-[#382b27] sm:text-5xl">
              A glimpse of <span className="italic text-[#a66f68]">our world.</span>
            </h2>
          </div>
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#8d5555] transition-colors hover:text-[#674040]"
          >
            Come see us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative aspect-[0.92] overflow-hidden rounded-2xl bg-[#e8d8c6] shadow-sm transition-all duration-300 hover:shadow-xl sm:rounded-[1.5rem] ${
                index === 1 || index === 4 ? 'lg:translate-y-8' : ''
              }`}
            >
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#31231e]/60 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                <p className="translate-y-1 px-4 pb-4 font-serif text-base text-white transition-transform duration-300 group-hover:translate-y-0 sm:px-6 sm:pb-6 sm:text-xl">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
