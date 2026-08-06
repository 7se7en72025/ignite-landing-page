'use client';

import { Reveal } from '@/components/ui/reveal';
import siteContent from '@/data/siteContent';
import styles from './GetInvolved.module.css';

export default function GetInvolved() {
  const { getInvolved: gi } = siteContent;

  return (
    <section id="get-involved" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal as="span" className={styles.eyebrow} y={12} duration={0.6}>{gi.label}</Reveal>
          <Reveal as="h2" className={styles.title} delay={0.06}>
            {gi.title} <em className={styles.em}>{gi.titleAccent}</em>
          </Reveal>
          <Reveal as="p" className={styles.body} delay={0.14}>{gi.body}</Reveal>
        </div>

        <ol className={styles.steps}>
          {gi.steps.map(({ step, title, desc }) => (
            <li key={step} className={styles.step}>
              <span className={styles.stepNum}>{step}</span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepDesc}>{desc}</p>
            </li>
          ))}
        </ol>

        <div className={styles.actions}>
          <a href={gi.ctaPrimary.href} className={styles.ctaPrimary}>
            {gi.ctaPrimary.label}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href={gi.ctaSecondary.href} className={styles.ctaSecondary}>
            {gi.ctaSecondary.label}
          </a>
        </div>

        <p className={styles.note}>{gi.note}</p>
      </div>
    </section>
  );
}
