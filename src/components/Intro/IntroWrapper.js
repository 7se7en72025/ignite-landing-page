'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Render the map only in the browser to avoid server/client projection differences.
const Intro = dynamic(() => import('./Intro'), { ssr: false });

export default function IntroWrapper() {
  const [show, setShow] = useState(true);
  return show ? <Intro onComplete={() => setShow(false)} /> : null;
}
