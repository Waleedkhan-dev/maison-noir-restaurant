import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  FaInstagram, FaFacebookF, FaXTwitter, FaPinterestP,
} from 'react-icons/fa6';
import { HiOutlineArrowRight, HiOutlineCheckCircle } from 'react-icons/hi2';
import { Divider } from '@/components/ui/Misc';
import { SITE, FOOTER_LINKS, AWARDS } from '@/constants';
import { subscribe } from '@/services/api';
import { cx } from '@/utils';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  x: FaXTwitter,
  pinterest: FaPinterestP,
};

/* ------------------------------------------------------ Newsletter block */

function Newsletter() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    await subscribe(email);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="relative overflow-hidden rounded-modal border border-gold/20 bg-gradient-to-br from-elevated via-charcoal to-obsidian p-8 sm:p-12 lg:p-16"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.span variants={fadeUp} className="eyebrow">
            The Correspondence
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl leading-tight text-bone sm:text-4xl lg:text-5xl"
          >
            First to the table.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-md text-sm leading-[1.85] text-muted">
            Seasonal menus, cellar releases and event invitations — sent once a month,
            before the tables open to the public.
          </motion.p>
        </div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
          noValidate
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                aria-invalid={!!errors.email}
                {...register('email', {
                  required: 'An email address is required.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'That address does not look right.',
                  },
                })}
                className={cx(
                  'w-full rounded-full border bg-obsidian/70 px-6 py-4 text-sm text-bone',
                  'placeholder:text-faint transition-all duration-400 focus:outline-none',
                  errors.email
                    ? 'border-danger'
                    : 'border-hairline focus:border-gold focus:ring-1 focus:ring-gold/25'
                )}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || sent}
              className={cx(
                'group flex shrink-0 items-center justify-center gap-2.5 rounded-full px-8 py-4',
                'font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-500',
                sent
                  ? 'bg-success text-bone'
                  : 'bg-gold text-obsidian hover:bg-gold-light disabled:opacity-50'
              )}
            >
              {sent ? (
                <>
                  <HiOutlineCheckCircle className="h-4 w-4" />
                  Subscribed
                </>
              ) : (
                <>
                  {isSubmitting ? 'Sending' : 'Subscribe'}
                  <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>

          {errors.email && (
            <p role="alert" className="mt-3 pl-6 text-xs text-danger">
              {errors.email.message}
            </p>
          )}
          <p className="mt-3 pl-6 text-[10px] tracking-wide text-faint">
            No forwarding, no selling. Unsubscribe in one click.
          </p>
        </motion.form>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------- Footer */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="noise relative border-t border-hairline bg-charcoal">
      <div className="shell relative z-10 py-20 lg:py-28">
        <Newsletter />

        <Divider className="my-16 lg:my-24" />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          {/* Identity */}
          <div>
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl tracking-[0.14em] text-bone">
                MAISON NOIR
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-[1.9] text-muted">
              {SITE.description}
            </p>

            <address className="mt-7 not-italic text-sm leading-[1.9] text-muted">
              {SITE.address.street}
              <br />
              {SITE.address.district}, {SITE.address.city} {SITE.address.postcode}
              <br />
              <a
                href={`tel:${SITE.phoneHref}`}
                className="text-bone transition-colors hover:text-gold"
              >
                {SITE.phone}
              </a>
              <br />
              <a
                href={`mailto:${SITE.email}`}
                className="text-bone transition-colors hover:text-gold"
              >
                {SITE.email}
              </a>
            </address>

            <ul className="mt-7 flex gap-3">
              {SITE.social.map((social) => {
                const Icon = ICONS[social.icon];
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.name}
                      className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Links + hours */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="eyebrow">{group.title}</h3>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted transition-colors duration-400 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h3 className="eyebrow">Hours</h3>
              <dl className="mt-5 space-y-3.5">
                {SITE.hours.map((h) => (
                  <div key={h.day}>
                    <dt className="text-sm text-bone">{h.day}</dt>
                    <dd className="text-xs text-faint">
                      {h.service} · {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Awards */}
        <ul className="mt-20 grid gap-6 border-y border-hairline py-10 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map((award) => (
            <li key={award.title} className="text-center sm:text-left">
              <p className="font-display text-lg text-bone">{award.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gold">
                {award.year}
              </p>
              <p className="text-[11px] text-faint">{award.body}</p>
            </li>
          ))}
        </ul>

        {/* Legal */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-center text-[11px] tracking-wide text-faint sm:text-left">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: 'Privacy', path: '/privacy' },
              { label: 'Terms', path: '/terms' },
              { label: 'FAQ', path: '/faq' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-[11px] tracking-wide text-faint transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
