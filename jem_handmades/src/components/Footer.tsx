import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-xl font-bold">
              Jem<span className="text-accent"> Handmades</span>
            </h3>
            <p className="mt-2 text-sm opacity-70">Try before you buy. Virtual lipstick try-on powered by AI.</p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider opacity-70">Quick Links</h4>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/try-on" className="text-sm opacity-70 transition-opacity hover:opacity-100">Virtual Try-On</Link>
              <Link to="/shop" className="text-sm opacity-70 transition-opacity hover:opacity-100">Shop</Link>
              <Link to="/collection" className="text-sm opacity-70 transition-opacity hover:opacity-100">Collection</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider opacity-70">Support</h4>
            <div className="mt-3 flex flex-col gap-2">
              <span className="text-sm opacity-70">help@jemandmades.com</span>

            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-xs opacity-50">
          © 2026 Jem  Handmades . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
