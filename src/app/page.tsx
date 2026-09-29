import { InvitationGate } from '@/components/InvitationGate';
import { Agenda } from '@/components/sections/Agenda';
import { Dresscode } from '@/components/sections/Dresscode';
import { Hero } from '@/components/sections/Hero';
import { Rsvp } from '@/components/sections/Rsvp';
import { ThankYou } from '@/components/sections/ThankYou';

export default function Page() {
  return (
    <InvitationGate>
      <main className="stage">
        <Hero />
        <Agenda />
        <Dresscode />
        <Rsvp />
        <ThankYou />
      </main>
    </InvitationGate>
  );
}
