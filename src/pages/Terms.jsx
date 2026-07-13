import { motion } from 'framer-motion';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import { SITE, TAX_RATE, DELIVERY_FEE } from '@/constants';
import { formatPrice } from '@/utils';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1574966739987-65e38db0f7ce?auto=format&fit=crop&w=1800&q=70';

const UPDATED = '13 July 2026';

/** Serif heading with a gold rule above it. Local to the legal pages. */
function Section({ title, children }) {
  return (
    <motion.section variants={fadeUp} className="mt-16 first:mt-0">
      <span className="block h-px w-14 bg-gold" aria-hidden="true" />
      <h2 className="mt-6 text-2xl text-bone sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-5 text-[0.95rem] leading-[1.9] text-muted">
        {children}
      </div>
    </motion.section>
  );
}

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description="Reservation and cancellation terms, online ordering and delivery, pricing and VAT, allergens, gift cards and liability at Maison Noir."
        breadcrumbs={[{ name: 'Terms & Conditions', path: '/terms' }]}
      />

      <PageHeader
        eyebrow="Legal"
        crumb="Terms"
        title="Terms & Conditions"
        lede="The agreement between you and the restaurant when you book a table, place an order, or buy a gift card. Plainly put, and short enough to read."
        image={HEADER_IMAGE}
      />

      <div className="section">
        <motion.article
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="shell"
        >
          <div className="mx-auto max-w-3xl">
            <motion.p
              variants={fadeUp}
              className="mb-16 text-[10px] uppercase tracking-[0.22em] text-faint"
            >
              Last updated {UPDATED}
            </motion.p>

            <Section title="These terms">
              <p>
                These terms govern your use of this website and any reservation, order or
                gift card purchase you make through it. The contract is with{' '}
                {SITE.legalName}, a company registered in England and Wales, trading from{' '}
                {SITE.address.street}, {SITE.address.district}, {SITE.address.city},{' '}
                {SITE.address.postcode}. By booking a table you accept them.
              </p>
            </Section>

            <Section title="Reservations and cancellation">
              <p>
                A reservation is confirmed only once you receive written confirmation from
                us. Card details are taken to secure the booking; nothing is charged at the
                time of booking.
              </p>
              <p>
                You may cancel or amend free of charge up to{' '}
                <span className="text-bone">48 hours</span> before your reservation. Within
                48 hours, or in the event of a no-show, we charge{' '}
                <span className="text-bone">{formatPrice(50)} per guest</span>. For the
                Chef&rsquo;s Table and ticketed events, cancellation within 48 hours is
                charged at the <span className="text-bone">full amount</span>, as the
                produce has already been bought and the seats cannot be resold.
              </p>
              <p>
                We will always try to move you rather than charge you. Tell us as early as
                you can and we will do what we reasonably can.
              </p>
              <p>
                We hold your table for fifteen minutes past the reserved time. After that we
                may release it, though we will telephone you first. Reduced party sizes
                notified within 48 hours are charged at the per-guest rate above for the
                seats we cannot fill.
              </p>
            </Section>

            <Section title="Private dining and events">
              <p>
                Private rooms are confirmed against a signed event agreement and a deposit
                of twenty-five percent of the minimum spend. Minimum spends are inclusive of
                food and beverage and exclusive of the discretionary service charge. Final
                guest numbers are due seven days before the event and are the number you
                will be charged for. Cancellation inside twenty-eight days forfeits the
                deposit; inside seven days, the full minimum spend is payable.
              </p>
            </Section>

            <Section title="Online orders and delivery">
              <p>
                Orders placed through this site are an offer to buy, accepted when we send
                you a confirmation. Delivery is available within Zone 1 only, between 18:00
                and 22:00 Tuesday to Saturday, at a flat fee of{' '}
                {formatPrice(DELIVERY_FEE)}. Estimated delivery windows are estimates and
                not guarantees.
              </p>
              <p>
                Because our food is perishable and prepared to order, you do not have a
                right to cancel under the Consumer Contracts Regulations once preparation
                has begun. If something arrives cold, late or wrong, telephone us the same
                evening and we will refund or replace it.
              </p>
            </Section>

            <Section title="Pricing and GST">
              <p>
                All prices shown include GST at {Math.round(TAX_RATE * 100)} percent. A
                discretionary service charge of twelve and a half percent is added to
                restaurant bills and is shared in full among the team; ask and it will be
                removed without a word.
              </p>
              <p>
                We take reasonable care with pricing, but if an item is listed at an
                obviously incorrect price we may cancel the order and refund you in full.
                Prices on the site may change; the price you were shown at checkout is the
                price you pay.
              </p>
            </Section>

            <Section title="Allergens and dietary requirements">
              <p>
                Our kitchen handles nuts, gluten, dairy, shellfish, sesame, celery and other
                allergens daily. While we take every reasonable precaution, we cannot
                guarantee that any dish is entirely free from traces of an allergen.
              </p>
              <p>
                If you have an allergy or intolerance, tell us when you book and again on
                arrival, so the kitchen can write around it. Full allergen information for
                every dish is available on request from your waiter. Guests with severe
                allergies should speak to the manager before ordering.
              </p>
            </Section>

            <Section title="Gift cards">
              <p>
                Gift cards may be purchased in any denomination, are redeemable against food
                and beverage at the restaurant, and never expire. They cannot be exchanged
                for cash, and any unspent balance remains on the card. Lost or stolen cards
                can be replaced only where you can supply the original order reference.
              </p>
            </Section>

            <Section title="Behaviour in the restaurant">
              <p>
                We ask that you avoid sportswear and trainers in the main dining room. We
                reserve the right to refuse service to, or to ask to leave, any guest whose
                conduct is abusive toward our staff or disruptive to other tables. No refund
                is due in those circumstances.
              </p>
            </Section>

            <Section title="Liability">
              <p>
                Nothing in these terms limits our liability for death or personal injury
                caused by our negligence, for fraud, or for any liability that cannot
                lawfully be excluded. Subject to that, our total liability arising from a
                reservation or an order is limited to the amount you paid for it, and we are
                not liable for indirect or consequential loss.
              </p>
              <p>
                Personal property is brought onto the premises at your own risk. Items left
                behind are kept for thirty days and then donated or disposed of.
              </p>
            </Section>

            <Section title="Governing law">
              <p>
                These terms and any dispute arising out of them are governed by the law of
                England and Wales, and the courts of England and Wales have exclusive
                jurisdiction. Nothing here affects your statutory rights as a consumer.
              </p>
              <p>
                Questions about these terms should go to{' '}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-gold underline decoration-gold/30 underline-offset-4 transition-colors hover:decoration-gold"
                >
                  {SITE.email}
                </a>{' '}
                or {SITE.phone}.
              </p>
            </Section>
          </div>
        </motion.article>
      </div>
    </>
  );
}
