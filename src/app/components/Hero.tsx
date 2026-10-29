import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#faf6f0] px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:min-h-[760px] lg:px-8 lg:pb-24 lg:pt-32"
      id="home"
    >
      <div className="pointer-events-none absolute -left-40 top-28 h-80 w-80 rounded-full bg-[#eeddd6]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#e8d8c6]/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8c3b4] bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#815c51]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Your beauty, your moment
          </div>

          <h1 className="max-w-xl font-serif text-5xl font-semibold leading-[1.08] tracking-tight text-[#382b27] sm:text-6xl lg:text-7xl">
            Feel beautiful.
            <span className="mt-1 block font-semibold not-italic text-[#a66f68]">Feel like you.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#75655e] sm:text-lg">
            A little time for yourself can change everything. Find your moment of care at Nishigandha Beauty Parlour in Ballarpur.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#booking"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#8d5555] px-7 py-4 text-sm font-medium text-white shadow-lg shadow-[#8d5555]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#754343] hover:shadow-xl"
            >
              Book an appointment
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8c3b4] px-7 py-4 text-sm font-medium text-[#59433e] transition-colors duration-300 hover:border-[#8d5555] hover:bg-white/70"
            >
              Explore our services
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 border-t border-[#dfd2c8] pt-6">
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="h-9 w-9 rounded-full border-2 border-[#faf6f0] bg-[#d6b7a5]" />
              <span className="h-9 w-9 rounded-full border-2 border-[#faf6f0] bg-[#b8877b]" />
              <span className="h-9 w-9 rounded-full border-2 border-[#faf6f0] bg-[#e4c9b5]" />
            </div>
            <p className="text-sm leading-6 text-[#75655e]">
              A welcoming space for your
              <span className="block font-medium text-[#493733]">everyday beauty ritual</span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
          <div className="absolute -right-3 -top-3 h-full w-[88%] rounded-[13rem_13rem_2rem_2rem] border border-[#d7c0ad] sm:-right-5 sm:-top-5" />
          <div className="relative h-[420px] overflow-hidden rounded-[13rem_13rem_2rem_2rem] bg-[#e8d8c6] shadow-2xl shadow-[#70574b]/15 sm:h-[540px] lg:h-[610px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1633681121751-e4a0392602b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"
              alt="A calm, light-filled beauty salon"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#31231e]/35 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/80">A place to pause</p>
                <p className="mt-2 font-serif text-2xl sm:text-3xl">Made for you</p>
              </div>
              <span className="rounded-full border border-white/60 bg-white/15 p-3 backdrop-blur-sm">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="absolute -bottom-5 left-3 rounded-2xl border border-[#eee2d8] bg-white px-5 py-4 shadow-xl sm:-left-10 sm:bottom-8 sm:px-6">
            <p className="font-serif text-lg text-[#493733]">A little more you</p>
            <p className="mt-1 text-xs tracking-wide text-[#8b7770]">CARE · CONFIDENCE · GLOW</p>
          </div>
        </div>
      </div>
    </section>
  );
}
