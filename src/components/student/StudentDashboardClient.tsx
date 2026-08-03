'use client';

import { useActionState } from 'react';
import { joinClass, ActionResult } from '@/lib/actions/class-actions';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function StudentDashboardClient() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(joinClass, null);

  return (
    <Card className="max-w-md w-full bg-surface">
      <div className="p-6">
        <h2 className="text-xl font-bold text-text-light mb-4">Join a Class</h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="key" className="block text-sm font-medium text-text-light mb-1">Class Key</label>
            <Input id="key" name="key" required placeholder="e.g. MATH101" />
          </div>
          <div>
            <label htmlFor="rollNo" className="block text-sm font-medium text-text-light mb-1">Roll Number</label>
            <Input id="rollNo" name="rollNo" required placeholder="Your Roll Number" />
          </div>
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-text-light mb-1">School</label>
            <Input id="school" name="school" required placeholder="Your School Name" />
          </div>
          {state?.error && <p className="text-error text-sm">{state.error}</p>}
          {state?.success && <p className="text-success text-sm">Successfully joined class!</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Joining...' : 'Join Class'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
