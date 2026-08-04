'use client';

import { useActionState } from 'react';
import { joinClass, ActionResult } from '@/lib/actions/class-actions';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function StudentDashboardClient() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(joinClass, null);

  return (
    <div className="w-full relative perspective-1000">
      <div className="absolute -top-4 -right-4 bg-[#C6FF3D] text-[#18102B] font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-6 z-20">
        FAST JOIN
      </div>
      <Card className="w-full bg-[#18102B] border-4 border-black text-white hoverable={false} p-8 rounded-[32px] shadow-[10px_10px_0px_rgba(0,0,0,1)] z-10 relative">
        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
          Join a Class
        </h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase text-[#C6FF3D] mb-1 block">Class Key</label>
            <Input id="key" name="key" required placeholder="e.g. MATH101" className="bg-white text-black font-bold border-2 border-black" />
          </div>
          <div>
            <label className="text-xs font-black uppercase text-[#C6FF3D] mb-1 block">Roll Number</label>
            <Input id="rollNo" name="rollNo" required placeholder="Your Roll Number" className="bg-white text-black font-bold border-2 border-black" />
          </div>
          <div>
            <label className="text-xs font-black uppercase text-[#C6FF3D] mb-1 block">School</label>
            <Input id="school" name="school" required placeholder="Your School Name" className="bg-white text-black font-bold border-2 border-black" />
          </div>
          {state?.error && (
            <p className="text-white bg-[#FF6B35] font-black text-xs uppercase p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mt-2">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="text-[#18102B] bg-[#C6FF3D] font-black text-xs uppercase p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mt-2">
              Successfully joined class!
            </p>
          )}
          <Button type="submit" className="w-full mt-6 bg-[#C6FF3D] text-black hover:bg-white text-lg py-6" size="lg" disabled={isPending}>
            {isPending ? 'Joining...' : 'Join Class'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
