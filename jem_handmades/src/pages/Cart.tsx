import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_LABELS: Record<string, string> = {
  lipstick: 'Lipstick', foundation: 'Foundation',
  eyeliner: 'Eyeliner', blush: 'Blush',
  eyeshadow: 'Eyeshadow', kit: 'Kit',
};

export default function Cart() {
const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', state: '', pincode: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!address.name.trim())                          e.name    = 'Name is required';
    if (!address.phone.trim() || address.phone.length < 10) e.phone = 'Valid phone number required';
    if (!address.street.trim())                        e.street  = 'Street address is required';
    if (!address.city.trim())                          e.city    = 'City is required';
    if (!address.state.trim())                         e.state   = 'State is required';
    if (!address.pincode.trim() || address.pincode.length < 6) e.pincode = 'Valid pincode required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) return;

    let message = "Hello JEM  Handmades!\n\n"
    message += "DELIVERY ADDRESS:\n"
    message += "-----------------\n"
    message += `Name: ${address.name}\n`
    message += `Phone: ${address.phone}\n`
    message += `Street: ${address.street}\n`
    message += `City: ${address.city}\n`
    message += `State: ${address.state}\n`
    message += `Pincode: ${address.pincode}\n`
    message += "-----------------\n\n"
    message += "ORDER DETAILS:\n"
    message += "-----------------\n"

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`
      message += `   Category: ${CATEGORY_LABELS[item.product.category]}\n`
      if (item.product.finish) message += `   Finish: ${item.product.finish}\n`
     
      message += `   Quantity: ${item.quantity}\n`
     
    })

    message += "-----------------\n\n"
    message += "Please confirm my order and share payment details.\n\n"
    message += "Thank you!"

    window.open(`https://wa.me/917427068253?text=${encodeURIComponent(message)}`, '_blank');
    setShowSuccess(true);
    clearCart();
  };

  if (showSuccess) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-20 w-20 text-accent" />
          <h2 className="font-heading text-2xl font-bold text-foreground">Order Placed!</h2>
          <p className="text-muted-foreground">Thank you for shopping with JEM  Handmades. We will contact you shortly.</p>
          <Link to="/shop" className="mt-4 rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground">Continue Shopping</Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h2 className="font-heading text-xl font-bold text-foreground">Your cart is empty</h2>
          <Link to="/shop" className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground">Start Shopping</Link>
        </div>
      </main>
    );
  }

  const field = (key: keyof typeof address, label: string, placeholder: string, type = 'text', maxLength?: number, colSpan = false) => (
    <div className={`flex flex-col gap-1 ${colSpan ? 'sm:col-span-2' : ''}`}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={address[key]}
        maxLength={maxLength}
        onChange={e => setAddress({ ...address, [key]: e.target.value })}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
      />
      {errors[key] && <span className="text-xs text-red-500">{errors[key]}</span>}
    </div>
  );

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-3xl font-bold text-foreground">Your Cart</h1>

        {/* Cart Items */}
        <div className="mt-8 space-y-4">
          <AnimatePresence>
            {items.map(item => (
              <motion.div key={item.product.id} layout exit={{ opacity: 0, x: -50 }}
  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border border-border bg-card p-4"
>
                {/* Color swatch */}
                <div className="h-12 w-12 shrink-0 rounded-lg border-2 border-border overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.style.backgroundColor = item.product.hex;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0 w-full">
  <h3 className="font-heading text-sm font-semibold text-card-foreground break-words">{item.product.name}</h3>
  <p className="text-xs text-muted-foreground capitalize break-words">
                    {CATEGORY_LABELS[item.product.category]}
                    {item.product.finish ? ` · ${item.product.finish}` : ''}
                    {' · '}Rs.{item.product.price}
                  </p>
                </div>
<div className="flex items-center gap-2 flex-wrap">                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Plus size={14} />
                  </button>
                </div>
                <span className="w-20 text-right text-sm font-bold text-foreground">
                  Rs.{(item.product.price * item.quantity).toFixed(2)}
                </span>
                <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Delivery Address Form */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">Delivery Address</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {field('name',    'Full Name',       'Enter your full name')}
            {field('phone',   'Phone Number',    'Enter your phone number', 'tel')}
            {field('street',  'Street Address',  'House no., Street, Area', 'text', undefined, true)}
            {field('city',    'City',            'Enter your city')}
            {field('state',   'State',           'Enter your state')}
            {field('pincode', 'Pincode',         '6 digit pincode', 'text', 6)}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            
            <div className="flex justify-between border-t border-border pt-2 font-heading text-lg font-bold text-card-foreground">
              <span>Total</span><span>Rs.{subtotal.toFixed(2)}</span>

            </div>
          </div>
          <button onClick={handleCheckout} className="mt-6 w-full rounded-md bg-accent py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90">
            Place Order
          </button>
        </div>

      </div>
    </main>
  );
}