// ─── TYPES ───────────────────────────────────────────────────────

export type Category =
  | 'concealer-stick'
  | 'jem-lipstick'
  | 'soft-matte'
  | 'glossy-liquid'
  | 'cream-blush'
  | 'highlighter'
  | 'mini-lipstick-set'
  | 'eyedeal-kajal'
  | 'primer'
  | 'eyeliner'
  | 'wedding-glitter'
  | 'makeup-remover'
  | 'chapstick-lipbalm'
  | 'liquid-blush'
  | 'lip-lustre'
  | 'mascara'
  | 'bridgerton'
  ;

export interface Product {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  hex: string;
  price: number;
  image: string;
  finish?: string;
  popular?: boolean;
  description?: string;
}

// ─── IMAGE BASE PATHS ────────────────────────────────────────────

const JEM_BASE        = '/images/jem-lipsticks/';
const CONCEALER_BASE  = '/images/concealer-stick/';
const MATTE_BASE      = '/images/soft-matte/';
const GLOSS_BASE      = '/images/glossy-liquid/';
const BLUSH_BASE      = '/images/cream-blush/';
const HIGH_BASE       = '/images/highlighter/';
const MINI_BASE       = '/images/mini-lipstick-set/';
const KAJAL_BASE      = '/images/eyedeal-kajal/';
const PRIMER_BASE     = '/images/primer/';
const LINER_BASE      = '/images/eyeliner/';
const WEDDING_BASE    = '/images/wedding-glitter/';
const REMOVER_BASE    = '/images/makeup-remover/';
const CHAPSTICK_BASE  = '/images/chapstick-lipbalm/';
const LIQBLUSH_BASE   = '/images/liquid-blush/';
const LUSTRE_BASE     = '/images/lip-lustre/';
const MASCARA_BASE    = '/images/mascara/';
const BRIDGERTON_BASE = '/images/bridgerton/';


// ─── JEM LIPSTICKS ───────────────────────────────────────────────

