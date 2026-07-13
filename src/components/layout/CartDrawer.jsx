import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineXMark,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineBuildingStorefront,
} from 'react-icons/hi2';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import { useCart } from '@/store/useCart';
import { useLockScroll, useEscape } from '@/hooks';
import { formatPrice, cx } from '@/utils';
import { EASE } from '@/animations/variants';
import { TIP_PRESETS, TAX_LABEL } from '@/constants';

export default function CartDrawer() {
  const {
    items, isOpen, close, setQty, remove, clear,
    fulfilment, setFulfilment, tipRate, setTipRate,
    coupon, applyCoupon, clearCoupon, totals,
  } = useCart();

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const t = totals();

  useLockScroll(isOpen);
  useEscape(close, isOpen);

  const handleCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(code)) {
      setCode('');
      setCodeError('');
    } else {
      setCodeError('That code is not recognised.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[98] bg-obsidian/80 backdrop-blur-md"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="fixed right-0 top-0 z-[99] flex h-dvh w-full max-w-md flex-col border-l border-hairline bg-charcoal"
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <div>
                <h2 className="font-display text-2xl text-bone">Your Order</h2>
                <p className="text-[11px] uppercase tracking-[0.2em] text-faint">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close order"
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted transition-all hover:border-gold hover:text-gold"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <HiOutlineShoppingBag className="h-10 w-10 text-graphite" />
                <p className="font-display text-2xl text-bone">Nothing here yet</p>
                <p className="text-sm text-muted">
                  The kitchen is ready when you are.
                </p>
                <Button to="/menu" variant="outline" onClick={close} className="mt-2">
                  Browse the Menu
                </Button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6 no-scrollbar">
                  {/* Fulfilment */}
                  <div className="grid grid-cols-2 gap-2 rounded-input border border-hairline p-1.5">
                    {[
                      { id: 'delivery', label: 'Delivery', icon: HiOutlineTruck },
                      { id: 'pickup', label: 'Pickup', icon: HiOutlineBuildingStorefront },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFulfilment(id)}
                        aria-pressed={fulfilment === id}
                        className={cx(
                          'flex items-center justify-center gap-2 rounded-[10px] py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-400',
                          fulfilment === id
                            ? 'bg-gold text-obsidian'
                            : 'text-muted hover:text-bone'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.article
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex gap-4 rounded-input border border-hairline bg-elevated/50 p-3"
                      >
                        <Image
                          src={item.image}
                          alt=""
                          ratio="1/1"
                          className="h-20 w-20 shrink-0 rounded-[10px]"
                          sizes="80px"
                        />

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate font-display text-lg text-bone">
                              {item.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 text-faint transition-colors hover:text-danger"
                            >
                              <HiOutlineTrash className="h-4 w-4" />
                            </button>
                          </div>

                          <span className="text-xs text-faint">
                            {formatPrice(item.price)} each
                          </span>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 rounded-full border border-hairline">
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty - 1)}
                                aria-label={`Decrease ${item.name}`}
                                className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:text-gold"
                              >
                                <HiOutlineMinus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs tabular-nums text-bone">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty + 1)}
                                aria-label={`Increase ${item.name}`}
                                className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:text-gold"
                              >
                                <HiOutlinePlus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-display text-lg text-gold">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>

                  {/* Coupon */}
                  <form onSubmit={handleCoupon} className="pt-2">
                    {coupon ? (
                      <div className="flex items-center justify-between rounded-input border border-success/40 bg-success/10 px-4 py-3">
                        <span className="text-xs text-success">
                          {coupon.code} applied — {coupon.rate * 100}% off
                        </span>
                        <button
                          type="button"
                          onClick={clearCoupon}
                          className="text-xs text-muted underline hover:text-bone"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2">
                          <input
                            value={code}
                            onChange={(e) => {
                              setCode(e.target.value);
                              setCodeError('');
                            }}
                            placeholder="Promotion code"
                            aria-label="Promotion code"
                            className="w-full rounded-input border border-hairline bg-obsidian/60 px-4 py-3 text-xs text-bone placeholder:text-faint focus:border-gold focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="shrink-0 rounded-input border border-hairline px-5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted transition-all hover:border-gold hover:text-gold"
                          >
                            Apply
                          </button>
                        </div>
                        {codeError && (
                          <p className="mt-2 text-xs text-danger">{codeError}</p>
                        )}
                        <p className="mt-2 text-[10px] text-faint">
                          Try MAISON10 · NOIR20 · WELCOME
                        </p>
                      </>
                    )}
                  </form>

                  {/* Tip */}
                  <div className="pt-2">
                    <p className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-muted">
                      Gratuity
                    </p>
                    <div className="flex gap-2">
                      {TIP_PRESETS.map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setTipRate(rate)}
                          aria-pressed={tipRate === rate}
                          className={cx(
                            'flex-1 rounded-full border py-2 text-[11px] tabular-nums transition-all duration-400',
                            tipRate === rate
                              ? 'border-gold bg-gold text-obsidian'
                              : 'border-hairline text-muted hover:border-gold/60 hover:text-bone'
                          )}
                        >
                          {rate === 0 ? 'None' : `${rate * 100}%`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <footer className="border-t border-hairline bg-obsidian/50 px-6 py-6">
                  <dl className="space-y-2.5 text-sm">
                    {[
                      ['Subtotal', t.subtotal],
                      coupon && ['Discount', -t.discount],
                      t.delivery > 0 && ['Delivery', t.delivery],
                      [TAX_LABEL, t.tax],
                      tipRate > 0 && ['Gratuity', t.tip],
                    ]
                      .filter(Boolean)
                      .map(([label, value]) => (
                        <div key={label} className="flex justify-between text-muted">
                          <dt>{label}</dt>
                          <dd className={cx('tabular-nums', value < 0 && 'text-success')}>
                            {value < 0 ? '−' : ''}
                            {formatPrice(Math.abs(value))}
                          </dd>
                        </div>
                      ))}

                    <div className="flex items-baseline justify-between border-t border-hairline pt-3.5">
                      <dt className="font-display text-xl text-bone">Total</dt>
                      <dd className="font-display text-3xl text-gilded tabular-nums">
                        {formatPrice(t.total)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 space-y-2.5">
                    <Button to="/checkout" full size="lg" onClick={close}>
                      Checkout
                    </Button>
                    <button
                      type="button"
                      onClick={clear}
                      className="w-full py-1 text-[11px] uppercase tracking-[0.18em] text-faint transition-colors hover:text-danger"
                    >
                      Empty order
                    </button>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
