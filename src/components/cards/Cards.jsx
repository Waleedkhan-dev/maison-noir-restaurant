import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineArrowUpRight,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { FaQuoteLeft } from 'react-icons/fa6';
import Image from '@/components/ui/Image';
import { Badge, Rating } from '@/components/ui/Misc';
import { formatPrice, cx } from '@/utils';
import { fadeUp } from '@/animations/variants';

/* ------------------------------------------------------------- ReviewCard */

export function ReviewCard({ review, className }) {
  return (
    <motion.figure
      variants={fadeUp}
      className={cx(
        'glass flex h-full flex-col rounded-card p-8 transition-colors duration-500 hover:border-gold/35',
        className
      )}
    >
      <FaQuoteLeft className="h-6 w-6 text-gold/50" aria-hidden="true" />

      <blockquote className="mt-6 flex-1 font-display text-xl leading-[1.6] text-bone/90 sm:text-[1.4rem]">
        “{review.text}”
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
        <Image
          src={review.avatar}
          alt=""
          ratio="1/1"
          className="h-12 w-12 shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-bone">{review.name}</p>
          <p className="truncate text-xs text-faint">{review.role}</p>
        </div>
        <div className="text-right">
          <Rating value={review.rating} />
          <p className="mt-1 text-[10px] uppercase tracking-widest text-faint">
            {review.source}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

/* --------------------------------------------------------------- ChefCard */

export function ChefCard({ chef, index = 0 }) {
  return (
    <motion.article variants={fadeUp} custom={index} className="group">
      <div className="relative overflow-hidden rounded-card">
        <Image src={chef.image} alt={`${chef.name}, ${chef.role}`} ratio="3/4" zoom />

        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="eyebrow">{chef.role}</span>
          <h3 className="mt-2 text-2xl text-bone sm:text-3xl">{chef.name}</h3>

          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="pt-3 text-sm italic leading-relaxed text-muted">
                “{chef.quote}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* --------------------------------------------------------------- BlogCard */

export function BlogCard({ post, index = 0, featured = false }) {
  return (
    <motion.article variants={fadeUp} custom={index} className="group h-full">
      <Link
        to={`/blog/${post.id}`}
        className="flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-charcoal transition-colors duration-500 hover:border-gold/40"
      >
        <Image
          src={post.image}
          alt={post.title}
          ratio={featured ? '16/9' : '3/2'}
          zoom
        />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-faint">
            <span className="text-gold">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min</span>
          </div>

          <h3
            className={cx(
              'mt-4 leading-snug text-bone transition-colors duration-400 group-hover:text-gold-light',
              featured ? 'text-3xl sm:text-4xl' : 'text-2xl'
            )}
          >
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            Read
            <HiOutlineArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

/* -------------------------------------------------------------- EventCard */

export function EventCard({ event, index = 0, onBook }) {
  const scarce = event.seatsLeft <= 6;

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group grid gap-8 overflow-hidden rounded-card border border-hairline bg-charcoal p-5 transition-colors duration-500 hover:border-gold/40 sm:grid-cols-[1fr_1.3fr] sm:p-6 lg:grid-cols-[1fr_1.5fr]"
    >
      <Image
        src={event.image}
        alt={event.title}
        ratio="4/3"
        zoom
        className="rounded-[18px]"
      />

      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="gold">{event.type}</Badge>
          {scarce && <Badge tone="danger">{event.seatsLeft} seats left</Badge>}
        </div>

        <h3 className="mt-4 text-3xl text-bone transition-colors duration-400 group-hover:text-gold-light sm:text-4xl">
          {event.title}
        </h3>

        <p className="mt-3 text-sm leading-[1.85] text-muted">{event.description}</p>

        <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-xs text-muted">
          <div className="flex items-center gap-2">
            <HiOutlineCalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
            <dt className="sr-only">Date</dt>
            <dd>{event.dateLabel}</dd>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineClock className="h-4 w-4 text-gold" aria-hidden="true" />
            <dt className="sr-only">Time</dt>
            <dd>{event.time}</dd>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineUsers className="h-4 w-4 text-gold" aria-hidden="true" />
            <dt className="sr-only">Capacity</dt>
            <dd>
              {event.seatsLeft} of {event.seats}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex items-center justify-between gap-4 border-t border-hairline pt-6">
          <span className="font-display text-3xl text-gilded">
            {formatPrice(event.price)}
            <span className="ml-1.5 font-sans text-[10px] uppercase tracking-widest text-faint">
              per guest
            </span>
          </span>

          <button
            type="button"
            onClick={() => onBook?.(event)}
            className="rounded-full border border-hairline px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted transition-all duration-500 hover:border-gold hover:bg-gold hover:text-obsidian"
          >
            Reserve
          </button>
        </div>
      </div>
    </motion.article>
  );
}
