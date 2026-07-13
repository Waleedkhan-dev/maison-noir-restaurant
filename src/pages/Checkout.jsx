import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCheck,
  HiOutlineShoppingBag,
  HiOutlineCreditCard,
  HiOutlineDevicePhoneMobile,
  HiOutlineBanknotes,
  HiOutlineTruck,
  HiOutlineBuildingStorefront,
  HiOutlineArrowLongRight,
} from 'react-icons/hi2';
import Seo from '@/components/Seo';
import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { useCart } from '@/store/useCart';
import { placeOrder } from '@/services/api';
import { formatPrice, cx } from '@/utils';
import { TIP_PRESETS, TAX_LABEL } from '@/constants';
import { stagger, fadeUp, EASE } from '@/animations/variants';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card', hint: 'Visa · Mastercard · Amex', icon: HiOutlineCreditCard },
  { id: 'apple', label: 'Apple Pay', hint: 'One touch', icon: HiOutlineDevicePhoneMobile },
  { id: 'google', label: 'Google Pay', hint: 'One touch', icon: HiOutlineDevicePhoneMobile },
  { id: 'cash', label: 'Cash', hint: 'On delivery', icon: HiOutlineBanknotes },
];

const WINDOWS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '19:00', label: 'This evening — 19:00' },
  { value: '20:00', label: 'This evening — 20:00' },
  { value: '21:00', label: 'This evening — 21:00' },
];

