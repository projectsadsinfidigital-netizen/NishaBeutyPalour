import { ArrowUpRight, Droplets, Palette, Scissors, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    number: '01',
    title: 'Haircut & Styling',
    description: 'A fresh cut and a style that feels completely your own.',
    tone: 'bg-[#f3e5dc]',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Facial Treatment',
    description: 'A thoughtful reset for soft, refreshed, radiant-looking skin.',
    tone: 'bg-[#eee2e5]',
  },
  {
    icon: Palette,
    number: '03',
    title: 'Makeup Artistry',
    description: 'Feel your best for celebrations, milestones, and every day.',
    tone: 'bg-[#efe8d8]',
  },
  {
    icon: Droplets,
    number: '04',
    title: 'Spa & Wellness',
    description: 'Slow down, unwind, and make room for a little self-care.',
    tone: 'bg-[#e2e9e3]',
  },
];

export function Services() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-[#9b6b60]">A little care goes a long way</p>
            <h2 className="font-serif text-4xl font-normal leading-tight text-[#382b27] sm:text-5xl">
              Beauty rituals, <span className="italic text-[#a66f68]">made personal.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#75655e]">
            From a fresh new look to a well-deserved moment of calm, find the care that feels right for you.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.number}
                href="#booking"
                className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[1.5rem] border border-[#eee5dd] bg-[#fbf9f6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b6a8] hover:shadow-xl hover:shadow-[#604b41]/[0.08] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.tone} text-[#745148] transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105`}>
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-sm text-[#b8a69b]">{service.number}</span>
                </div>
                <div className="mt-auto pt-10">
                  <h3 className="font-serif text-2xl font-medium text-[#493733]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#81716a]">{service.description}</p>
                </div>
                <span className="absolute bottom-7 right-6 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-[#e6d9cf] text-[#8d5555] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
