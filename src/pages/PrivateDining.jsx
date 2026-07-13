import { motion } from 'framer-motion';
import { HiOutlineArrowLongRight, HiOutlineCheck } from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';
import { Divider } from '@/components/ui/Misc';
import { CtaSection } from '@/components/sections/Cta';
import { PRIVATE_ROOMS } from '@/data';
import { formatPrice, cx } from '@/utils';
import {
  fadeUp,
  stagger,
  slideLeft,
  slideRight,
  VIEWPORT,
} from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1775492783040-9ebacb1f7861?auto=format&fit=crop&w=1800&q=70';

const STEPS = [
  {
    n: '01',
    title: 'Enquire',
    body: 'Tell us the date, the number, and the reason. Our events team replies the same day with the rooms that fit.',
  },
  {
    n: '02',
    title: 'Design the menu',
    body: 'Élodie writes a menu for your table — around the season, your guests, and every dietary requirement in the room.',
  },
  {
    n: '03',
    title: 'Dine',
    body: 'You arrive to a room that is entirely yours, a dedicated brigade, and nothing left for you to organise.',
  },
];

export default function PrivateDining() {
  return (
    <>
      <Seo
        title="Private Dining"
        description="Four private rooms in Mayfair — the Salon Noir, the Cellar, the Chef's Table and the Terrace. Bespoke menus, dedicated sommelier, from eight to sixty-five guests."
        breadcrumbs={[{ name: 'Private Dining', path: '/private-dining' }]}
      />

      <PageHeader
        eyebrow="Private Dining"
        crumb="Private Dining"
        title="Four rooms. Yours for the evening."
        lede="A cellar surrounded by nine hundred bins. Eight stools inside the kitchen. A walled terrace behind the dining room. Each takes a different kind of evening."
        image={HEADER_IMAGE}
      />

      {/* Intro */}
      <section className="section pb-0">
        <div className="shell">
          <SectionTitle
            eyebrow="The Salons"
            title="A private room should not feel like a smaller restaurant."
            lede="Every salon has its own service, its own sommelier, and a menu written for the table rather than lifted from the dining room. Minimum spends are inclusive of food and wine — never a hire fee dressed up as one."
          />
        </div>
      </section>

      {/* Alternating room rows */}
      {/* clipped: the rows slide in from ±56px and would otherwise widen the page */}
      <section className="section overflow-hidden" aria-label="Private rooms">
        <div className="shell flex flex-col gap-24 lg:gap-36">
          {PRIVATE_ROOMS.map((room, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={room.id}
                variants={stagger(0.12)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <motion.div
                  variants={flipped ? slideLeft : slideRight}
                  className={cx('group overflow-hidden rounded-card', flipped && 'lg:order-2')}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    ratio="4/3"
                    zoom
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

                <motion.div variants={flipped ? slideRight : slideLeft}>
                  <span className="eyebrow">{room.capacity}</span>

                  <h2 className="mt-5 text-4xl sm:text-5xl">{room.name}</h2>

                  <p className="mt-5 text-[0.95rem] leading-[1.9] text-muted">
                    {room.description}
                  </p>

                  <dl className="mt-9 grid grid-cols-3 gap-4 border-y border-hairline py-6">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-faint">
                        Seated
                      </dt>
                      <dd className="mt-2 font-display text-3xl text-bone">
                        {room.seated}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-faint">
                        Standing
                      </dt>
                      <dd className="mt-2 font-display text-3xl text-bone">
                        {room.standing}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-faint">
                        From
                      </dt>
                      <dd className="mt-2 font-display text-3xl text-gilded">
                        {formatPrice(room.minSpend)}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {room.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10"
                        >
                          <HiOutlineCheck className="h-3 w-3 text-gold" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    to="/contact"
                    variant="outline"
                    className="mt-10"
                    icon={<HiOutlineArrowLongRight />}
                  >
                    Enquire — {room.name}
                  </Button>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="section pt-0" aria-label="How private dining works">
        <div className="shell">
          <Divider className="mb-20" />

          <SectionTitle
            eyebrow="How it works"
            title="Three conversations, one evening."
            as="h2"
            className="mb-16"
          />

          <motion.ol
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-6 md:grid-cols-3"
          >
            {STEPS.map((step) => (
              <motion.li
                key={step.n}
                variants={fadeUp}
                className="glass rounded-card p-8 transition-colors duration-500 hover:border-gold/35"
              >
                <span className="font-display text-5xl text-gilded">{step.n}</span>
                <h3 className="mt-5 text-2xl text-bone">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-muted">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>

          {/* Pairing / bespoke menu note */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-16 grid gap-8 rounded-card border border-hairline bg-charcoal p-8 sm:p-12 lg:grid-cols-2"
          >
            <div>
              <span className="eyebrow">The Cellar</span>
              <h3 className="mt-4 text-2xl text-bone sm:text-3xl">Wine, chosen for the table</h3>
              <p className="mt-4 text-sm leading-[1.9] text-muted">
                Sofia Marchetti builds a pairing for every private menu, drawn from the nine
                hundred bins beneath Curzon Street. Tell her a bottle you have loved and a
                figure you are comfortable with — she will do the rest, and she is looking
                for a reason to open one of the strange ones.
              </p>
            </div>

            <div className="lg:border-l lg:border-hairline lg:pl-12">
              <span className="eyebrow">The Kitchen</span>
              <h3 className="mt-4 text-2xl text-bone sm:text-3xl">Bespoke menus, not set menus</h3>
              <p className="mt-4 text-sm leading-[1.9] text-muted">
                Nothing is lifted from the à la carte unless you ask for it. Allergies and
                dietary requirements are cooked around rather than subtracted from, and the
                Garden Tasting is entirely plant-based by design. Menus are finalised a
                fortnight before service, once the season has shown its hand.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
