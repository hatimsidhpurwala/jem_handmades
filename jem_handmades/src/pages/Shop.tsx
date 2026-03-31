import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, mapApiProduct } from '@/lib/api';
import ProductCard from '@/components/productCard';
import { Loader2 } from 'lucide-react';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name';

const ICON_MAP: Record<string, string> = {
  'JEM LIPSTICKS':                     '💄',
  'SOFT MATTE LIQUID LIPSTICKS':       '🫦',
  'GLOSSY LIQUID LIPSTICKS':           '💋',
  'CREAM BLUSH':                       '🌸',
  'LIQUID BLUSH':                      '🍒',
  'HIGHLIGHTER':                       '✦',
  'EYEDEAL KAJAL':                     '👁️',
  'EYELINER':                          '🖊️',
  'MASCARA':                           '🪄',
  'PRIMER':                            '🫧',
  'LIP LUSTRE':                        '💫',
  'CHAPSTICK LIPBALM':                 '🍓',
  'WEDDING EDITION GLITTER LIPSTICKS': '💍',
  'BRIDGERTON COLLECTION':             '🕊️',
  'CONCEALER STICKS':                  '🪄',
  'MINI LIPSTICK SET':                 '🎀',
  'MAKE UP REMOVER':                   '🌿',
};

export default function Shop() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [sort, setSort]     = useState<SortOption>('popular');
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState('');
  const scrollRef           = useRef<HTMLDivElement>(null);
  const LIMIT = 20;

  // ── Fetch Categories ──────────────────────────────────────────
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn:  fetchCategories,
    staleTime: 1000 * 60 * 10, // cache 10 mins
  });

const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  // ── Fetch Products ────────────────────────────────────────────
  const { data: productsData, isLoading, isError } = useQuery({
    queryKey: ['products', activeCategoryId, page, search, sort],
    queryFn: () => fetchProducts({
      page,
      limit:      LIMIT,
      categoryId: activeCategoryId === 'all' ? undefined : activeCategoryId,
      search:     search || undefined,
      status:     'active',
      sortBy:     sort === 'name' ? 'productName' : sort === 'popular' ? 'createdAt' : 'price.value',
      sortOrder:  sort === 'price-asc' ? 'asc' : 'desc',
    }),
    staleTime: 1000 * 60 * 5,
  });

  const rawProducts  = productsData?.data ?? [];
  const pagination   = productsData?.pagination;
  const products     = rawProducts.map(mapApiProduct);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Shop</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {pagination ? `${pagination.total} products across all categories` : 'Explore our full range of beauty products'}
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none w-48"
            />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
            >
              <option value="popular">Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Category Scroll Strip */}
        <div className="relative mt-6">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-sm hover:bg-secondary transition-colors"
          >
            <svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scroll-smooth px-10 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* All tab */}
            <button
              onClick={() => { setActiveCategoryId('all'); setPage(1); }}
              className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                activeCategoryId === 'all'
                  ? 'border-accent bg-accent text-accent-foreground shadow-md scale-105'
                  : 'border-border bg-background text-muted-foreground hover:border-accent/50 hover:bg-secondary'
              }`}
            >
              <span className="text-lg leading-none">✨</span>
              <span className="whitespace-nowrap">All</span>
            </button>

            {/* Dynamic categories from API */}
            {categories.map(cat => {
              const mappedKey = cat.name?.toLowerCase().replace(/\s+/g, '-') ?? '';
              const icon = ICON_MAP[cat.categoryName?.toUpperCase()] ?? '💄';
              return (
                <button
                  key={cat._id}
                  onClick={() => { setActiveCategoryId(cat._id); setPage(1); }}
                  className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                    activeCategoryId === cat._id
                      ? 'border-accent bg-accent text-accent-foreground shadow-md scale-105'
                      : 'border-border bg-background text-muted-foreground hover:border-accent/50 hover:bg-secondary'
                  }`}
                >
                  <span className="text-lg leading-none">{icon}</span>
                  <span className="whitespace-nowrap">{cat.categoryName}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-sm hover:bg-secondary transition-colors"
          >
            <svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {/* Product Count */}
        <p className="mt-4 text-xs text-muted-foreground">
          {isLoading ? 'Loading...' : `${pagination?.total ?? products.length} products`}
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-20 flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm text-destructive">Failed to load products. Please try again.</p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="text-4xl">🎀</span>
            <p className="text-sm text-muted-foreground">No products found — try a different category or search.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary transition-colors"
            >
              ← Prev
            </button>
            <span className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary transition-colors"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </main>
  );
}