'use client';

import siteContent from '@/data/siteContent';
import styles from './Footer.module.css';

export default function Footer() {
  const { footer } = siteContent;
  const hasDestination = ({ href }) => href && href !== '#';
  const links = footer.links.filter(hasDestination);
  const socialLinks = footer.social.filter(hasDestination);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandText} aria-hidden="true">IGNITE</div>

        <p className={styles.tagline}>{footer.tagline}</p>

        {links.length > 0 && (
          <div className={styles.links}>
            {links.map(link => (
              <a key={link.href} href={link.href} className={styles.link}>{link.label}</a>
            ))}
          </div>
        )}

        {socialLinks.length > 0 && (
          <div className={styles.socialLinks}>
            {socialLinks.map(link => (
              <a key={link.href} href={link.href} className={styles.socialLink}>{link.label}</a>
            ))}
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>{footer.copyright}</p>
          <a href="#top" className={styles.backToTop}>
            Back to top
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.glowOrb} aria-hidden="true" />
    </footer>
  );
}
