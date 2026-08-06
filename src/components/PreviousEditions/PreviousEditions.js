'use client';

import { Reveal } from '@/components/ui/reveal';
import siteContent from '@/data/siteContent';
import styles from './PreviousEditions.module.css';

export default function PreviousEditions() {
  const { previousEditions: pe } = siteContent;

  return (
    <section id="editions" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <Reveal as="span" className={styles.eyebrow} y={12} duration={0.6}>{pe.label}</Reveal>
          <Reveal as="h2" className={styles.title} delay={0.06}>
            {pe.title} <em className={styles.em}>{pe.titleAccent}</em>
          </Reveal>
          <Reveal as="p" className={styles.body} delay={0.14}>{pe.body}</Reveal>
        </div>

        {/* ── Cumulative figures ── */}
        <dl className={styles.stats}>
          {pe.stats.map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <dt className={styles.statValue}>{value}</dt>
              <dd className={styles.statLabel}>{label}</dd>
            </div>
          ))}
        </dl>

        {/* ── Edition-by-edition timeline ── */}
        <ol className={styles.timeline}>
          {pe.timeline.map((ed) => (
            <li
              key={ed.year + ed.name}
              className={`${styles.edition} ${ed.upcoming ? styles.editionUpcoming : ''}`}
            >
              <div className={styles.editionYear}>
                <span className={styles.yearMark} aria-hidden="true" />
                {ed.year}
              </div>
              <div className={styles.editionBody}>
                <h3 className={styles.editionName}>
                  {ed.name}
                  {ed.upcoming && <span className={styles.upcomingTag}>Upcoming</span>}
                </h3>
                <p className={styles.editionPlace}>{ed.place}</p>
                <p className={styles.editionSummary}>{ed.summary}</p>
                <div className={styles.metrics}>
                  {ed.metrics.map((m) => (
                    <span key={m} className={styles.metric}>{m}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
