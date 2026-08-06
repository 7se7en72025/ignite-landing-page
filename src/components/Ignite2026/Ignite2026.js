'use client';

import siteContent from '@/data/siteContent';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import styles from './Ignite2026.module.css';

export default function Ignite2026() {
  const { ignite2026 } = siteContent;

  return (
    <section id="ignite-2026" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal as="span" className={styles.eyebrow} y={12} duration={0.6}>
              {ignite2026.label}
            </Reveal>
            <Reveal as="h2" className={styles.title} delay={0.06}>
              {ignite2026.title}{' '}
              <em className={styles.em}>{ignite2026.titleAccent}</em>
            </Reveal>
            <Reveal as="p" className={styles.body} delay={0.14}>{ignite2026.body}</Reveal>

            <RevealGroup as="dl" className={styles.marks} stagger={0.09} delayChildren={0.1}>
              {ignite2026.marks.map(({ value, label }) => (
                <RevealItem key={label} className={styles.mark} y={18}>
                  <dt className={styles.markValue}>{value}</dt>
                  <dd className={styles.markLabel}>{label}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal as="figure" className={styles.figure} x={28} y={0} duration={0.9}>
            <img
              src={ignite2026.image.src}
              alt={ignite2026.image.alt}
              className={styles.image}
              loading="lazy"
              decoding="async"
            />
            <figcaption className={styles.caption}>
              <span className={styles.captionDot} aria-hidden="true" />
              Dubai · 2026
            </figcaption>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
