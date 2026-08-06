'use client';

import siteContent from '@/data/siteContent';
import LogoSlider from '@/components/ui/logo-slider';
import styles from './Sponsors.module.css';

export default function Sponsors() {
  const { sponsors } = siteContent;

  const logoElements = sponsors.logos.map((logo, i) => (
    <img key={i} src={logo.src} alt={logo.alt} loading="lazy" />
  ));

  return (
    <section className={styles.section}>
      <p className={styles.label}>{sponsors.label}</p>
      <LogoSlider
        logos={logoElements}
        speed={40}
        direction="left"
        pauseOnHover={true}
      />
    </section>
  );
}
