import { InvitationGate } from '@/components/InvitationGate';
import { Agenda } from '@/components/sections/Agenda';
import { Dresscode } from '@/components/sections/Dresscode';
import { Hero } from '@/components/sections/Hero';
import { Portrait, TwoSouls, Veil, Welcome } from '@/components/sections/Story';
import { Rsvp } from '@/components/sections/Rsvp';
import { Closing, ThankYou } from '@/components/sections/ThankYou';
import { WeddingInfo } from '@/components/sections/WeddingInfo';

export default function Page() {
  return (
    <InvitationGate>
      <main className="stage">
        <Hero />
        <Welcome />
        <Veil />
        <TwoSouls />
        <Portrait />
        <WeddingInfo />
        <Agenda />
        <Dresscode />
        <Rsvp />
        <ThankYou />
        <Closing />
      </main>
    </InvitationGate>
  );
}
