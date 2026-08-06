import IntroWrapper from '@/components/Intro/IntroWrapper';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Sponsors from '@/components/Sponsors/Sponsors';
import Features from '@/components/Features';
import Ignite2026 from '@/components/Ignite2026/Ignite2026';
import Institutions from '@/components/Institutions/Institutions';
import DarkSection from '@/components/DarkSection';
import SpeakersGrid from '@/components/SpeakersGrid';
import PreviousEditions from '@/components/PreviousEditions/PreviousEditions';
import TimelineGrid from '@/components/TimelineGrid';
import GetInvolved from '@/components/GetInvolved/GetInvolved';
import Venue from '@/components/Venue/Venue';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <IntroWrapper />
      <Navbar />
      <Hero />
      <Sponsors />
      <Features />
      <Ignite2026 />
      <Institutions />
      <DarkSection />
      <SpeakersGrid />
      <PreviousEditions />
      <TimelineGrid />
      <GetInvolved />
      <Venue />
      <Footer />
    </>
  );
}
