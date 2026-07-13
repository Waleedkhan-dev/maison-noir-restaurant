import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineGift,
  HiOutlineBriefcase,
} from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Field';
import { SITE } from '@/constants';
import { sendMessage } from '@/services/api';
import { EASE, fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1760894492871-217f4e4eafdd?auto=format&fit=crop&w=1600&q=75';

const SUBJECTS = [
  'General',
  'Reservations',
  'Private Dining',
  'Press',
  'Careers',
];

const { lat, lng } = SITE.geo;

const MAP_SRC =
  `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.006}%2C${lat - 0.003}%2C${lng + 0.006}%2C${lat + 0.003}` +
  `&layer=mapnik&marker=${lat}%2C${lng}`;

const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

const CARDS = [
  {
    icon: HiOutlineMapPin,
    title: 'Address',
    lines: [SITE.address.street, `${SITE.address.district}, ${SITE.address.city}`, SITE.address.postcode],
  },
  {
    icon: HiOutlinePhone,
    title: 'Telephone',
    lines: [SITE.phone, 'Reservations, 10:00 — 21:00'],
    href: `tel:${SITE.phoneHref}`,
  },
  {
    icon: HiOutlineEnvelope,
    title: 'Email',
    lines: [SITE.email, 'Answered within the day'],
    href: `mailto:${SITE.email}`,
  },
  {
    icon: HiOutlineClock,
    title: 'Hours',
    lines: SITE.hours.slice(0, 3).map((h) => `${h.day} · ${h.time}`),
  },
];

/* -------------------------------------------------------------- Info cards */

function Cards() {
  return (
    <motion.ul
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {CARDS.map((card) => {
        const Icon = card.icon;
        const body = (
          <>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-6 eyebrow">{card.title}</h2>
            <div className="mt-3 space-y-1">
              {card.lines.map((line) => (
                <p key={line} className="break-words text-sm leading-[1.7] text-muted">
                  {line}
                </p>
              ))}
            </div>
          </>
        );

        return (
          <motion.li key={card.title} variants={fadeUp}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="glass h-full rounded-card p-7 transition-colors duration-500 hover:border-gold/40"
            >
              {card.href ? (
                <a href={card.href} className="block">
                  {body}
                </a>
              ) : (
                body
              )}
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

/* ------------------------------------------------------------------- Form */

function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', subject: 'General', message: '' },
  });

  const onSubmit = async (data) => {
    await sendMessage(data);
    setSent(true);
  };

  const sendAnother = () => {
    reset();
    setSent(false);
  };

  return (
    <div className="glass-strong rounded-modal p-6 sm:p-9 lg:p-12">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 16 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-gold/10"
            >
              <svg viewBox="0 0 32 32" className="h-9 w-9 fill-none stroke-gold stroke-[2]">
                <motion.path
                  d="M7 16.5 13.5 23 25 10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
                />
              </svg>
            </motion.div>

            <h2 className="mt-8 text-3xl text-bone sm:text-4xl">Message received.</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-[1.85] text-muted">
              Someone from the house will write back within the day. If it is urgent,
              the telephone is always faster.
            </p>

            <Button variant="outline" size="md" className="mt-9" onClick={sendAnother}>
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-6 sm:grid-cols-2"
          >
            <Input
              label="Name"
              required
              autoComplete="name"
              placeholder="Élodie Rousseau"
              error={errors.name?.message}
              {...register('name', {
                required: 'Tell us who you are.',
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
            <Select
              label="Subject"
              className="sm:col-span-2"
              options={SUBJECTS}
              error={errors.subject?.message}
              {...register('subject', { required: 'Choose a subject.' })}
            />
            <Textarea
              label="Message"
              required
              rows={6}
              className="sm:col-span-2"
              placeholder="How can we help?"
              error={errors.message?.message}
              {...register('message', {
                required: 'A message, however short.',
                minLength: { value: 10, message: 'A little more detail, please.' },
              })}
            />

            <div className="sm:col-span-2">
              <Button
                type="submit"
                size="lg"
                full
                disabled={isSubmitting}
                icon={<HiOutlineArrowRight className="h-3.5 w-3.5" />}
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </Button>
              <p className="mt-4 text-center text-[11px] tracking-wide text-faint">
                We never share your details. Ever.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------- Map */

function Map() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="flex flex-col gap-6"
    >
      <div className="w-full overflow-hidden rounded-card border border-hairline bg-elevated">
        <iframe
          title={`Map showing ${SITE.name} on ${SITE.address.street}`}
          src={MAP_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] w-full border-0 sm:h-[420px]"
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-[1.8] text-muted">
          Green Park is six minutes on foot. There is no on-site parking — we validate
          three hours at the Q-Park on Park Lane.
        </p>
        <Button
          href={DIRECTIONS}
          target="_blank"
          rel="noreferrer noopener"
          variant="outline"
          size="md"
          className="shrink-0"
          icon={<HiOutlineArrowRight className="h-3.5 w-3.5" />}
        >
          Get directions
        </Button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------- CTAs */

const PANELS = [
  {
    icon: HiOutlineGift,
    eyebrow: 'Gift Cards',
    title: 'A table, given.',
    copy: 'Any denomination, delivered in a linen envelope by post or instantly by email. They never expire.',
    action: 'Arrange a gift card',
    href: `mailto:${SITE.email}?subject=Gift%20Card`,
  },
  {
    icon: HiOutlineBriefcase,
    eyebrow: 'Careers',
    title: 'Join the brigade.',
    copy: 'We hire for temperament first and technique second. Kitchen, floor and cellar positions open year-round.',
    action: 'See open positions',
    href: `mailto:${SITE.email}?subject=Careers`,
  },
];

function CtaPanels() {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid gap-6 lg:grid-cols-2"
    >
      {PANELS.map((panel) => {
        const Icon = panel.icon;
        return (
          <motion.div
            key={panel.eyebrow}
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-modal p-8 sm:p-12"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
            />
            <div className="relative">
              <Icon className="h-6 w-6 text-gold" />
              <p className="mt-6 eyebrow">{panel.eyebrow}</p>
              <h3 className="mt-4 text-3xl text-bone sm:text-4xl">{panel.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-[1.85] text-muted">{panel.copy}</p>
              <Button
                href={panel.href}
                variant="outline"
                size="md"
                className="mt-8"
                icon={<HiOutlineArrowRight className="h-3.5 w-3.5" />}
              >
                {panel.action}
              </Button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ------------------------------------------------------------------- Page */

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Find Maison Noir at 14 Curzon Street, Mayfair. Telephone, email, opening hours and directions — or write to us directly."
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Fourteen Curzon Street."
        lede="A black door in Mayfair with no sign on it. Telephone us, write to us, or simply find your way to the step — we are expecting you."
        image={HEADER_IMAGE}
      />

      <section className="section">
        <div className="shell">
          <Cards />

          <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
            <div>
              <SectionTitle
                eyebrow="Write To Us"
                title="Say what you need."
                lede="Bookings, private rooms, press enquiries, or a question about the menu. Whichever it is, a person reads it."
                align="left"
              />
              <div className="mt-10">
                <Map />
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="mt-24 lg:mt-32">
            <CtaPanels />
          </div>
        </div>
      </section>
    </>
  );
}
