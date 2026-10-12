import { InvitationGate } from '@/components/InvitationGate';
import { Agenda } from '@/components/sections/Agenda';
import { Dresscode } from '@/components/sections/Dresscode';
import { Hero } from '@/components/sections/Hero';
import { Invite } from '@/components/sections/Invite';
import { Planner } from '@/components/sections/Planner';
import { Portrait, TwoSouls, Veil, Welcome } from '@/components/sections/Story';
import { Rsvp } from '@/components/sections/Rsvp';
import { Closing, ThankYou } from '@/components/sections/ThankYou';

/* The order the invitation is read in: the sealed envelope, the line that
   invites, then the letter unpacked with where and when set under it, the
   closing band that brings the hall back, the couple's own screens, and the
   practical half — the evening, what to wear, and the reply. */
export default function Page() {
  return (
    <InvitationGate>
      <main className="stage">
        <Invite />
        <Hero />
        <Planner />
        <Welcome />
        <Veil />
        <TwoSouls />
        <Portrait />
        <Agenda />
        <Dresscode />
        <Rsvp />
        <ThankYou />
        <Closing />
      </main>
    </InvitationGate>
  );
}
