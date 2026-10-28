import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden" id="home">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1633681121751-e4a0392602b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc3NzExMjg1NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury Beauty Salon Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20"></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl mb-2 tracking-wider font-serif">
              NISHIGANDHA
            </h1>
            <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl mb-6 tracking-wide font-light">
            Enhance Your Natural Beauty
          </h2>
          <p className="text-base sm:text-xl mb-8 text-white/90 font-light max-w-2xl mx-auto">
            Experience luxury and elegance at our premium beauty salon.
            Where beauty meets perfection.
          </p>
          <a href="#booking">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Book Appointment
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
