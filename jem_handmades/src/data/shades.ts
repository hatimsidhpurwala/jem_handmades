export type Finish = 'matte' | 'glossy' | 'satin';

export interface Shade {
  id: string;
  name: string;
  hex: string;
  finish: Finish;
  price: number;
  popular?: boolean;
}

export const shades: Shade[] = [
  { id: "ruby-red", name: "Ruby Red", hex: "#9B1C1C", finish: "matte", price: 499, popular: true },
  { id: "coral-kiss", name: "Coral Kiss", hex: "#E8603C", finish: "glossy", price: 519 },
  { id: "nude-bliss", name: "Nude Bliss", hex: "#C68642", finish: "satin", price: 449, popular: true },
  { id: "berry-bold", name: "Berry Bold", hex: "#6D2B6D", finish: "matte", price: 549 },
  { id: "rose-petal", name: "Rose Petal", hex: "#E8A0A0", finish: "glossy", price: 499, popular: true },
  { id: "mauve-magic", name: "Mauve Magic", hex: "#A0527A", finish: "satin", price: 519 },
  { id: "hot-pink", name: "Hot Pink", hex: "#E91E8C", finish: "glossy", price: 499 },
  { id: "dusty-rose", name: "Dusty Rose", hex: "#C4918E", finish: "matte", price: 449 },
  { id: "terracotta", name: "Terracotta", hex: "#C15A3A", finish: "satin", price: 519, popular: true },
  { id: "plum-perfect", name: "Plum Perfect", hex: "#4A1040", finish: "matte", price: 549 },
  { id: "peachy-keen", name: "Peachy Keen", hex: "#FFAD86", finish: "glossy", price: 449 },
  { id: "wine-night", name: "Wine Night", hex: "#6B1A2A", finish: "satin", price: 569, popular: true },
  { id: "bubblegum", name: "Bubblegum", hex: "#F48FB1", finish: "glossy", price: 429 },
  { id: "brick-lane", name: "Brick Lane", hex: "#8B3A2A", finish: "matte", price: 499 },
  { id: "mocha-latte", name: "Mocha Latte", hex: "#7B4F3A", finish: "satin", price: 519, popular: true },
  { id: "cherry-pop", name: "Cherry Pop", hex: "#C0392B", finish: "glossy", price: 499 },
  { id: "crimson-night", name: "Crimson Night", hex: "#7A0C2E", finish: "matte", price: 549, popular: true },
  { id: "peach-glow", name: "Peach Glow", hex: "#FBBF8A", finish: "glossy", price: 469 },
  { id: "deep-plum", name: "Deep Plum", hex: "#3B0764", finish: "matte", price: 549 },
  { id: "blush-pink", name: "Blush Pink", hex: "#F9A8C9", finish: "satin", price: 479, popular: true },
  { id: "sunset-orange", name: "Sunset Orange", hex: "#EA580C", finish: "glossy", price: 499 },
  { id: "chocolate-brown", name: "Chocolate Brown", hex: "#6B2A2A", finish: "matte", price: 519 },
  { id: "baby-rose", name: "Baby Rose", hex: "#F4B8C1", finish: "satin", price: 449 },
  { id: "vintage-red", name: "Vintage Red", hex: "#B91C1C", finish: "matte", price: 529, popular: true },
];

export const getShadeById = (id: string) => shades.find(s => s.id === id);