export default function Checkout() {
  const {
    items, fulfilment, setFulfilment, tipRate, setTipRate, coupon, totals, clear,
  } = useCart();

  const [method, setMethod] = useState('card');
  const [order, setOrder] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { window: 'asap' } });

  const t = totals();

  const onSubmit = async (data) => {
    const result = await placeOrder({ ...data, method, fulfilment, items });
    setOrder(result);
    clear();
  };

  /* Confirmation wins over the empty state — clear() has already run by then. */
  if (order) {
    return (
      <>
        <Seo title="Order Confirmed" noindex />
        <section className="section pt-40">
          <motion.div
            variants={stagger(0.1, 0.15)}
            initial="hidden"
            animate="show"
            className="shell flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid h-24 w-24 place-items-center rounded-full border border-gold/40 bg-gold/10"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 18 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-gold"
              >
                <HiOutlineCheck className="h-8 w-8 stroke-2 text-obsidian" />
              </motion.span>
            </motion.div>

            <motion.span variants={fadeUp} className="eyebrow mt-9">
              Order Received
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 max-w-2xl text-[2.5rem] leading-[1.05] sm:text-6xl"
            >
              The kitchen has
              <br />
              <span className="text-gilded">your order.</span>
            </motion.h1>

            <motion.dl
              variants={fadeUp}
              className="mt-12 grid w-full max-w-md grid-cols-2 gap-px overflow-hidden rounded-card border border-hairline bg-hairline"
            >
              <div className="bg-charcoal px-6 py-7">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-faint">
                  Reference
                </dt>
                <dd className="mt-2 font-display text-2xl text-bone">{order.reference}</dd>
              </div>
              <div className="bg-charcoal px-6 py-7">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-faint">
                  Arriving in
                </dt>
                <dd className="mt-2 font-display text-2xl text-gilded tabular-nums">
                  {order.eta} min
                </dd>
              </div>
            </motion.dl>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-md text-sm leading-[1.85] text-muted"
            >
              A confirmation is on its way to your inbox. This is a demonstration — no
              payment has been taken and no food is on its way.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-11 flex flex-col gap-3 xs:flex-row xs:gap-4"
            >
              <Button to="/contact" size="lg" icon={<HiOutlineArrowLongRight />}>
                Track Order
              </Button>
              <Button to="/menu" size="lg" variant="outline">
                Back to Menu
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <Seo title="Checkout" noindex />
        <section className="section pt-40">
          <motion.div
            variants={stagger(0.09, 0.1)}
            initial="hidden"
            animate="show"
            className="shell flex flex-col items-center text-center"
          >
            <motion.span variants={fadeUp}>
              <HiOutlineShoppingBag className="h-12 w-12 text-graphite" aria-hidden="true" />
            </motion.span>

            <motion.h1 variants={fadeUp} className="mt-8 text-[2.5rem] sm:text-6xl">
              Your table is empty.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-sm text-sm leading-[1.85] text-muted sm:text-base"
            >
              Nothing has been ordered yet. The kitchen is lit and the pass is clear —
              begin wherever you like.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-11">
              <Button to="/menu" size="lg" icon={<HiOutlineArrowLongRight />}>
                Browse the Menu
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </>
    );
  }

  const isDelivery = fulfilment === 'delivery';

  return (
    <>
      <Seo title="Checkout" noindex />

      <section className="section pt-36 sm:pt-40" aria-labelledby="checkout-title">
        <div className="shell">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            <span className="eyebrow">Checkout</span>
          </div>
          <h1 id="checkout-title" className="mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl">
            Almost <span className="text-gilded">served.</span>
          </h1>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            {/* ---------------------------------------------------------- Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
              <fieldset>
                <legend className="eyebrow">Contact</legend>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full name"
                    required
                    autoComplete="name"
                    placeholder="Élodie Rousseau"
                    error={errors.name?.message}
                    {...register('name', { required: 'Please tell us your name.' })}
                  />
                  <Input
                    label="Phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder="+44 20 7946 0221"
                    error={errors.phone?.message}
                    {...register('phone', {
                      required: 'The driver will need to reach you.',
                      minLength: { value: 7, message: 'That number looks too short.' },
                    })}
                  />
                  <Input
                    label="Email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="sm:col-span-2"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'We send the receipt here.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'That address does not look right.',
                      },
                    })}
                  />
                </div>
              </fieldset>

              <AnimatePresence initial={false}>
                {isDelivery && (
                  <motion.fieldset
                    key="address"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <legend className="eyebrow">Delivery Address</legend>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Street address"
                        required
                        autoComplete="street-address"
                        placeholder="14 Curzon Street"
                        className="sm:col-span-2"
                        error={errors.street?.message}
                        {...register('street', {
                          required: isDelivery && 'We need somewhere to send it.',
                        })}
                      />
                      <Input
                        label="City"
                        required
                        autoComplete="address-level2"
                        placeholder="London"
                        error={errors.city?.message}
                        {...register('city', { required: isDelivery && 'City required.' })}
                      />
                      <Input
                        label="Postcode"
                        required
                        autoComplete="postal-code"
                        placeholder="W1J 5HN"
                        error={errors.postcode?.message}
                        {...register('postcode', {
                          required: isDelivery && 'Postcode required.',
                        })}
                      />
                      <Select
                        label="Arrival window"
                        options={WINDOWS}
                        className="sm:col-span-2"
                        {...register('window')}
                      />
                    </div>
                  </motion.fieldset>
                )}
              </AnimatePresence>

              <fieldset>
                <legend className="eyebrow">Notes for the Kitchen</legend>
                <Textarea
                  className="mt-6"
                  rows={4}
                  placeholder="Allergies, the buzzer is broken, leave it with the concierge…"
                  aria-label="Delivery notes"
                  {...register('notes')}
                />
              </fieldset>

              {/* Payment */}
              <fieldset>
                <legend className="eyebrow">Payment</legend>

                <div
                  role="radiogroup"
                  aria-label="Payment method"
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                >
                  {PAYMENT_METHODS.map(({ id, label, hint, icon: Icon }) => {
                    const on = method === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setMethod(id)}
                        className={cx(
                          'flex items-center gap-4 rounded-input border p-4 text-left transition-all duration-400',
                          on
                            ? 'border-gold bg-gold/[0.06]'
                            : 'border-hairline bg-charcoal/60 hover:border-gold/50'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cx(
                            'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-400',
                            on ? 'border-gold' : 'border-graphite'
                          )}
                        >
                          {on && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
                        </span>
                        <Icon
                          className={cx('h-5 w-5 shrink-0', on ? 'text-gold' : 'text-faint')}
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-bone">{label}</span>
                          <span className="block truncate text-[11px] text-faint">{hint}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {method === 'card' && (
                    <motion.div
                      key="card-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <Input
                          label="Card number"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="4242 4242 4242 4242"
                          className="sm:col-span-2"
                          {...register('cardNumber')}
                        />
                        <Input
                          label="Expiry"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="12 / 29"
                          {...register('cardExpiry')}
                        />
                        <Input
                          label="CVC"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder="123"
                          {...register('cardCvc')}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-5 text-[11px] leading-relaxed text-faint">
                  This is a demonstration site. No card is charged, nothing is stored, and
                  no order reaches a kitchen.
                </p>
              </fieldset>

              <Button type="submit" size="lg" full disabled={isSubmitting}>
                {isSubmitting ? 'Sending to the pass…' : `Place Order — ${formatPrice(t.total)}`}
              </Button>
            </form>

            {/* ------------------------------------------------------- Summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-card border border-hairline bg-charcoal p-6 sm:p-8">
                <h2 className="font-display text-2xl text-bone">Your Order</h2>

                {/* Fulfilment */}
                <div className="mt-6 grid grid-cols-2 gap-2 rounded-input border border-hairline p-1.5">
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
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Line items */}
                <ul className="mt-6 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt=""
                        ratio="1/1"
                        className="h-14 w-14 shrink-0 rounded-[10px]"
                        sizes="56px"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-lg text-bone">{item.name}</p>
                        <p className="text-xs text-faint tabular-nums">
                          {item.qty} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm text-gold tabular-nums">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Gratuity */}
                <div className="mt-7 border-t border-hairline pt-6">
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

                {/* Totals */}
                <dl className="mt-7 space-y-2.5 border-t border-hairline pt-6 text-sm">
                  {[
                    ['Subtotal', t.subtotal],
                    coupon && [`Discount (${coupon.code})`, -t.discount],
                    ['Delivery', t.delivery],
                    [TAX_LABEL, t.tax],
                    ['Gratuity', t.tip],
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

                  <div className="flex items-baseline justify-between border-t border-hairline pt-4">
                    <dt className="font-display text-xl text-bone">Total</dt>
                    <dd className="font-display text-3xl text-gilded tabular-nums">
                      {formatPrice(t.total)}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
