import { ImageWithFallback } from './figma/ImageWithFallback';

const stylists = [
  {
    name: 'Isabella Martinez',
    role: 'Lead Hair Stylist',
    image: 'https://images.unsplash.com/photo-1559069309-020e226c60f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoYWlyc3R5bGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzExMjg1NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Sophia Anderson',
    role: 'Makeup Artist',
    image: 'https://images.unsplash.com/photo-1715407754988-4d617cdf0a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyc3R5bGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzExMjg1NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Olivia Thompson',
    role: 'Spa Specialist',
    image: 'https://images.unsplash.com/photo-1659355751333-cf3aa64ec7cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoYWlyc3R5bGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzExMjg1NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function About() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl mb-6 text-foreground">About Our Salon</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Welcome to our luxury beauty sanctuary, where elegance meets expertise. For over a decade,
              we've been transforming beauty dreams into reality with our exceptional services and
              passionate team of professionals.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Our salon is equipped with state-of-the-art facilities and premium products to ensure
              you receive nothing but the best. We believe that every client deserves personalized
              attention and a luxurious experience that leaves them feeling confident and beautiful.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From the moment you step through our doors, you'll be embraced by a warm, welcoming
              atmosphere designed to make you feel pampered and relaxed.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1773904215697-e6c21fc27ac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc3NzExMjg1NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Salon Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl mb-4 text-foreground">Meet Our Expert Team</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our talented stylists are passionate about beauty and dedicated to your satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stylists.map((stylist, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-3xl aspect-square shadow-lg">
                <ImageWithFallback
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="text-xl mb-2 text-foreground">{stylist.name}</h4>
              <p className="text-primary">{stylist.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