export const jemLipsticks: Product[] = [
  { id: 'star-ruby', name: 'Star Ruby', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#9B1B4A', price: 300, finish: 'satin', popular: true, image: `${JEM_BASE}star-ruby.png`, description: 'A deep magenta berry red with a satin finish.' },
  { id: 'agate', name: 'Agate', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#8B5E6A', price: 500, finish: 'satin', popular: true, image: `${JEM_BASE}agate.png`, description: 'A warm mauve brown with earthy undertones.' },
  { id: 'smithsonite', name: 'Smithsonite', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#C4907A', price: 350, finish: 'satin', image: `${JEM_BASE}smithsonite.png`, description: 'A soft nude pink perfect for everyday wear.' },
  { id: 'pink-mystic-topaz', name: 'Pink Mystic Topaz', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#C4527A', price: 450, finish: 'satin', popular: true, image: `${JEM_BASE}pink-mystic-topaz.png`, description: 'A bright fuchsia pink with a bold statement.' },
  { id: 'pink-sapphire', name: 'Pink Sapphire', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#B85C8A', price: 500, finish: 'satin', image: `${JEM_BASE}pink-sapphire.png`, description: 'A medium berry pink with a luxurious finish.' },
  { id: 'purple-jade', name: 'Purple Jade', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#9B7A8A', price: 500, finish: 'satin', image: `${JEM_BASE}purple-jade.png`, description: 'A dusty mauve purple for a sophisticated look.' },
  { id: 'purple-chalcedony', name: 'Purple Chalcedony', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#8B3A5A', price: 500, finish: 'satin', popular: true, image: `${JEM_BASE}purple-chalcedony.png`, description: 'A deep berry purple with rich pigment.' },
  { id: 'amethyst', name: 'Amethyst', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#9B6A7A', price: 500, finish: 'satin', image: `${JEM_BASE}amethyst.png`, description: 'A muted dusty rose purple inspired by the gemstone.' },
  { id: 'tigers-eye', name: "Tiger's Eye", category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#7A4A3A', price: 500, finish: 'satin', image: `${JEM_BASE}tigers-eye.png`, description: 'A deep warm brown with golden undertones.' },
  { id: 'choco-opal', name: 'Choco Opal', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#6A3A2A', price: 500, finish: 'satin', image: `${JEM_BASE}choco-opal.png`, description: 'A rich dark chocolate brown shade.' },
  { id: 'bauxite', name: 'Bauxite', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#9A6A72', price: 500, finish: 'satin', image: `${JEM_BASE}bauxite.png`, description: 'A rosy mauve nude with earthy warmth.' },
  { id: 'mali-garnet', name: 'Mali Garnet', category: 'jem-lipstick', categoryLabel: 'JEM Lipstick', hex: '#B8856A', price: 300, finish: 'satin', image: `${JEM_BASE}mali-garnet.png`, description: 'A warm peachy nude with garnet warmth.' },
];

// ─── SOFT MATTE LIQUID LIPSTICKS ─────────────────────────────────

export const softMatteLipsticks: Product[] = [
  { id: 'honey-chill', name: 'Honey Chill', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#D4504A', price: 350, finish: 'matte', popular: true, image: `${MATTE_BASE}honey-chill.png`, description: 'A warm coral red that is effortlessly cool.' },
  { id: 'seriously-yes', name: 'Seriously Yes', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#C4506A', price: 300, finish: 'matte', image: `${MATTE_BASE}seriously-yes.png`, description: 'A berry pink that says yes to everything.' },
  { id: 'cant-believe-it', name: "Can't Believe It", category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#C4907A', price: 500, finish: 'matte', image: `${MATTE_BASE}cant-believe-it.png`, description: 'A soft dusty rose nude that surprises.' },
  { id: 'babe-awesome', name: 'Babe Awesome', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#C47A6A', price: 500, finish: 'matte', popular: true, image: `${MATTE_BASE}babe-awesome.png`, description: 'A warm peachy nude for the awesome babe.' },
  { id: 'you-sure', name: 'You Sure', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#C4603A', price: 400, finish: 'matte', image: `${MATTE_BASE}you-sure.png`, description: 'A bold burnt coral orange for the daring.' },
  { id: 'omg-really', name: 'OMG Really', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#A03A5A', price: 500, finish: 'matte', popular: true, image: `${MATTE_BASE}omg-really.png`, description: 'A deep fuchsia berry that stops you in your tracks.' },
  { id: 'hahaha-lol', name: 'Hahaha LOL', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#C4956A', price: 300, finish: 'matte', image: `${MATTE_BASE}hahaha-lol.png`, description: 'A fun warm nude beige that keeps it light.' },
  { id: 'my-bae', name: 'My Bae', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#A06070', price: 500, finish: 'matte', image: `${MATTE_BASE}my-bae.png`, description: 'A muted mauve pink dedicated to your bae.' },
  { id: 'i-love-it', name: 'I Love It', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#7A2A3A', price: 500, finish: 'matte', popular: true, image: `${MATTE_BASE}i-love-it.png`, description: 'A deep wine berry you will absolutely love.' },
  { id: 'stop-ittt', name: 'Stop Ittt', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#8B2A1A', price: 500, finish: 'matte', image: `${MATTE_BASE}stop-ittt.png`, description: 'A rich burnt red so good you want it to stop.' },
  { id: 'just-kidding', name: 'Just Kidding', category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#6B1A2A', price: 350, finish: 'matte', image: `${MATTE_BASE}just-kidding.png`, description: 'A deep dark wine — no really, we are not kidding.' },
  { id: 'thats-nuts', name: "That's Nuts", category: 'soft-matte', categoryLabel: 'Soft Matte Liquid', hex: '#4A1520', price: 500, finish: 'matte', popular: true, image: `${MATTE_BASE}thats-nuts.png`, description: 'A dark chocolate plum that is absolutely nuts.' },
];

// ─── GLOSSY LIQUID LIPSTICKS ──────────────────────────────────────

export const glossyLipsticks: Product[] = [
  { id: 'sassy', name: 'Sassy', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#A8705A', price: 350, finish: 'glossy', popular: true, image: `${GLOSS_BASE}sassy.png`, description: 'A warm nude brown gloss with serious attitude.' },
  { id: 'softy', name: 'Softy', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#B8756A', price: 350, finish: 'glossy', image: `${GLOSS_BASE}softy.png`, description: 'A dusty rose nude gloss for soft days.' },
  { id: 'baby', name: 'Baby', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#D4907A', price: 350, finish: 'glossy', image: `${GLOSS_BASE}baby.png`, description: 'A sheer soft pink as sweet as it gets.' },
  { id: 'mixie', name: 'Mixie', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#9B3A3A', price: 350, finish: 'glossy', popular: true, image: `${GLOSS_BASE}mixie.png`, description: 'A deep berry red gloss with high shine.' },
  { id: 'cheeky', name: 'Cheeky', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#C4704A', price: 350, finish: 'glossy', image: `${GLOSS_BASE}cheeky.png`, description: 'A warm terracotta nude with a cheeky shine.' },
  { id: 'boldy', name: 'Boldy', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#C01040', price: 350, finish: 'glossy', popular: true, image: `${GLOSS_BASE}boldy.png`, description: 'A bright cherry red for the bold and beautiful.' },
  { id: 'smarty', name: 'Smarty', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#A03A8A', price: 350, finish: 'glossy', image: `${GLOSS_BASE}smarty.png`, description: 'A vibrant orchid purple for the smart one.' },
  { id: 'crazy', name: 'Crazy', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#B85060', price: 280, finish: 'glossy', image: `${GLOSS_BASE}crazy.png`, description: 'A warm rose berry for the crazy in love.' },
  { id: 'lovely', name: 'Lovely', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#8B2A3A', price: 300, finish: 'glossy', image: `${GLOSS_BASE}lovely.png`, description: 'A deep cranberry red that is simply lovely.' },
  { id: 'maddy', name: 'Maddy', category: 'glossy-liquid', categoryLabel: 'Glossy Liquid', hex: '#8B2040', price: 350, finish: 'glossy', popular: true, image: `${GLOSS_BASE}maddy.png`, description: 'A rich berry wine with irresistible shine.' },
];

// ─── CREAM BLUSH ─────────────────────────────────────────────────

export const creamBlushes: Product[] = [
  { id: 'you-are-enough', name: 'You Are Enough', category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#E8758A', price: 250, popular: true, image: `${BLUSH_BASE}you-are-enough.png`, description: 'A soft bubblegum pink blush that reminds you.' },
  { id: 'believe-in-yourself', name: 'Believe In Yourself', category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#E84040', price: 250, popular: true, image: `${BLUSH_BASE}believe-in-yourself.png`, description: 'A bright coral red blush full of confidence.' },
  { id: 'live-simply', name: 'Live Simply', category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#C47070', price: 250, image: `${BLUSH_BASE}live-simply.png`, description: 'A warm rosy mauve for effortless everyday beauty.' },
  { id: 'fearlessly-authentic', name: 'Fearlessly Authentic', category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#C46050', price: 200, image: `${BLUSH_BASE}fearlessly-authentic.png`, description: 'A warm terracotta coral for the fearless soul.' },
  { id: 'its-now-or-never', name: "It's Now Or Never", category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#C478B0', price: 250, popular: true, image: `${BLUSH_BASE}its-now-or-never.png`, description: 'A soft lilac pink for those who seize the moment.' },
  { id: 'seize-the-day', name: 'Seize The Day', category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#E8807A', price: 250, image: `${BLUSH_BASE}seize-the-day.png`, description: 'A light coral pink that brightens every day.' },
  { id: 'bring-it-on', name: 'Bring It On', category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#D42070', price: 250, popular: true, image: `${BLUSH_BASE}bring-it-on.png`, description: 'A bold hot fuchsia for those who bring it.' },
  { id: 'i-am-unstoppable', name: 'I Am Unstoppable', category: 'cream-blush', categoryLabel: 'Cream Blush', hex: '#8030A0', price: 250, image: `${BLUSH_BASE}i-am-unstoppable.png`, description: 'A rich violet purple for the unstoppable you.' },
];

// ─── HIGHLIGHTER ─────────────────────────────────────────────────

export const highlighters: Product[] = [
  { id: 'high-blonzer', name: 'Blonzer', category: 'highlighter', categoryLabel: 'Highlighter', hex: '#D4A574', price: 300, image: `${HIGH_BASE}blonzer.png`, description: 'A warm bronzer-highlighter blend for a sun-kissed glow.' },
  { id: 'high-warm-silver', name: 'Warm Silver', category: 'highlighter', categoryLabel: 'Highlighter', hex: '#C0C0C0', price: 300, popular: true, image: `${HIGH_BASE}warm-silver.png`, description: 'A luminous warm silver for a cool radiant glow.' },
  { id: 'high-gold', name: 'Gold', category: 'highlighter', categoryLabel: 'Highlighter', hex: '#D4AF37', price: 300, popular: true, image: `${HIGH_BASE}gold.png`, description: 'A rich golden highlighter for ultimate luminosity.' },
  { id: 'high-rose-gold', name: 'Rose Gold', category: 'highlighter', categoryLabel: 'Highlighter', hex: '#B76E79', price: 300, popular: true, image: `${HIGH_BASE}rose-gold.png`, description: 'A dreamy rose gold shimmer for a romantic glow.' },
];

// ─── MINI LIPSTICK SET ───────────────────────────────────────────

export const miniLipstickSets: Product[] = [
  // Products to be added later
];

// ─── EYEDEAL KAJAL ───────────────────────────────────────────────

export const eyedealKajal: Product[] = [
  { id: 'kajal-black', name: 'Black', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#000000', price: 300, popular: true, image: `${KAJAL_BASE}black.png`, description: 'Intense jet black kajal for defined eyes.' },
  { id: 'kajal-brown', name: 'Brown', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#4A2C0A', price: 300, image: `${KAJAL_BASE}brown.png`, description: 'A rich brown kajal for a soft smoky look.' },
  { id: 'kajal-blue', name: 'Blue', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#1A2A6B', price: 300, image: `${KAJAL_BASE}blue.png`, description: 'A deep blue kajal for a bold eye look.' },
  { id: 'kajal-turquoise', name: 'Turquoise', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#00CED1', price: 300, image: `${KAJAL_BASE}turquoise.png`, description: 'A vibrant turquoise kajal for a pop of color.' },
  { id: 'kajal-sea-green', name: 'Sea Green', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#2E8B57', price: 300, image: `${KAJAL_BASE}sea-green.png`, description: 'A fresh sea green kajal for an ocean-inspired look.' },
  { id: 'kajal-nude', name: 'Nude', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#C4907A', price: 200, image: `${KAJAL_BASE}nude.png`, description: 'A subtle nude kajal to brighten and open the eyes.' },
  { id: 'kajal-white', name: 'White', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#F5F5F5', price: 200, image: `${KAJAL_BASE}white.png`, description: 'A bright white kajal for a wide-eyed effect.' },
  { id: 'kajal-aqua-blue', name: 'Aqua Blue', category: 'eyedeal-kajal', categoryLabel: 'Eyedeal Kajal', hex: '#00BFFF', price: 250, image: `${KAJAL_BASE}aqua-blue.png`, description: 'A stunning aqua blue kajal for a fresh look.' },
];

// ─── PRIMER ──────────────────────────────────────────────────────

export const primers: Product[] = [
  { id: 'primer-original', name: 'Primer', category: 'primer', categoryLabel: 'Primer', hex: '#F5DEB3', price: 400, popular: true, image: `${PRIMER_BASE}primer.png`, description: 'A smoothing primer for a flawless makeup base.' },
];

// ─── EYELINER ────────────────────────────────────────────────────

export const eyeliners: Product[] = [
  { id: 'liner-black', name: 'Black', category: 'eyeliner', categoryLabel: 'Eyeliner', hex: '#000000', price: 300, popular: true, image: `${LINER_BASE}black.png`, description: 'A jet black eyeliner for precise, bold definition.' },
];

// ─── WEDDING EDITION GLITTER LIPSTICKS ───────────────────────────

export const weddingGlitterLipsticks: Product[] = [
  { id: 'wed-pillowtalk', name: 'Pillowtalk', category: 'wedding-glitter', categoryLabel: 'Wedding Edition Glitter', hex: '#C4527A', price: 600, popular: true, image: `${WEDDING_BASE}pillowtalk.png`, description: 'A romantic rosy pink with bridal glitter.' },
  { id: 'wed-be-mine', name: 'Be Mine', category: 'wedding-glitter', categoryLabel: 'Wedding Edition Glitter', hex: '#E84040', price: 600, popular: true, image: `${WEDDING_BASE}be-mine.png`, description: 'A passionate red with festive sparkle.' },
  { id: 'wed-doll-up', name: 'Doll Up', category: 'wedding-glitter', categoryLabel: 'Wedding Edition Glitter', hex: '#F48FB1', price: 600, image: `${WEDDING_BASE}doll-up.png`, description: 'A soft baby pink with a dazzling glitter finish.' },
  { id: 'wed-tantrum', name: 'Tantrum', category: 'wedding-glitter', categoryLabel: 'Wedding Edition Glitter', hex: '#8B3A5A', price: 600, image: `${WEDDING_BASE}tantrum.png`, description: 'A bold berry with electrifying glitter.' },
  { id: 'wed-jewel', name: 'Jewel', category: 'wedding-glitter', categoryLabel: 'Wedding Edition Glitter', hex: '#D4AF37', price: 600, popular: true, image: `${WEDDING_BASE}jewel.png`, description: 'A golden jewel tone for the ultimate bridal look.' },
  { id: 'wed-desire', name: 'Desire', category: 'wedding-glitter', categoryLabel: 'Wedding Edition Glitter', hex: '#9B1B4A', price: 600, image: `${WEDDING_BASE}desire.png`, description: 'A deep magenta with irresistible glitter shimmer.' },
];

// ─── MAKE UP REMOVER ─────────────────────────────────────────────

export const makeupRemovers: Product[] = [
  { id: 'makeup-remover', name: 'Make Up Remover', category: 'makeup-remover', categoryLabel: 'Make Up Remover', hex: '#F5F5DC', price: 400, image: `${REMOVER_BASE}makeup-remover.png`, description: 'A gentle yet effective makeup remover for all skin types.' },
];

// ─── CHAPSTICK LIPBALM ───────────────────────────────────────────

export const chapstickLipbalms: Product[] = [
  { id: 'chapstick-cherry', name: 'Cherry Collection', category: 'chapstick-lipbalm', categoryLabel: 'Chapstick Lipbalm', hex: '#C0392B', price: 2000, popular: true, image: `${CHAPSTICK_BASE}cherry-collection.png`, description: 'A luscious cherry lip balm collection for soft, kissable lips.' },
  { id: 'chapstick-watermelon', name: 'Watermelon', category: 'chapstick-lipbalm', categoryLabel: 'Chapstick Lipbalm', hex: '#FC6C85', price: 150, image: `${CHAPSTICK_BASE}watermelon.png`, description: 'A refreshing watermelon lip balm for juicy lips.' },
  { id: 'chapstick-cappuccino', name: 'Cappuccino', category: 'chapstick-lipbalm', categoryLabel: 'Chapstick Lipbalm', hex: '#7B4F3A', price: 150, image: `${CHAPSTICK_BASE}cappuccino.png`, description: 'A warm cappuccino scented lip balm for soft lips.' },
];

// ─── LIQUID BLUSH ────────────────────────────────────────────────

export const liquidBlushes: Product[] = [
  { id: 'liqblush-i-am-classic', name: 'I Am Classic', category: 'liquid-blush', categoryLabel: 'Liquid Blush', hex: '#E8758A', price: 200, popular: true, image: `${LIQBLUSH_BASE}i-am-classic.png`, description: 'A classic soft pink liquid blush for a natural flush.' },
];

// ─── LIP LUSTRE ──────────────────────────────────────────────────

export const lipLustres: Product[] = [
  { id: 'lustre-ph-changing', name: 'PH Colour Changing', category: 'lip-lustre', categoryLabel: 'Lip Lustre', hex: '#FF69B4', price: 300, popular: true, image: `${LUSTRE_BASE}ph-colour-changing.png`, description: 'A magical pH-changing lip lustre that adapts to your unique lip color.' },
];

// ─── MASCARA ─────────────────────────────────────────────────────

export const mascaras: Product[] = [
  { id: 'mascara-black', name: 'Black', category: 'mascara', categoryLabel: 'Mascara', hex: '#000000', price: 600, popular: true, image: `${MASCARA_BASE}black.png`, description: 'A volumizing black mascara for bold, fluttery lashes.' },
];

// ─── BRIDGERTON COLLECTION ───────────────────────────────────────

export const bridgertonCollection: Product[] = [
  { id: 'brid-violet', name: 'Violet', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#8030A0', price: 1800, popular: true, image: `${BRIDGERTON_BASE}violet.png`, description: 'Inspired by Lady Violet Bridgerton — regal purple elegance.' },
  { id: 'brid-penelope', name: 'Penelope', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#E8603C', price: 2000, image: `${BRIDGERTON_BASE}penelope.png`, description: 'Inspired by Penelope Featherington — bright and bold.' },
  { id: 'brid-marina', name: 'Marina', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#1A6B4A', price: 1500, image: `${BRIDGERTON_BASE}marina.png`, description: 'Inspired by Marina Thompson — deep and mysterious.' },
  { id: 'brid-daphne', name: 'Daphne', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#C4527A', price: 2000, popular: true, image: `${BRIDGERTON_BASE}daphne.png`, description: 'Inspired by Daphne Bridgerton — classic rosy pink.' },
  { id: 'brid-hyacinth', name: 'Hyacinth', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#4B0082', price: 2000, image: `${BRIDGERTON_BASE}hyacinth.png`, description: 'Inspired by Hyacinth Bridgerton — deep violet charm.' },
  { id: 'brid-francesca', name: 'Francesca', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#B85C8A', price: 2000, image: `${BRIDGERTON_BASE}francesca.png`, description: 'Inspired by Francesca Bridgerton — soft and refined.' },
  { id: 'brid-eloise', name: 'Eloise', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#6B8E23', price: 2000, image: `${BRIDGERTON_BASE}eloise.png`, description: 'Inspired by Eloise Bridgerton — unconventional and bold.' },
  { id: 'brid-charlotte', name: 'Charlotte', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#D4AF37', price: 2000, popular: true, image: `${BRIDGERTON_BASE}charlotte.png`, description: 'Inspired by Queen Charlotte — golden and majestic.' },
  { id: 'brid-danbury', name: 'Danbury', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#8B0000', price: 2000, image: `${BRIDGERTON_BASE}danbury.png`, description: 'Inspired by Lady Danbury — powerful and rich.' },
  { id: 'brid-cressida', name: 'Cressida', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#FF6347', price: 2000, image: `${BRIDGERTON_BASE}cressida.png`, description: 'Inspired by Cressida Cowper — daring and fiery.' },
  { id: 'brid-edwina', name: 'Edwina', category: 'bridgerton', categoryLabel: 'Bridgerton Collection', hex: '#FFD700', price: 1800, image: `${BRIDGERTON_BASE}edwina.png`, description: 'Inspired by Edwina Sharma — radiant and golden.' },
];

// ─── CONCEALER STICKS ────────────────────────────────────────────

export const concealerSticks: Product[] = [
  { id: 'con-chai', name: 'Chai', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#C4907A', price: 1200, image: `${CONCEALER_BASE}chai.png`, description: 'A warm chai tone for medium skin.' },
  { id: 'con-sand', name: 'Sand', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#D2B48C', price: 1200, image: `${CONCEALER_BASE}sand.png`, description: 'A light sandy beige for fair to light skin.' },
  { id: 'con-buff', name: 'Buff', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#C8A882', price: 1200, image: `${CONCEALER_BASE}buff.png`, description: 'A neutral buff tone for light to medium skin.' },
  { id: 'con-cashew', name: 'Cashew', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#B8906A', price: 1200, image: `${CONCEALER_BASE}cashew.png`, description: 'A warm cashew tone for medium skin.' },
  { id: 'con-latte', name: 'Latte', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#A07850', price: 1200, image: `${CONCEALER_BASE}latte.png`, description: 'A creamy latte tone for medium to tan skin.' },
  { id: 'con-beige', name: 'Beige', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#F5DEB3', price: 1200, popular: true, image: `${CONCEALER_BASE}beige.png`, description: 'A classic beige for fair skin tones.' },
  { id: 'con-fawn', name: 'Fawn', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#C4A882', price: 1200, image: `${CONCEALER_BASE}fawn.png`, description: 'A soft fawn tone for light to medium skin.' },
  { id: 'con-mand', name: 'Mand', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#8B6340', price: 1000, image: `${CONCEALER_BASE}mand.png`, description: 'A deeper mand tone for medium to tan skin.' },
  { id: 'con-peach', name: 'Peach', category: 'concealer-stick', categoryLabel: 'Concealer Stick', hex: '#FFAD86', price: 1000, image: `${CONCEALER_BASE}peach.png`, description: 'A peachy corrector for brightening under eyes.' },
];

// ─── ALL PRODUCTS COMBINED ────────────────────────────────────────

export const allProducts: Product[] = [
  ...concealerSticks,
  ...jemLipsticks,
  ...softMatteLipsticks,
  ...glossyLipsticks,
  ...creamBlushes,
  ...highlighters,
  ...miniLipstickSets,
  ...eyedealKajal,
  ...primers,
  ...eyeliners,
  ...weddingGlitterLipsticks,
  ...makeupRemovers,
  ...chapstickLipbalms,
  ...liquidBlushes,
  ...lipLustres,
  ...mascaras,
  ...bridgertonCollection,
  ];

// ─── BACKWARD-COMPATIBLE ALIASES ─────────────────────────────────

export const lipsticks = jemLipsticks;
export const foundations: Product[] = [];
export const blushes = creamBlushes;
export const eyeshadows: Product[] = [];
export const kits: Product[] = [];

// ─── CATEGORY CONFIG ──────────────────────────────────────────────

export const CATEGORY_CONFIG = {
  'concealer-stick':   { label: 'Concealer Sticks',                  description: 'Full coverage concealer sticks in inclusive shades',      finish: 'Matte' },
  'jem-lipstick':      { label: 'JEM Lipsticks',                    description: 'Luxurious bullet lipsticks with gemstone-inspired shades', finish: 'Satin' },
  'soft-matte':        { label: 'Soft Matte Liquid',                 description: 'Long-lasting soft matte liquid lipsticks with fun names',  finish: 'Matte' },
  'glossy-liquid':     { label: 'Glossy Liquid',                     description: 'High-shine glossy liquid lipsticks for plump lips',        finish: 'Glossy' },
  'cream-blush':       { label: 'Cream Blush',                       description: 'Creamy blush with empowering names and beautiful colors',  finish: 'Cream' },
  'highlighter':       { label: 'Highlighter',                       description: 'Luminous highlighters for a radiant, glowing complexion',  finish: 'Shimmer' },
  'mini-lipstick-set': { label: 'Mini Lipstick Set',                 description: 'Curated mini lipstick sets — perfect for gifting',        finish: 'Mixed' },
  'eyedeal-kajal':     { label: 'Eyedeal Kajal',                     description: 'Richly pigmented kajal in a spectrum of shades',          finish: 'Kohl' },
  'primer':            { label: 'Primer',                            description: 'Smoothing primer for a flawless, long-lasting base',      finish: 'Matte' },
  'eyeliner':          { label: 'Eyeliner',                          description: 'Precise eyeliner for bold, defined eyes',                 finish: 'Matte' },
  'wedding-glitter':   { label: 'Wedding Edition Glitter Lipsticks', description: 'Luxe glitter lipsticks for your special day',             finish: 'Glitter' },
  'makeup-remover':    { label: 'Make Up Remover',                   description: 'Gentle and effective makeup remover for all skin types',   finish: 'Liquid' },
  'chapstick-lipbalm': { label: 'Chapstick Lipbalm',                 description: 'Nourishing lip balms in delicious flavors',               finish: 'Balm' },
  'liquid-blush':      { label: 'Liquid Blush',                      description: 'Buildable liquid blush for a fresh, natural flush',       finish: 'Liquid' },
  'lip-lustre':        { label: 'Lip Lustre',                        description: 'High-shine lip lustre with a color-changing formula',     finish: 'Glossy' },
  'mascara':           { label: 'Mascara',                           description: 'Volumizing mascara for bold, dramatic lashes',            finish: 'Matte' },
  'bridgerton':        { label: 'Bridgerton Collection',             description: 'Inspired by the characters of Bridgerton — luxe & bold',  finish: 'Mixed' },
  };

// ─── HELPERS ─────────────────────────────────────────────────────

export const getProductById = (id: string) =>
  allProducts.find(p => p.id === id);

export const getProductsByCategory = (category: Category) =>
  allProducts.filter(p => p.category === category);

export const getPopularProducts = () =>
  allProducts.filter(p => p.popular);