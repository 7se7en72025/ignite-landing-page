'use client';

import { useEffect, useRef } from 'react';
import siteContent from '@/data/siteContent';
import StatsCounter from '@/components/ui/stats-counter';
import { Reveal, RevealLines } from '@/components/ui/reveal';
import styles from './Hero.module.css';

/* The intro flies Pilani → Dubai; printing the destination's real coordinates
   keeps that thread running into the page instead of dropping it at the door. */
const DUBAI_COORDS = ['25.2048° N', '55.2708° E'];

export default function Hero() {
  const { hero } = siteContent;
  const rootRef = useRef(null);

  /* Pointer-tracked warm light + scroll parallax, both driven straight onto CSS
     custom properties from one rAF loop. Doing this through React state would
     re-render the whole masthead on every pointer move. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let tx = 0.5, ty = 0.4, cx = 0.5, cy = 0.4, scroll = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };
    const onScroll = () => { scroll = window.scrollY; };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty('--mx', `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty('--my', `${(cy * 100).toFixed(2)}%`);
      // Photo drifts slower than the copy — cheap depth, transform-only.
      el.style.setProperty('--par', `${(scroll * 0.16).toFixed(1)}px`);
      el.style.setProperty('--copy-par', `${(scroll * -0.05).toFixed(1)}px`);
      el.style.setProperty('--fade', String(Math.max(0, 1 - scroll / 620)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Splits "₹10L+" into prefix "₹", number 10, suffix "L+". Matching only from
  // the start of the string rendered a literal 0 in front of any value that
  // opened with a symbol — "₹10L+" came out as "0₹10L+".
  const parseStatValue = (value) => {
    const match = String(value).match(/^(\D*?)([\d.]+)(.*)$/s);
    if (!match) return { prefix: '', number: null, suffix: String(value) };
    return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] };
  };

  return (
    <section id="hero" className={styles.hero} ref={rootRef}>
      <div className={styles.photo} aria-hidden="true" />
      <div className={styles.grade} aria-hidden="true" />
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.embers} aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={styles.ember} style={{ '--i': i }} />
        ))}
      </div>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Meta rail ── */}
        <div className={styles.meta}>
          <Reveal className={styles.badge} y={10} duration={0.7} delay={0.15}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {hero.badge}
          </Reveal>

          <Reveal className={styles.coords} y={10} duration={0.7} delay={0.25}>
            {DUBAI_COORDS.map((c) => <span key={c}>{c}</span>)}
          </Reveal>
        </div>

        {/* ── Masthead ── */}
        <h1 className={styles.headline}>
          <RevealLines
            text={hero.headline}
            lineClassName={styles.line}
            delay={0.3}
            stagger={0.1}
          />
          <RevealLines
            text={hero.headlineAccent}
            lineClassName={`${styles.line} ${styles.lineAccent}`}
            delay={0.45}
          />
        </h1>

        <Reveal className={styles.rule} y={0} duration={1.1} delay={0.75} aria-hidden="true" />

        {/* ── Lede + actions ── */}
        <div className={styles.body}>
          <Reveal as="p" className={styles.description} delay={0.8}>
            {hero.description}
          </Reveal>

          <Reveal className={styles.ctas} delay={0.9}>
            <a href={hero.ctaPrimary.href} className={styles.ctaPrimary} data-magnetic>
              {hero.ctaPrimary.label}
            </a>
            <a href={hero.ctaSecondary.href} className={styles.ctaSecondary} data-magnetic>
              {hero.ctaSecondary.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>

      {/* ── Stat rail ── */}
      <Reveal className={styles.stats} delay={1} duration={0.9}>
        {hero.stats.map((stat) => {
          const { number, suffix, prefix } = parseStatValue(stat.value);
          return (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>
                {number === null
                  ? `${prefix}${suffix}`
                  : <StatsCounter value={number} prefix={prefix} suffix={suffix} duration={1.6} />}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          );
        })}
      </Reveal>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
