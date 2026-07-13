import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TAX_RATE, DELIVERY_FEE, COUPONS } from '@/constants';

/**
 * Cart + checkout state. Totals are derived here rather than in components so
 * the drawer, the checkout page and the order summary can never disagree.
 */
export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      fulfilment: 'delivery', // 'delivery' | 'pickup'
      tipRate: 0.125,
      coupon: null, // { code, rate }

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      add: (dish, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === dish.id);
          const items = existing
            ? s.items.map((i) =>
                i.id === dish.id ? { ...i, qty: i.qty + qty } : i
              )
            : [
                ...s.items,
                {
                  id: dish.id,
                  name: dish.name,
                  price: dish.price,
                  image: dish.image,
                  category: dish.category,
                  qty,
                },
              ];
          return { items, isOpen: true };
        }),

      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      setQty: (id, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      clear: () => set({ items: [], coupon: null }),

      setFulfilment: (fulfilment) => set({ fulfilment }),
      setTipRate: (tipRate) => set({ tipRate }),

      /** Returns true when the code was recognised. */
      applyCoupon: (code) => {
        const key = code.trim().toUpperCase();
        const rate = COUPONS[key];
        if (!rate) return false;
        set({ coupon: { code: key, rate } });
        return true;
      },
      clearCoupon: () => set({ coupon: null }),

      count: () => get().items.reduce((n, i) => n + i.qty, 0),

      totals: () => {
        const { items, coupon, fulfilment, tipRate } = get();
        const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
        const discount = coupon ? subtotal * coupon.rate : 0;
        const delivery =
          fulfilment === 'delivery' && items.length ? DELIVERY_FEE : 0;
        const taxable = subtotal - discount;
        const tax = taxable * TAX_RATE;
        const tip = taxable * tipRate;
        const total = taxable + tax + tip + delivery;
        return { subtotal, discount, delivery, tax, tip, total };
      },
    }),
    { name: 'maison-noir-cart', partialize: (s) => ({ items: s.items, coupon: s.coupon }) }
  )
);
