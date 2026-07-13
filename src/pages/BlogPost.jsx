import { useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HiOutlineArrowLongLeft, HiOutlineClock } from 'react-icons/hi2';
import Seo from '@/components/Seo';
import Image from '@/components/ui/Image';
import { Badge, Divider } from '@/components/ui/Misc';
import { BlogCard } from '@/components/cards/Cards';
import { SITE } from '@/constants';
import { POSTS, CHEFS } from '@/data';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

export default function BlogPost() {
  const { id } = useParams();
  const post = POSTS.find((p) => p.id === id);

  const articleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  if (!post) return <Navigate to="/blog" replace />;

  const author = CHEFS.find((c) => c.name === post.author);
  const related = POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    wordCount: post.body.join(' ').split(/\s+/).length,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blog/${post.id}`,
    },
    author: {
      '@type': 'Person',
      name: post.author,
      ...(author && { jobTitle: author.role }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
        schema={schema}
        breadcrumbs={[
          { name: 'Journal', path: '/blog' },
          { name: post.title, path: `/blog/${post.id}` },
        ]}
      />

      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gold"
      />

      <article ref={articleRef}>
        {/* Hero */}
        <header className="noise relative overflow-hidden pb-14 pt-32 sm:pt-40">
          <div className="shell relative z-10">
            <motion.nav
              variants={fadeUp}
              initial="hidden"
              animate="show"
              aria-label="Breadcrumb"
              className="mb-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-gold"
              >
                <HiOutlineArrowLongLeft className="h-4 w-4" />
                The Journal
              </Link>
            </motion.nav>

            <motion.div variants={stagger(0.09, 0.1)} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <Badge tone="gold">{post.category}</Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-4xl text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]"
              >
                {post.title}
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted"
              >
                <span className="text-bone">{post.author}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                <span className="inline-flex items-center gap-2">
                  <HiOutlineClock className="h-4 w-4 text-gold" aria-hidden="true" />
                  {post.readTime} min read
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 overflow-hidden rounded-card"
            >
              <Image
                src={post.image}
                alt={post.title}
                ratio="16/9"
                priority
                sizes="100vw"
              />
            </motion.div>
          </div>
        </header>

        {/* Body */}
        <div className="shell">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto max-w-2xl pb-20 pt-6 sm:pt-10"
          >
            {post.body.map((paragraph, i) => (
              <motion.p
                key={paragraph.slice(0, 32)}
                variants={fadeUp}
                className={
                  i === 0
                    ? 'mt-8 text-[1.05rem] leading-[2] text-bone/90 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:text-gilded'
                    : 'mt-8 text-[1.05rem] leading-[2] text-muted'
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </article>

      {/* Author bio */}
      {author && (
        <section className="shell pb-24" aria-labelledby="author-bio">
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="glass mx-auto flex max-w-2xl flex-col gap-7 rounded-card p-8 sm:flex-row sm:items-center sm:p-10"
          >
            <Image
              src={author.image}
              alt={author.name}
              ratio="1/1"
              className="h-24 w-24 shrink-0 rounded-full"
              sizes="96px"
            />

            <div>
              <span className="eyebrow">{author.role}</span>
              <h2 id="author-bio" className="mt-2 text-2xl text-bone">
                {author.name}
              </h2>
              <p className="mt-3 text-sm leading-[1.85] text-muted">{author.bio}</p>
            </div>
          </motion.aside>
        </section>
      )}

      {/* Related */}
      <section className="shell pb-28" aria-labelledby="more-journal">
        <Divider className="mb-20" />

        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="more-journal" className="text-3xl sm:text-4xl">
            More from the <span className="text-gilded">Journal</span>
          </h2>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gold"
          >
            <HiOutlineArrowLongLeft className="h-4 w-4" />
            All articles
          </Link>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid gap-6 sm:grid-cols-2"
        >
          {related.map((item, i) => (
            <BlogCard key={item.id} post={item} index={i} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
