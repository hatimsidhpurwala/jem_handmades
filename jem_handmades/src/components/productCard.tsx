import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  // Categories where "Try It On" makes sense
  const tryOnCategories = [
    'jem-lipstick',
    'soft-matte',
    'glossy-liquid',
    'cream-blush',
    'highlighter',
    'wedding-glitter',
    'liquid-blush',
    'lip-lustre',
    //'concealer-stick',
  ];

const canTryOn = [
  'jem-lipstick',
  'soft-matte', 
  'glossy-liquid',
  'wedding-glitter',
  'cream-blush',
  'liquid-blush',
  'highlighter',
  'eyedeal-kajal',
  'eyeliner',
  //'concealer-stick'
].includes(product.category);
  return (
    <div className="group rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-luxury">

      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-white">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // Fallback: show colored box with product name if image fails
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ backgroundColor: product.hex }}
          >
            <span className="text-white text-sm font-medium opacity-80 text-center px-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Category label badge */}
        <span className="absolute top-2 right-2 rounded-sm bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase text-white">
          {product.categoryLabel}
        </span>

        {/* Color dot */}
        <div
          className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-2 border-white shadow-md"
          style={{ backgroundColor: product.hex }}
        />
      </div>

      {/* Color strip */}
      <div className="h-1.5 w-full" style={{ backgroundColor: product.hex }} />

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold text-card-foreground truncate">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {product.description}
          </p>
        )}

        {/* Finish badge + price */}
        <div className="flex items-center justify-between mt-2">
          {product.finish ? (
            <span className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase text-secondary-foreground">
              {product.finish}
            </span>
          ) : (
            <span />
          )}
          <span className="text-sm font-bold text-accent">₹{product.price}</span>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          {canTryOn ? (
            <Link
to={`/try-on?product=${product.id}&category=${product.category}&hex=${encodeURIComponent(product.hex)}&name=${encodeURIComponent(product.name)}&finish=${product.finish ?? 'satin'}`}
              className="flex-1 rounded-md border border-border bg-background py-2 text-center text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Try It On
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          <button
            onClick={handleAdd}
            className="flex-1 rounded-md bg-accent py-2 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
