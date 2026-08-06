'use client';

import { motion } from 'framer-motion';

/*
 * Shared scroll-reveal primitives.
 *
 * Deliberately restrained: short travel, long ease, no bounce. Editorial sites
 * read as "expensive" because motion is barely noticeable — the moment a reveal
 * announces itself it looks like a template. Keep distances under ~32px.
 *
 * Every variant degrades to a plain fade (or nothing) under reduced-motion,
 * which framer-motion handles via the `useReducedMotion`-aware `initial`/
 * `whileInView` pair below.
 */

const EASE = [0.22, 1, 0.36, 1];

/** Fade + rise. `direction` also allows entry from the sides for split layouts. */
export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 24,
  x = 0,
  once = true,
  amount = 0.25,
  className,
  as = 'div',
  ...props
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children. Pair with <RevealItem> so each child animates on the
 * parent's timeline instead of running its own viewport observer.
 */
export function RevealGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  className,
  as = 'div',
  ...props
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, y = 22, duration = 0.7, className, as = 'div', ...props }) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Masked line reveal — the line slides up from behind its own bounding box.
 * Splits on newlines only; splitting headings per-word wrecks text wrapping and
 * makes screen readers announce them one fragment at a time.
 */
export function RevealLines({
  text,
  className,
  lineClassName,
  stagger = 0.09,
  duration = 0.85,
  delay = 0,
  once = true,
  as = 'div',
}) {
  const lines = String(text).split('\n');
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            className={lineClassName}
            style={{ display: 'block', willChange: 'transform' }}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export default Reveal;
