import { motion } from 'framer-motion';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import { SITE } from '@/constants';
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

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Maison Noir collects, uses and protects your personal data under the UK GDPR — lawful bases, cookies, retention periods and your rights."
        breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy' }]}
      />

      <PageHeader
        eyebrow="Legal"
        crumb="Privacy"
        title="Privacy Policy"
        lede="What we hold, why we hold it, how long we keep it, and how to make us delete it. Written to be read, not to be skipped."
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

            <Section title="Who we are">
              <p>
                {SITE.legalName} (&ldquo;{SITE.name}&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;) is the data controller for the personal data described in
                this policy. We are a company registered in England and Wales, trading from{' '}
                {SITE.address.street}, {SITE.address.district}, {SITE.address.city},{' '}
                {SITE.address.postcode}.
              </p>
              <p>
                Questions, requests and complaints about your data should go to our data
                protection lead at{' '}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-gold underline decoration-gold/30 underline-offset-4 transition-colors hover:decoration-gold"
                >
                  {SITE.email}
                </a>{' '}
                or by telephone on {SITE.phone}. We answer within five working days.
              </p>
            </Section>

            <Section title="The data we collect">
              <p>
                <span className="text-bone">Reservations.</span> Your name, email address,
                telephone number, party size, service date and any notes you give us —
                including dietary requirements, allergies and the occasion you are marking.
                Allergy information is special category data concerning health, and we
                handle it accordingly.
              </p>
              <p>
                <span className="text-bone">Orders and payments.</span> Delivery address,
                order contents and the last four digits of your card. Full card details are
                captured by our payment processor (Stripe Payments UK Ltd) and never reach
                our servers.
              </p>
              <p>
                <span className="text-bone">Correspondence.</span> Enquiries about private
                dining, gift cards, press and recruitment, together with anything you choose
                to include in them.
              </p>
              <p>
                <span className="text-bone">Marketing.</span> Your email address, if you ask
                us for the Journal, plus whether you opened it.
              </p>
              <p>
                <span className="text-bone">Technical.</span> IP address, browser and device
                type, and the pages you looked at. We do not use this to identify you as an
                individual.
              </p>
            </Section>

            <Section title="Why we use it, and our lawful basis">
              <p>
                <span className="text-bone">Contract.</span> Taking and holding your
                reservation, fulfilling an order, and arranging a private event. Without
                this data we cannot seat you.
              </p>
              <p>
                <span className="text-bone">Legitimate interests.</span> Remembering that
                you dislike the table by the door, keeping our kitchen and cellar records,
                preventing no-shows and fraud, and improving the restaurant. We have
                balanced these interests against your rights and you may object at any time.
              </p>
              <p>
                <span className="text-bone">Consent.</span> Marketing emails and
                non-essential cookies. You gave it freely and you can withdraw it in one
                click, with no effect on anything else.
              </p>
              <p>
                <span className="text-bone">Explicit consent.</span> Allergy and health
                information, which we process only so that the kitchen can cook safely for
                you.
              </p>
              <p>
                <span className="text-bone">Legal obligation.</span> Retaining transaction
                records for HMRC and complying with food safety law.
              </p>
            </Section>

            <Section title="Who we share it with">
              <p>
                We do not sell your data and we never will. We share it only with processors
                acting on our written instructions: our reservations platform, our payment
                processor, our email provider, and our IT hosting supplier. Each is bound by
                a contract that meets Article 28 of the UK GDPR.
              </p>
              <p>
                Where a supplier operates outside the UK, transfers are made under UK
                adequacy regulations or the International Data Transfer Addendum.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                Strictly necessary cookies keep your basket and your session alive; these
                run without consent because the site cannot function without them.
                Analytics cookies tell us which pages are read and which are ignored, and
                run only if you accept them. We set no advertising cookies and we do not
                permit third-party tracking pixels on this site.
              </p>
              <p>
                You can change your choice at any time from the cookie link in the footer,
                or clear cookies entirely in your browser settings.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                Reservation and dietary records are kept for twenty-four months after your
                last visit, then deleted. Transaction records are kept for six full
                financial years, because HMRC requires it. Marketing consent is kept until
                you withdraw it, and for twelve months afterwards as proof that you did.
                CCTV in the entrance and cellar is overwritten after thirty-one days.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                Under the UK GDPR you have the right to be informed, the right of access,
                and the rights to rectification, erasure, restriction, portability and
                objection — including an absolute right to object to direct marketing. Where
                we rely on consent, you may withdraw it at any moment.
              </p>
              <p>
                Exercise any of these by emailing {SITE.email}. We will not charge you and
                we will not ask why. If you are unhappy with our response you may complain
                to the Information Commissioner&rsquo;s Office at ico.org.uk or on 0303 123
                1113, though we would be grateful for the chance to put it right first.
              </p>
            </Section>

            <Section title="Security">
              <p>
                Data is encrypted in transit and at rest. Access is limited to the staff who
                need it to do their jobs, reviewed quarterly, and revoked the day someone
                leaves. In the unlikely event of a breach that risks your rights, we will
                notify the ICO within seventy-two hours and tell you directly without undue
                delay.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                If we change how we use your data in any material way, we will update this
                page and, where the change affects you meaningfully, tell you by email
                before it takes effect.
              </p>
            </Section>
          </div>
        </motion.article>
      </div>
    </>
  );
}
