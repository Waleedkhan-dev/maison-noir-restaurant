import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
} from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import { Input, Textarea, Select, ChipGroup } from '@/components/ui/Field';
import { Badge, Divider } from '@/components/ui/Misc';
import { SITE } from '@/constants';
import { OCCASIONS, TIME_SLOTS, FAQS } from '@/data';
import { createReservation } from '@/services/api';
import { cx, todayISO, formatDate } from '@/utils';
import { EASE, fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1666600638841-4fe4a01ae260?auto=format&fit=crop&w=1600&q=75';

const STEPS = ['The Table', 'Your Details', 'Anything Else'];

const GUESTS = [...Array(8)].map((_, i) => String(i + 1)).concat('9+');

const SEATING = ['Main room', 'Terrace', 'Bar', "Chef's Table"];

/* The live availability chips — sold-out slots come through struck and disabled. */
const SLOT_OPTIONS = TIME_SLOTS.map((slot) => ({
  value: slot.time,
  label: slot.time,
  disabled: !slot.available,
}));

/* Fields react-hook-form must clear before the step advances. */
const STEP_FIELDS = [
  ['date', 'guests', 'time', 'occasion'],
  ['firstName', 'lastName', 'email', 'phone', 'seating'],
  [],
];

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -48 : 48,
    transition: { duration: 0.3, ease: EASE },
  }),
};

/* --------------------------------------------------------- Step indicator */

