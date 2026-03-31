// ─── src/lib/api.ts ───────────────────────────────────────────────
// All API calls to JEM backend

const BASE_URL = 'https://jem.24x7shopping.co/jem/api';

const HEADERS = {
  'Content-Type': 'application/json',
};

// ─── Types matching the API response ─────────────────────────────

export interface ApiProduct {
  _id: string;
  productName: string;
  categoryId: string;
  categoryName: string;
  subCategory?: string;
  price: {
    currency: string;
    value: string;
  };
  description: string[];
  attributes: {
  shade?: string;
  shadeDescription?: string;
  suitableFor?: string;
  shadeColour?: string;
};
  tags: string[];
  status: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  files: {
    _id: string;
    fileName: string;
    originalName: string;
    fileType: string;
    mimeType: string;
    fileSize: number;
    url: string;
    altText: string;
    caption: string;
    createdAt: string;
  }[];
}

export interface ApiCategory {
  _id: string;
  categoryName: string;
  categoryId: string;
  description?: string;
  status: string;
}

export interface ProductsResponse {
  success: boolean;
  data: ApiProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CategoriesResponse {
  success: boolean;
  data: ApiCategory[];
}

export interface ProductResponse {
  success: boolean;
  data: ApiProduct;
}

// ─── Query Params type ────────────────────────────────────────────

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─── API Functions ────────────────────────────────────────────────

// 1. Get all products (with optional filters)
export async function fetchProducts(
  params: ProductQueryParams = {}
): Promise<ProductsResponse> {
  const query = new URLSearchParams();

  if (params.page)      query.set('page',      String(params.page));
  if (params.limit)     query.set('limit',     String(params.limit));
  if (params.search)    query.set('search',    params.search);
  if (params.categoryId) query.set('categoryId', params.categoryId);
  if (params.status)    query.set('status',    params.status);
  if (params.minPrice)  query.set('minPrice',  String(params.minPrice));
  if (params.maxPrice)  query.set('maxPrice',  String(params.maxPrice));
  if (params.sortBy)    query.set('sortBy',    params.sortBy);
  if (params.sortOrder) query.set('sortOrder', params.sortOrder);

  const url = `${BASE_URL}/website/products?${query.toString()}`;

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

  return res.json();
}

// 2. Get single product by ID
export async function fetchProductById(id: string): Promise<ProductResponse> {
  const res = await fetch(`${BASE_URL}/website/${id}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
  return res.json();
}

// 3. Get all categories
export async function fetchCategories(): Promise<any> {

  const res = await fetch(`${BASE_URL}/website/categories`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  return res.json();
}

// ─── Helper: Map categoryName to your Category type ──────────────
// Maps API category names to your internal category keys

export function mapCategoryName(categoryName: string): string {
  const map: Record<string, string> = {
    'JEM LIPSTICKS':                    'jem-lipstick',
    'SOFT MATTE LIQUID LIPSTICKS':      'soft-matte',
    'GLOSSY LIQUID LIPSTICKS':          'glossy-liquid',
    'CREAM BLUSH':                      'cream-blush',
    'HIGHLIGHTER':                      'highlighter',
    'MINI LIPSTICK SET':                'mini-lipstick-set',
    'EYEDEAL KAJAL':                    'eyedeal-kajal',
    'PRIMER':                           'primer',
    'EYELINER':                         'eyeliner',
    'WEDDING EDITION GLITTER LIPSTICKS':'wedding-glitter',
    'MAKE UP REMOVER':                  'makeup-remover',
    'CHAPSTICK LIPBALM':                'chapstick-lipbalm',
    'LIQUID BLUSH':                     'liquid-blush',
    'LIP LUSTRE':                       'lip-lustre',
    'MASCARA':                          'mascara',
    'BRIDGERTON COLLECTION':            'bridgerton',
    'CONCEALER STICKS':                 'concealer-stick',
  };
  return map[categoryName.toUpperCase()] ?? 'jem-lipstick';
}

// ─── Helper: Convert API product to your Product shape ───────────

export function mapApiProduct(p: ApiProduct) {
  return {
    id:            p._id,
    name:          p.productName,
    category:      mapCategoryName(p.categoryName),
    categoryLabel: p.categoryName,
    hex: p.attributes?.shadeColour ?? '#C4527A',
    price:         Number(p.price.value),
    image:         p.files?.[0]?.url ?? '',
    description:   p.description?.join(' • ') ?? '',
    finish:        p.attributes?.shadeDescription ?? undefined,
    popular:       false,
  };
}