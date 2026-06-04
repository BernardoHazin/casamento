import { CountdownSection } from "./components/wedding/countdown-section";
import { DressCodeSection } from "./components/wedding/dress-code-section";
import { GiftListSection } from "./components/wedding/gift-list-section";
import { HeroSection } from "./components/wedding/hero-section";
import { RsvpSection } from "./components/wedding/rsvp-section";
import { TimelineSection } from "./components/wedding/timeline-section";
import { VenueSection } from "./components/wedding/venue-section";
import { getConvidados } from "@/lib/convidados";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

export const revalidate = 300;

export default async function Home() {
  const guests = isFirebaseClientConfigured() ? await getConvidados() : [];

  return (
    <main className="flex w-full min-w-0 flex-1 flex-col">
      <HeroSection />
      <div className="mx-auto flex w-full min-w-0 max-w-[500px] flex-col">
        <CountdownSection />
        <VenueSection />
        <GiftListSection />
        <RsvpSection guests={guests} />
        <TimelineSection />
        <DressCodeSection />
      </div>
    </main>
  );
}
