import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineArrowLongRight,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Image from '@/components/ui/Image';
import { Input, Select } from '@/components/ui/Field';
import { Badge } from '@/components/ui/Misc';
import { EventCard } from '@/components/cards/Cards';
import { CtaSection } from '@/components/sections/Cta';
import { EVENTS } from '@/data';
import { formatPrice, cx } from '@/utils';
import { fadeUp, stagger, scaleIn, VIEWPORT } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1536392706976-e486e2ba97af?auto=format&fit=crop&w=1800&q=70';

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  value: String(n),
  label: n === 1 ? '1 guest' : `${n} guests`,
}));

export default function Events() {
  const types = useMemo(
    () => ['All', ...Array.from(new Set(EVENTS.map((e) => e.type)))],
    []
  );

  const [filter, setFilter] = useState('All');
  const [booking, setBooking] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', guests: '2' });
  const [sent, setSent] = useState(false);

  const shown = useMemo(
    () => (filter === 'All' ? EVENTS : EVENTS.filter((e) => e.type === filter)),
    [filter]
  );

  const openBooking = (event) => {
    setBooking(event);
    setForm({ name: '', email: '', guests: '2' });
    setSent(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Seo
        title="Events & Tastings"
        description="Wine tastings, late suppers with live jazz, truffle dinners and the Chef's Table. The Maison Noir calendar of one-night-only evenings in Mayfair."
        breadcrumbs={[{ name: 'Events', path: '/events' }]}
      />

      <PageHeader
        eyebrow="Events"
        crumb="Events"
        title="One night, and then it is gone."
        lede="A handful of evenings each season that do not appear on the regular menu — a vertical of Burgundy, a quartet playing until one, eight seats at the pass."
        image={HEADER_IMAGE}
      />

      <section className="section" aria-labelledby="events-list">
        <div className="shell">
          <h2 id="events-list" className="sr-only">
            Upcoming events
          </h2>

          {/* Type filter */}
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mb-14 flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter events by type"
          >
            {types.map((type) => {
              const active = filter === type;
              return (
                <motion.button
                  key={type}
                  variants={fadeUp}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(type)}
                  className={cx(
                    'rounded-full border px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-500',
                    active
                      ? 'border-gold bg-gold text-obsidian'
                      : 'border-hairline text-muted hover:border-gold/60 hover:text-bone'
                  )}
                >
                  {type}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            key={filter}
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} onBook={openBooking} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Cross-link to private dining */}
      <section className="pb-24 lg:pb-32" aria-labelledby="private-crosslink">
        <div className="shell">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="glass grid items-center gap-10 overflow-hidden rounded-card p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]"
          >
            <div>
              <span className="eyebrow">Private Events</span>
              <h2 id="private-crosslink" className="mt-5 text-3xl sm:text-4xl">
                Or take the room{' '}
                <span className="text-gilded">entirely for yourself.</span>
              </h2>
              <p className="mt-5 max-w-lg text-[0.95rem] leading-[1.9] text-muted">
                Four private salons, from eight seats at the pass to sixty-five standing
                in the Salon Noir. The menu is written around your table rather than the
                other way about.
              </p>
              <Button
                to="/private-dining"
                variant="outline"
                className="mt-9"
                icon={<HiOutlineArrowLongRight />}
              >
                Explore Private Dining
              </Button>
            </div>

            <Image
              src="https://images.unsplash.com/photo-1515982200576-f29f11444503?auto=format&fit=crop&w=900&q=70"
              alt="The Salon Noir laid for a private dinner"
              ratio="4/3"
              className="rounded-[18px]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Booking modal */}
      <Modal
        open={!!booking}
        onClose={() => setBooking(null)}
        label={booking ? `Reserve ${booking.title}` : 'Reserve'}
        className="max-w-2xl"
      >
        {booking && (
          <div className="p-7 sm:p-10">
            <Badge tone="gold">{booking.type}</Badge>

            <h2 className="mt-5 text-3xl sm:text-4xl">{booking.title}</h2>

            <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-xs text-muted">
              <div className="flex items-center gap-2">
                <HiOutlineCalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
                <dt className="sr-only">Date</dt>
                <dd>{booking.dateLabel}</dd>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineClock className="h-4 w-4 text-gold" aria-hidden="true" />
                <dt className="sr-only">Time</dt>
                <dd>{booking.time}</dd>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                <dt className="sr-only">Price</dt>
                <dd>{formatPrice(booking.price)} per guest</dd>
              </div>
            </dl>

            <p className="mt-6 text-sm leading-[1.9] text-muted">{booking.description}</p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-9 rounded-card border border-success/40 bg-success/10 p-8 text-center"
                >
                  <HiOutlineCheckCircle
                    className="mx-auto h-10 w-10 text-success"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 text-2xl text-bone">Your seats are held.</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-[1.85] text-muted">
                    We have reserved {form.guests}{' '}
                    {form.guests === '1' ? 'seat' : 'seats'} for {booking.dateLabel}. A
                    confirmation is on its way to {form.email}.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-7"
                    onClick={() => setBooking(null)}
                  >
                    Close
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-9 border-t border-hairline pt-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Name"
                      required
                      data-autofocus
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Select
                      label="Guests"
                      className="sm:col-span-2"
                      options={GUEST_OPTIONS}
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    />
                  </div>

                  <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-xs text-faint">
                      {booking.seatsLeft} of {booking.seats} seats remain.
                    </p>
                    <Button type="submit" icon={<HiOutlineArrowLongRight />}>
                      Request Seats
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        )}
      </Modal>

      <CtaSection />
    </>
  );
}
