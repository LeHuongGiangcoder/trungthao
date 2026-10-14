import { InvitationGate } from '@/components/InvitationGate';
import { Agenda } from '@/components/sections/Agenda';
import { Dresscode } from '@/components/sections/Dresscode';
import { Hero } from '@/components/sections/Hero';
import { Planner } from '@/components/sections/Planner';
import { Portrait, Welcome } from '@/components/sections/Story';
import { Rsvp } from '@/components/sections/Rsvp';

/* The order the invitation is read in: the couple's welcome, the letter
   unpacked with where and when set under it, the closing band that brings the
   hall back, the framed print, and the practical half — the evening, what to
   wear, and the reply. */
export default function Page() {
  return (
    <InvitationGate>
      <main className="stage">
        <Welcome />
        <Hero />
        <Planner />
        <Portrait />
        <Agenda />
        <Dresscode />
        <Rsvp />
      </main>
    </InvitationGate>
  );
}
