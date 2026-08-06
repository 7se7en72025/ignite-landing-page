'use client';

import { useEffect, useRef } from 'react';
import styles from './cursor.module.css';

/*
 * Custom cursor + magnetic targets.
 *
 * Everything runs on ONE rAF loop writing transforms directly to two nodes —
 * no React state, so pointer movement never triggers a render. Hover detection
 * is delegated on document rather than bound per-element, so adding links to
 * the page costs nothing.
 *
 * Opts out entirely on coarse pointers (touch) and under reduced-motion, where
 * a lagging fake cursor is worse than the real one.
 */

const MAGNET_SELECTOR = '[data-magnetic]';
const HOVER_SELECTOR = 'a, button, [data-cursor-hover]';
const MAGNET_STRENGTH = 0.32;
const MAGNET_MAX = 14;

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add(styles.hideNative);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let magnet = null;      // currently hovered magnetic element
    let magnetRect = null;
    let raf = 0;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(HOVER_SELECTOR)) ring.classList.add(styles.ringActive);

      const m = t.closest(MAGNET_SELECTOR);
      if (m && m !== magnet) {
        magnet = m;
        // Cache the rect on enter — reading it every frame would thrash layout
        magnetRect = m.getBoundingClientRect();
      }
    };

    const onOut = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(HOVER_SELECTOR)) ring.classList.remove(styles.ringActive);

      const m = t.closest(MAGNET_SELECTOR);
      if (m && m === magnet) {
        m.style.transform = '';
        magnet = null;
        magnetRect = null;
      }
    };

    // A scroll invalidates the cached rect
    const onScroll = () => {
      if (magnet) magnetRect = magnet.getBoundingClientRect();
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;

      dot.style.transform  = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      ring.style.transform = `translate3d(${rx - 19}px, ${ry - 19}px, 0)`;

      if (magnet && magnetRect) {
        const cx = magnetRect.left + magnetRect.width / 2;
        const cy = magnetRect.top + magnetRect.height / 2;
        const dx = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (mx - cx) * MAGNET_STRENGTH));
        const dy = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (my - cy) * MAGNET_STRENGTH));
        magnet.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('scroll', onScroll);
      document.body.classList.remove(styles.hideNative);
      if (magnet) magnet.style.transform = '';
    };
  }, []);

  return (
    <>
      <span ref={dotRef} className={styles.dot} aria-hidden="true" />
      <span ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
