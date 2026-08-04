'use client';

import { useActionState, useEffect } from 'react';
import { loginAction } from '@/lib/actions/auth-actions';
import { ActionResult } from '@/lib/actions/class-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(loginAction, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast(state.error, 'error');
    }
  }, [state?.error, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-6 w-full">
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        required
      />
      <Button type="submit" disabled={isPending} className="mt-4 w-full" size="lg">
        {isPending ? 'LOGGING IN...' : 'LOG IN'}
      </Button>
    </form>
  );
}
