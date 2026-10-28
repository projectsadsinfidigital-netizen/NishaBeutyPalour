import { Star } from 'lucide-react';
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30" id="reviews">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Read the experiences of our happy and satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg text-foreground">{review.name}</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
