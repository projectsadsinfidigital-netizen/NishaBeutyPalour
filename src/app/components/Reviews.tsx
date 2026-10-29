import { Quote, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const reviews = [
  {
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1585261941042-5da0c5f1f0a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzc3MTEyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    review: 'Absolutely amazing experience! The staff is professional, the ambiance is luxurious, and I left feeling like a new person. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    image: 'https://images.unsplash.com/photo-1698181842513-2179d5f8bc65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzc3MTEyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    review: 'The best salon I have ever been to! My hair has never looked better. The stylist understood exactly what I wanted and delivered perfection.',
    rating: 5,
  },
  {
    name: 'Jessica Williams',
    image: 'https://images.unsplash.com/photo-1653130029149-9109b115ab9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzc3MTEyODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    review: 'Such a relaxing and pampering experience. From the moment I walked in, I felt welcomed and cared for. Will definitely be coming back!',
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8" id="reviews">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-[#9b6b60]">Kind words</p>
          <h2 className="font-serif text-4xl font-normal leading-tight text-[#382b27] sm:text-5xl">
            The best part is <span className="italic text-[#a66f68]">how you feel.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-[#75655e]">
            A few notes from clients who have spent a little time with us.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group flex flex-col rounded-[1.5rem] border border-[#eee5dd] bg-[#fbf9f6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b6a8] hover:shadow-xl hover:shadow-[#604b41]/[0.07] sm:p-8"
            >
              <Quote className="mb-5 h-7 w-7 text-[#b8877b]/70" strokeWidth={1.5} aria-hidden="true" />
              <p className="mb-7 flex-1 font-serif text-lg leading-8 text-[#594842]">“{review.review}”</p>
              <div className="flex items-center border-t border-[#e9dfd7] pt-5">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-[#e8d8c6]">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-[#493733]">{review.name}</h4>
                  <div className="mt-1 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#b99559] text-[#b99559]" aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
