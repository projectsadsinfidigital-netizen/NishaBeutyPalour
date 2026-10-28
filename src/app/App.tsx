import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Booking } from './components/Booking';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ProductsPage } from './components/ProductsPage';

const AdminDashboard = lazy(() =>
  import('./components/AdminDashboard').then(({ AdminDashboard: dashboard }) => ({ default: dashboard })),
);

export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  if (currentPath === '/admin') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="/" className="text-xl sm:text-2xl font-serif tracking-wider text-foreground">
              NISHIGANDHA
            </a>
            <a
              href="/"
              className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              Back to website
            </a>
          </div>
        </header>
        <main>
          <Suspense fallback={<p className="py-12 text-center text-muted-foreground">Opening admin dashboard…</p>}>
            <AdminDashboard />
          </Suspense>
        </main>
      </div>
    );
  }

  if (currentPath === '/products') {
    return <ProductsPage />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Booking />
      <Gallery />
      <Reviews />
      <About />
      <Footer />
    </div>
  );
}
