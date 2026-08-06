'use client';

import siteContent from '@/data/siteContent';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import styles from './Institutions.module.css';

export default function Institutions() {
  const { institutions } = siteContent;

  return (
    <section id="institutions" className={styles.section}>
      <div className={styles.container}>
        {institutions.map((org, i) => (
          <article key={org.id} id={org.id} className={styles.org}>

            <div className={styles.head}>
              <Reveal as="span" className={styles.eyebrow} y={12} duration={0.6}>
                {org.label}
              </Reveal>
              <Reveal as="h2" className={styles.title} delay={0.06}>
                {org.title} <em className={styles.em}>{org.titleAccent}</em>
              </Reveal>
            </div>

            <div className={styles.grid}>
              <RevealGroup className={styles.body} stagger={0.1}>
                {org.body.map((para, j) => <RevealItem as="p" key={j}>{para}</RevealItem>)}
                {org.link && (
                  <a href={org.link.href} className={styles.link}>
                    {org.link.label}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </RevealGroup>

              <RevealGroup as="dl" className={styles.facts} stagger={0.09}>
                {org.facts.map(({ value, label }) => (
                  <RevealItem key={label} className={styles.fact} y={18}>
                    <dt className={styles.factValue}>{value}</dt>
                    <dd className={styles.factLabel}>{label}</dd>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {i < institutions.length - 1 && <hr className={styles.sep} />}
          </article>
        ))}
      </div>
    </section>
  );
}
