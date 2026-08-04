'use client';

import { useActionState } from 'react';
import { joinClass, ActionResult } from '@/lib/actions/class-actions';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function StudentDashboardClient() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(joinClass, null);

  return (
    <Card className="w-full bg-white hoverable={false}">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Join a Class
        </h2>
        <form action={formAction} className="space-y-4">
          <div>
            <Input id="key" name="key" required placeholder="e.g. MATH101" label="Class Key" />
          </div>
          <div>
            <Input id="rollNo" name="rollNo" required placeholder="Your Roll Number" label="Roll Number" />
          </div>
          <div>
            <Input id="school" name="school" required placeholder="Your School Name" label="School" />
          </div>
          {state?.error && (
            <p className="text-red-600 bg-red-50 font-medium text-sm p-3 rounded-lg border border-red-200">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="text-green-600 bg-green-50 font-medium text-sm p-3 rounded-lg border border-green-200">
              Successfully joined class!
            </p>
          )}
          <Button type="submit" className="w-full mt-2" size="lg" disabled={isPending}>
            {isPending ? 'Joining...' : 'Join Class'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