function Steps({ current }) {
  return (
    <ol className="flex items-center">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex shrink-0 flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <motion.span
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={cx(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-full border font-sans text-xs transition-colors duration-500',
                  done || active
                    ? 'border-gold bg-gold text-obsidian'
                    : 'border-hairline text-faint'
                )}
              >
                {i + 1}
              </motion.span>
              <span
                className={cx(
                  'text-center text-[10px] uppercase tracking-[0.18em] transition-colors duration-500 sm:text-left',
                  active ? 'text-bone' : 'text-faint'
                )}
              >
                {label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <span className="relative mx-3 h-px flex-1 bg-hairline sm:mx-5">
                <motion.span
                  initial={false}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 origin-left bg-gold"
                />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------- Recap card */

function Recap({ values, className }) {
  const rows = [
    ['Date', values.date ? formatDate(values.date) : '—'],
    ['Time', values.time || '—'],
    ['Guests', values.guests ? `${values.guests} at table` : '—'],
    ['Occasion', values.occasion || '—'],
  ];

  return (
    <dl className={cx('divide-y divide-hairline', className)}>
      {rows.map(([term, value]) => (
        <div key={term} className="flex items-baseline justify-between gap-6 py-3.5">
          <dt className="text-[10px] uppercase tracking-[0.22em] text-faint">{term}</dt>
          <dd className="text-right font-display text-lg text-bone">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------- Confirmation */

function Confirmed({ reference, values }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="glass-strong rounded-modal p-7 text-center sm:p-12"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 16 }}
        className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-gold/10"
      >
        <svg viewBox="0 0 32 32" className="h-9 w-9 fill-none stroke-gold stroke-[2]">
          <motion.path
            d="M7 16.5 13.5 23 25 10"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          />
        </svg>
      </motion.div>

      <h2 className="mt-8 text-3xl text-bone sm:text-4xl">The table is yours.</h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-[1.85] text-muted">
        A confirmation is on its way to {values.email}. We will call you only if
        something changes.
      </p>

      <div className="mt-8 inline-flex flex-col items-center gap-2 rounded-card border border-gold/25 bg-gold/5 px-8 py-5">
        <span className="text-[10px] uppercase tracking-[0.22em] text-faint">
          Booking reference
        </span>
        <span className="text-gilded font-display text-3xl tracking-[0.12em]">
          {reference}
        </span>
      </div>

      <Recap values={values} className="mx-auto mt-10 max-w-sm text-left" />

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="outline" size="md">
          Add to calendar
        </Button>
        <Button to="/menu" size="md" icon={<HiOutlineArrowRight className="h-3.5 w-3.5" />}>
          Back to menu
        </Button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------- Aside */

function Aside() {
  return (
    <motion.aside
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="flex flex-col gap-8"
    >
      <motion.div variants={fadeUp} className="glass rounded-card p-7">
        <div className="flex items-center gap-3">
          <HiOutlineClock className="h-4 w-4 shrink-0 text-gold" />
          <h2 className="eyebrow">Opening Hours</h2>
        </div>
        <dl className="mt-6 space-y-4">
          {SITE.hours.map((h) => (
            <div key={h.day}>
              <dt className="text-sm text-bone">{h.day}</dt>
              <dd className="text-xs text-faint">
                {h.service} · {h.time}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <motion.div variants={fadeUp} className="glass rounded-card p-7">
        <h2 className="eyebrow">Speak To Us</h2>
        <ul className="mt-6 space-y-4">
          <li>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="flex items-center gap-3 text-sm text-bone transition-colors duration-400 hover:text-gold"
            >
              <HiOutlinePhone className="h-4 w-4 shrink-0 text-gold" />
              {SITE.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 break-all text-sm text-bone transition-colors duration-400 hover:text-gold"
            >
              <HiOutlineEnvelope className="h-4 w-4 shrink-0 text-gold" />
              {SITE.email}
            </a>
          </li>
        </ul>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="rounded-card border border-gold/25 bg-gold/5 p-7"
      >
        <div className="flex items-center gap-3">
          <HiOutlineExclamationTriangle className="h-4 w-4 shrink-0 text-gold" />
          <h2 className="eyebrow">48-Hour Policy</h2>
        </div>
        <p className="mt-5 text-sm leading-[1.85] text-muted">
          Cancel free of charge up to 48 hours before service. Inside 48 hours we
          charge Rs 2,500 per guest — and for the Chef&rsquo;s Table, the full amount. We
          will always try to move you rather than charge you.
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h2 className="eyebrow">Before You Book</h2>
        <Accordion items={FAQS.slice(0, 3)} className="mt-5" />
      </motion.div>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------- Page */

export default function Reservations() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [reference, setReference] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      date: '',
      guests: '2',
      time: '',
      occasion: 'Dining',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      seating: 'Main room',
      requests: '',
      allergies: '',
    },
  });

  const values = watch();

  const go = async (next) => {
    if (next > step) {
      const clean = await trigger(STEP_FIELDS[step]);
      if (!clean) return;
    }
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const onSubmit = async (data) => {
    const res = await createReservation(data);
    setReference(res.reference);
  };

  /* ChipGroups sit outside register(), so they are registered by hand. */
  const chip = (name, rules) => {
    register(name, rules);
    return (value) => setValue(name, value, { shouldValidate: true });
  };

  return (
    <>
      <Seo
        title="Reservations"
        description="Reserve a table at Maison Noir. Two Michelin stars on Curzon Street — dinner Tuesday to Saturday, lunch Friday to Sunday."
        breadcrumbs={[{ name: 'Reservations', path: '/reservations' }]}
      />

      <PageHeader
        eyebrow="Reservations"
        title="Take a seat at Maison Noir."
        lede="Tables open on the first of each month for the month ahead. Tell us when, who with, and what we are celebrating — the rest is our concern."
        image={HEADER_IMAGE}
      />

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1.65fr_1fr] lg:items-start lg:gap-20">
          <div>
            <AnimatePresence mode="wait">
              {reference ? (
                <Confirmed key="done" reference={reference} values={values} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-strong rounded-modal p-6 sm:p-9 lg:p-12"
                >
                  <Steps current={step} />

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="mt-10 overflow-hidden"
                  >
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      {/* ---------------------------------------- 1. The Table */}
                      {step === 0 && (
                        <motion.div
                          key="step-0"
                          custom={direction}
                          variants={slide}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="flex flex-col gap-8"
                        >
                          <Input
                            type="date"
                            label="Date"
                            required
                            min={todayISO()}
                            error={errors.date?.message}
                            {...register('date', { required: 'Choose a date.' })}
                          />

                          <ChipGroup
                            label="Guests"
                            name="guests"
                            options={GUESTS}
                            value={values.guests}
                            onChange={chip('guests', { required: 'How many of you?' })}
                          />

                          <div>
                            <ChipGroup
                              label="Service"
                              name="time"
                              options={SLOT_OPTIONS}
                              value={values.time}
                              onChange={chip('time', { required: 'Pick a service time.' })}
                            />
                            {errors.time && (
                              <p role="alert" className="mt-3 text-xs text-danger">
                                {errors.time.message}
                              </p>
                            )}
                            <p className="mt-3 text-[11px] text-faint">
                              Struck-through times are fully committed this evening.
                            </p>
                          </div>

                          <ChipGroup
                            label="Occasion"
                            name="occasion"
                            options={OCCASIONS}
                            value={values.occasion}
                            onChange={chip('occasion')}
                          />
                        </motion.div>
                      )}

                      {/* ------------------------------------- 2. Your Details */}
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          custom={direction}
                          variants={slide}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="grid gap-6 sm:grid-cols-2"
                        >
                          <Input
                            label="First name"
                            required
                            autoComplete="given-name"
                            placeholder="Élodie"
                            error={errors.firstName?.message}
                            {...register('firstName', {
                              required: 'We need a first name.',
                              minLength: { value: 2, message: 'That seems too short.' },
                            })}
                          />
                          <Input
                            label="Last name"
                            required
                            autoComplete="family-name"
                            placeholder="Rousseau"
                            error={errors.lastName?.message}
                            {...register('lastName', {
                              required: 'We need a last name.',
                              minLength: { value: 2, message: 'That seems too short.' },
                            })}
                          />
                          <Input
                            type="email"
                            label="Email"
                            required
                            autoComplete="email"
                            placeholder="your@email.com"
                            error={errors.email?.message}
                            {...register('email', {
                              required: 'An email address is required.',
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'That address does not look right.',
                              },
                            })}
                          />
                          <Input
                            type="tel"
                            label="Telephone"
                            required
                            autoComplete="tel"
                            placeholder="+44 20 7946 0221"
                            error={errors.phone?.message}
                            {...register('phone', {
                              required: 'A number, in case the kitchen needs you.',
                              pattern: {
                                value: /^[+\d][\d\s()-]{7,}$/,
                                message: 'That number does not look right.',
                              },
                            })}
                          />
                          <Select
                            label="Seating preference"
                            className="sm:col-span-2"
                            options={SEATING}
                            error={errors.seating?.message}
                            {...register('seating', { required: 'Choose where to sit.' })}
                          />
                        </motion.div>
                      )}

                      {/* ------------------------------------ 3. Anything Else */}
                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          custom={direction}
                          variants={slide}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="flex flex-col gap-8"
                        >
                          <Textarea
                            label="Special requests"
                            rows={3}
                            placeholder="A quiet corner, a candle at dessert, a chair for the pram."
                            {...register('requests')}
                          />
                          <Textarea
                            label="Allergies & dietary notes"
                            rows={3}
                            placeholder="Tell us now and again on the night — the kitchen rewrites the menu around you."
                            {...register('allergies')}
                          />

                          <div className="rounded-card border border-hairline bg-charcoal/50 p-6">
                            <h3 className="eyebrow">Review</h3>
                            <Recap values={values} className="mt-4" />
                            <Divider className="my-5" />
                            <dl className="space-y-3.5">
                              <div className="flex items-baseline justify-between gap-6">
                                <dt className="text-[10px] uppercase tracking-[0.22em] text-faint">
                                  Name
                                </dt>
                                <dd className="text-right text-sm text-bone">
                                  {values.firstName} {values.lastName}
                                </dd>
                              </div>
                              <div className="flex items-baseline justify-between gap-6">
                                <dt className="text-[10px] uppercase tracking-[0.22em] text-faint">
                                  Contact
                                </dt>
                                <dd className="break-all text-right text-sm text-bone">
                                  {values.email}
                                </dd>
                              </div>
                              <div className="flex items-baseline justify-between gap-6">
                                <dt className="text-[10px] uppercase tracking-[0.22em] text-faint">
                                  Seating
                                </dt>
                                <dd className="text-right text-sm text-bone">
                                  {values.seating}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
                      {step > 0 ? (
                        <Button
                          variant="ghost"
                          size="md"
                          onClick={() => go(step - 1)}
                          className="sm:w-auto"
                        >
                          <HiOutlineArrowLeft className="h-3.5 w-3.5" />
                          Back
                        </Button>
                      ) : (
                        <Badge tone="gold">Step 1 of 3</Badge>
                      )}

                      {step < STEPS.length - 1 ? (
                        <Button
                          size="md"
                          onClick={() => go(step + 1)}
                          icon={<HiOutlineArrowRight className="h-3.5 w-3.5" />}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button size="md" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Reserving…' : 'Confirm reservation'}
                        </Button>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Aside />
        </div>
      </section>
    </>
  );
}
