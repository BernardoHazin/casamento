import { CountdownSection } from "./components/wedding/countdown-section";
import { DressCodeSection } from "./components/wedding/dress-code-section";
import { FooterSection } from "./components/wedding/footer-section";
import { GiftListSection } from "./components/wedding/gift-list-section";
import { HeroSection } from "./components/wedding/hero-section";
import { RsvpSection } from "./components/wedding/rsvp-section";
import { TimelineSection } from "./components/wedding/timeline-section";
import { VenueSection } from "./components/wedding/venue-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col max-w-[500px] mx-auto">
      <HeroSection />
      <CountdownSection />
      <VenueSection />
      <GiftListSection />
      <RsvpSection />
      <TimelineSection />
      <DressCodeSection />
      <FooterSection />
    </main>
  );
}
