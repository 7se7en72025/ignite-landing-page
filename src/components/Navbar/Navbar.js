'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import siteContent from '@/data/siteContent';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { nav } = siteContent;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.barScrolled : ''}`}>
        <Link href="/#hero" className={styles.logo}>
          <span className={styles.logoMark}>{nav.logoText}</span>
          <span className={styles.logoYear}>{nav.logoYear}</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {nav.links.map((l) => (
            <Link key={l.label} href={l.href} className={styles.link}>{l.label}</Link>
          ))}
        </nav>

        <Link href={nav.ctaHref} className={styles.cta} data-magnetic>{nav.ctaText}</Link>

        <button
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`${styles.toggleBar} ${open ? styles.toggleBarTop : ''}`} />
          <span className={`${styles.toggleBar} ${open ? styles.toggleBarBottom : ''}`} />
        </button>
      </header>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>
        <nav className={styles.sheetNav}>
          {nav.links.map((l, i) => (
            <Link
              key={l.label}
              href={l.href}
              className={styles.sheetLink}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={nav.ctaHref}
            className={styles.sheetCta}
            style={{ transitionDelay: open ? `${80 + nav.links.length * 45}ms` : '0ms' }}
            onClick={() => setOpen(false)}
          >
            {nav.ctaText}
          </Link>
        </nav>
      </div>
    </>
  );
}
