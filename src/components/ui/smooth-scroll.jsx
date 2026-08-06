'use client';
import { useEffect } from 'react';
import Lenis from 'lenis'

export function SmoothScroll({
    children
}) {
    useEffect(() => {
        // Respect the OS setting — Lenis hijacks native scrolling, which is
        // exactly what reduced-motion users are asking us not to do.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.remove('loading');
            return;
        }

        const lenis = new Lenis()
        let rafId

        function raf(time) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        // Remove loading class
        document.body.classList.remove('loading');

        return () => {
            // Cancel the loop before destroying, otherwise the pending frame
            // calls raf() on a destroyed instance.
            cancelAnimationFrame(rafId)
            lenis.destroy()
        };
    }, [])

    return <>{children}</>
}

export default SmoothScroll
