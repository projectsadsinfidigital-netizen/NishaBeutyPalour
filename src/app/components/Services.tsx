import { Scissors, Sparkles, Palette, Droplets } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Haircut & Styling',
    description: 'Expert haircuts and styling tailored to enhance your unique features and personality.',
  },
  {
    icon: Sparkles,
    title: 'Facial Treatment',
    description: 'Rejuvenating facial treatments that bring out your natural glow and radiance.',
  },
  {
    icon: Palette,
    title: 'Makeup Artistry',
    description: 'Professional makeup services for all occasions, from natural to glamorous looks.',
  },
  {
    icon: Droplets,
    title: 'Spa & Wellness',
    description: 'Relaxing spa treatments designed to refresh your body, mind, and spirit.',
  },
];

export function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our range of premium beauty services designed to make you look and feel your best
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
