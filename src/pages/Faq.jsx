import { motion } from 'framer-motion';
import { HiOutlineArrowLongRight, HiOutlinePhone } from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { CtaSection } from '@/components/sections/Cta';
import { SITE } from '@/constants';
import { FAQS } from '@/data';
import { fadeUp, VIEWPORT } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1771574205963-0c1d84ac7354?auto=format&fit=crop&w=1800&q=70';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function Faq() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Booking windows, the dress code, dietary requirements, cancellations, parking and gift cards — everything guests ask us before dinner at Maison Noir."
        schema={faqSchema}
        breadcrumbs={[{ name: 'FAQ', path: '/faq' }]}
      />

      <PageHeader
        eyebrow="FAQ"
        crumb="FAQ"
        title="Everything you asked, before you asked it."
        lede="How far ahead to book, what to wear, what happens if you cannot come. If something is missing, the phone is answered by a person."
        image={HEADER_IMAGE}
      />

      <section className="section" aria-label="Frequently asked questions">
        <div className="shell">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto max-w-3xl"
          >
            <Accordion items={FAQS} defaultOpen={0} />

            {/* Still stuck */}
            <div className="glass mt-16 flex flex-col items-center gap-6 rounded-card p-10 text-center sm:p-14">
              <span className="eyebrow">Still curious</span>

              <h2 className="max-w-lg text-3xl sm:text-4xl">
                Ask us anything. <span className="text-gilded">Genuinely.</span>
              </h2>

              <p className="max-w-md text-[0.95rem] leading-[1.9] text-muted">
                Allergies, a proposal you would like help with, a bottle you want opened at
                a particular moment — none of it is a strange request here.
              </p>

              <div className="mt-2 flex flex-col gap-3 xs:flex-row xs:gap-4">
                <Button to="/contact" icon={<HiOutlineArrowLongRight />}>
                  Contact Us
                </Button>
                <Button
                  href={`tel:${SITE.phoneHref}`}
                  variant="outline"
                  icon={<HiOutlinePhone className="h-4 w-4" />}
                >
                  {SITE.phone}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
