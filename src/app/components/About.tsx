import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const salonAddress = 'Dadabhai Nauroji Ward, Near Kata Gate, Flipkart Shop, Ballarpur 442701';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salonAddress)}`;

export function About() {
  return (
    <section className="overflow-hidden bg-[#f2ebe3] px-4 py-20 sm:px-6 sm:py-24 lg:px-8" id="about">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -bottom-4 -left-4 h-full w-[88%] rounded-[2rem] border border-[#cdb7a5] sm:-bottom-5 sm:-left-5" />
          <div className="relative h-[390px] overflow-hidden rounded-[2rem] bg-[#ddc9b8] shadow-xl sm:h-[500px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1773904215697-e6c21fc27ac2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1080"
              alt="A warm and welcoming beauty salon interior"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-2 top-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#8d5555] text-white shadow-lg sm:-right-8 sm:h-24 sm:w-24">
            <Sparkles className="h-8 w-8" strokeWidth={1.4} aria-hidden="true" />
          </div>
          <div className="absolute -bottom-7 right-4 rounded-2xl bg-white px-5 py-4 shadow-xl sm:right-8 sm:px-7">
            <p className="font-serif text-xl text-[#493733]">Your neighborhood</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#92786e]">beauty destination</p>
          </div>
        </div>

        <div className="pt-5 lg:py-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-[#9b6b60]">A warm welcome awaits</p>
          <h2 className="max-w-xl font-serif text-4xl font-normal leading-tight text-[#382b27] sm:text-5xl">
            A space to feel
            <span className="block italic text-[#a66f68]">good in your skin.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#75655e]">
            Nishigandha Beauty Parlour is here for the little moments of care that help you feel refreshed and confident. Come in for a service, take a breath, and leave feeling a little more like yourself.
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-[#75655e]">
            You will find us in Ballarpur. We look forward to welcoming you.
          </p>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#cbb6a5] bg-white/70 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8d5555] hover:bg-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e5df] text-[#8d5555]">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="max-w-[240px] text-left text-sm leading-6 text-[#594842]">{salonAddress}</span>
            <ArrowUpRight className="ml-1 h-4 w-4 shrink-0 text-[#8d5555] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
