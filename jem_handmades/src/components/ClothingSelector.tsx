import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────
export interface ClothingItem {
  id: string;
  name: string;
  price: number;
  colors: string[];
  sizes: string[];
  emoji: string;
  category: ClothingCategory;
  description?: string;
}

export type ClothingCategory = 'tops' | 'dresses' | 'dupattas' | 'scarves';

interface ClothingSelectorProps {
  selectedItem: ClothingItem;
  selectedColor: string;
  selectedSize: string;
  opacity: number;
  onSelectItem: (item: ClothingItem) => void;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  onOpacityChange: (opacity: number) => void;
  onAddToCart?: (item: ClothingItem, color: string, size: string) => void;
}

// ─── Clothing Data ────────────────────────────────────────────────
export const CLOTHING_DATA: Record<ClothingCategory, ClothingItem[]> = {
  tops: [
    {
      id: 'top-white',
      name: 'White Casual Top',
      price: 799,
      colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      emoji: '👕',
      category: 'tops',
      description: 'Light and breezy everyday casual top',
    },
    {
      id: 'top-black',
      name: 'Black Formal Top',
      price: 999,
      colors: ['#000000', '#1A1A1A', '#2C2C2C'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      emoji: '👕',
      category: 'tops',
      description: 'Elegant formal top for office or events',
    },
    {
      id: 'top-floral',
      name: 'Floral Print Top',
      price: 849,
      colors: ['#E8A0A0', '#F48FB1', '#FFAD86'],
      sizes: ['S', 'M', 'L', 'XL'],
      emoji: '👚',
      category: 'tops',
      description: 'Gorgeous floral print for festive occasions',
    },
    {
      id: 'top-red',
      name: 'Solid Red Top',
      price: 749,
      colors: ['#C0392B', '#E8603C', '#9B1C1C'],
      sizes: ['XS', 'S', 'M', 'L'],
      emoji: '👕',
      category: 'tops',
      description: 'Bold solid color top for a confident look',
    },
    {
      id: 'top-stripe',
      name: 'Classic Stripe Top',
      price: 699,
      colors: ['#FFFFFF', '#1A1A1A', '#1A2A6B'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      emoji: '👕',
      category: 'tops',
      description: 'Timeless striped top for any casual day',
    },
    {
      id: 'top-pink',
      name: 'Pink Casual Top',
      price: 699,
      colors: ['#F48FB1', '#E8A0A0', '#F9A8C9'],
      sizes: ['S', 'M', 'L', 'XL'],
      emoji: '👚',
      category: 'tops',
      description: 'Soft pink top for a feminine everyday look',
    },
  ],
  dresses: [
    {
      id: 'dress-floral',
      name: 'Floral Midi Dress',
      price: 1499,
      colors: ['#E8A0A0', '#F48FB1', '#FFAD86'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      emoji: '👗',
      category: 'dresses',
      description: 'Flowy floral midi dress perfect for outings',
    },
    {
      id: 'dress-black',
      name: 'Black Evening Dress',
      price: 1999,
      colors: ['#000000', '#1A1A1A'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      emoji: '👗',
      category: 'dresses',
      description: 'Elegant black dress for evenings and events',
    },
    {
      id: 'dress-ethnic',
      name: 'Ethnic Anarkali',
      price: 2499,
      colors: ['#C0392B', '#6D2B6D', '#1A2A6B'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      emoji: '👗',
      category: 'dresses',
      description: 'Stunning Anarkali for weddings and festivals',
    },
    {
      id: 'dress-casual',
      name: 'Casual Sundress',
      price: 1299,
      colors: ['#F5DEB3', '#FFAD86', '#F9A8C9'],
      sizes: ['XS', 'S', 'M', 'L'],
      emoji: '👗',
      category: 'dresses',
      description: 'Light and comfortable summer sundress',
    },
  ],
  dupattas: [
    {
      id: 'dupatta-silk',
      name: 'Silk Dupatta',
      price: 599,
      colors: ['#C0392B', '#6D2B6D', '#D4AF37', '#1A2A6B'],
      sizes: ['Free Size'],
      emoji: '🧣',
      category: 'dupattas',
      description: 'Premium silk dupatta with golden border',
    },
    {
      id: 'dupatta-chiffon',
      name: 'Chiffon Dupatta',
      price: 449,
      colors: ['#F48FB1', '#E8A0A0', '#FFAD86', '#FFFFFF'],
      sizes: ['Free Size'],
      emoji: '🧣',
      category: 'dupattas',
      description: 'Lightweight chiffon dupatta for daily wear',
    },
    {
      id: 'dupatta-embroidered',
      name: 'Embroidered Dupatta',
      price: 799,
      colors: ['#C0392B', '#D4AF37', '#1A4A2A'],
      sizes: ['Free Size'],
      emoji: '🧣',
      category: 'dupattas',
      description: 'Beautifully embroidered dupatta for festivals',
    },
    {
      id: 'dupatta-bandhani',
      name: 'Bandhani Dupatta',
      price: 649,
      colors: ['#C0392B', '#E8603C', '#6D2B6D'],
      sizes: ['Free Size'],
      emoji: '🧣',
      category: 'dupattas',
      description: 'Traditional Bandhani tie-dye dupatta',
    },
  ],
  scarves: [
    {
      id: 'scarf-wool',
      name: 'Wool Scarf',
      price: 499,
      colors: ['#2C1A1A', '#4A1040', '#1A2A6B'],
      sizes: ['Free Size'],
      emoji: '🧤',
      category: 'scarves',
      description: 'Warm and cozy wool scarf for winters',
    },
    {
      id: 'scarf-cotton',
      name: 'Cotton Printed Scarf',
      price: 349,
      colors: ['#FFAD86', '#F48FB1', '#E8A0A0'],
      sizes: ['Free Size'],
      emoji: '🧤',
      category: 'scarves',
      description: 'Soft cotton printed scarf for all seasons',
    },
    {
      id: 'scarf-silk',
      name: 'Silk Scarf',
      price: 699,
      colors: ['#D4AF37', '#C0392B', '#1A2A6B'],
      sizes: ['Free Size'],
      emoji: '🧤',
      category: 'scarves',
      description: 'Luxurious silk scarf for a stylish look',
    },
    {
      id: 'scarf-pashmina',
      name: 'Pashmina Shawl',
      price: 999,
      colors: ['#F5DEB3', '#C4A882', '#8B4513'],
      sizes: ['Free Size'],
      emoji: '🧤',
      category: 'scarves',
      description: 'Pure Pashmina shawl — ultra soft and warm',
    },
  ],
};

export const CATEGORY_LABELS: Record<ClothingCategory, string> = {
  tops:     '👕 Tops',
  dresses:  '👗 Dresses',
  dupattas: '🧣 Dupattas',
  scarves:  '🧤 Scarves',
};

// ─── Component ────────────────────────────────────────────────────
export default function ClothingSelector({
  selectedItem,
  selectedColor,
  selectedSize,
  opacity,
  onSelectItem,
  onSelectColor,
  onSelectSize,
  onOpacityChange,
  onAddToCart,
}: ClothingSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<ClothingCategory>('tops');
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCategoryChange = (cat: ClothingCategory) => {
    setActiveCategory(cat);
    const firstItem = CLOTHING_DATA[cat][0];
    onSelectItem(firstItem);
    onSelectColor(firstItem.colors[0]);
    onSelectSize(firstItem.sizes[0]);
    setAddedToCart(false);
  };

  const handleSelectItem = (item: ClothingItem) => {
    onSelectItem(item);
    onSelectColor(item.colors[0]);
    onSelectSize(item.sizes[0]);
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(selectedItem, selectedColor, selectedSize);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const items = CLOTHING_DATA[activeCategory];

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="font-heading text-lg font-bold text-foreground mb-3">
        👗 Clothing
      </h2>

      {/* ── Category Tabs ── */}
      <div className="flex flex-wrap gap-1 mb-4">
        {(Object.keys(CATEGORY_LABELS) as ClothingCategory[]).map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* ── Items Grid ── */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => handleSelectItem(item)}
            className={`rounded-lg border-2 p-2 text-left transition-all hover:shadow-md ${
              selectedItem.id === item.id
                ? 'border-accent bg-accent/10 shadow-md'
                : 'border-border hover:border-accent/40'
            }`}
          >
            {/* Color preview strip */}
            <div className="flex gap-0.5 mb-1.5 rounded overflow-hidden h-2">
              {item.colors.slice(0, 3).map(c => (
                <div key={c} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="text-xl mb-0.5 text-center">{item.emoji}</div>
            <p className="text-xs font-medium text-foreground leading-tight line-clamp-2">
              {item.name}
            </p>
            <p className="text-xs text-accent font-semibold mt-0.5">Rs.{item.price}</p>
          </button>
        ))}
      </div>

      {/* ── Selected Item Info ── */}
      <div className="rounded-md bg-secondary/50 px-3 py-2 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-foreground">{selectedItem.name}</p>
            {selectedItem.description && (
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                {selectedItem.description}
              </p>
            )}
          </div>
          <p className="text-sm font-bold text-accent ml-2">Rs.{selectedItem.price}</p>
        </div>
      </div>

      {/* ── Color Selector ── */}
      <p className="text-xs text-muted-foreground mb-2">Select Color</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedItem.colors.map(color => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            title={color}
            className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
              selectedColor === color
                ? 'border-accent scale-110 shadow-md'
                : 'border-border'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        {/* Custom color picker */}
        <div className="relative">
          <input
            type="color"
            value={selectedColor}
            onChange={e => onSelectColor(e.target.value)}
            title="Custom color"
            className="h-8 w-8 cursor-pointer rounded-full border-2 border-border opacity-0 absolute inset-0"
          />
          <div
            className="h-8 w-8 rounded-full border-2 border-dashed border-border flex items-center justify-center text-xs"
            style={{ backgroundColor: selectedColor }}
            title="Custom color"
          >
            +
          </div>
        </div>
      </div>

      {/* ── Size Selector ── */}
      {selectedItem.sizes[0] !== 'Free Size' && (
        <>
          <p className="text-xs text-muted-foreground mb-2">Select Size</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedItem.sizes.map(size => (
              <button
                key={size}
                onClick={() => onSelectSize(size)}
                className={`rounded-md px-3 py-1 text-xs font-medium border transition-colors ${
                  selectedSize === size
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-background text-foreground border-border hover:border-accent/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedItem.sizes[0] === 'Free Size' && (
        <div className="mb-4">
          <span className="inline-block rounded-md bg-secondary px-3 py-1 text-xs text-muted-foreground">
            Free Size
          </span>
        </div>
      )}

      {/* ── Opacity Slider ── */}
      <p className="text-xs text-muted-foreground mb-1">
        Overlay Opacity: {Math.round(opacity * 100)}%
      </p>
      <input
        type="range"
        min={0.4}
        max={1}
        step={0.05}
        value={opacity}
        onChange={e => onOpacityChange(parseFloat(e.target.value))}
        className="mb-4 w-full accent-accent"
      />

      {/* ── Add to Cart Button ── */}
      {onAddToCart && (
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-accent text-accent-foreground hover:bg-accent/90'
          }`}
        >
          <ShoppingCart size={16} />
          {addedToCart ? '✓ Added to Cart!' : `Add to Cart — Rs.${selectedItem.price}`}
        </button>
      )}
    </div>
  );
}