import { lipsticks } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Collection() {
  return (
    <main className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Shade Collection</h1>
        <p className="mt-2 text-sm text-muted-foreground">Explore all shades in our curated lipstick collection.</p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {lipsticks.map((shade, i) => (
            <motion.div
              key={shade.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/try-on?shade=${shade.id}`}
                className="group flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:shadow-luxury"
              >
                <div
                  className="h-24 w-24 rounded-full border-2 border-border shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: shade.hex }}
                />
                <div className="text-center">
                  <h3 className="font-heading text-base font-semibold text-card-foreground">{shade.name}</h3>
                  <p className="mt-1 text-xs capitalize text-muted-foreground">{shade.finish}</p>
                  <p className="mt-1 text-sm font-bold text-accent">Rs.{shade.price}</p>
                </div>
                <span className="rounded-md border border-border bg-background px-4 py-1.5 text-xs font-medium text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
                  Try It On
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}