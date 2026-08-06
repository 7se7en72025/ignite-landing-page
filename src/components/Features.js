import styles from './Features.module.css';
import siteContent from '@/data/siteContent';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';

export default function Features() {
  const { about } = siteContent;
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal className={styles.label} y={12} duration={0.6}>{about.label}</Reveal>
          <div className={styles.headerTop}>
            <Reveal as="h2" className={styles.title} delay={0.06}>
              {about.title} <em>{about.titleAccent}</em>
            </Reveal>
            <Reveal as="p" className={styles.desc} delay={0.14}>{about.description}</Reveal>
          </div>
          <RevealGroup className={styles.lede} stagger={0.1}>
            {about.lede.map((para, i) => (
              <RevealItem as="p" key={i}>{para}</RevealItem>
            ))}
          </RevealGroup>
        </div>
        <RevealGroup className={styles.grid} stagger={0.1} amount={0.15}>
          {about.audiences.map((item, i) => (
            <RevealItem key={i} className={styles.card} y={28}>
              <div className={styles.number}>0{i+1}</div>
              <img src={item.icon} alt="" className={styles.icon} loading="lazy" decoding="async" />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
