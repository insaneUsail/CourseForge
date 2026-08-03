'use client';

import { useActionState, useEffect } from 'react';
import { loginAction } from '@/lib/actions/auth-actions';
import { ActionResult } from '@/lib/actions/class-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(loginAction, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast(state.error, 'error');
    }
  }, [state?.error, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <Input
        label="Email"
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
      <Button type="submit" disabled={isPending} className="mt-2 w-full">
        {isPending ? 'Logging in...' : 'Log in'}
      </Button>
      <div className="text-center mt-4">
        <Link href="/signup" className="text-sm text-text-muted-light hover:text-text-default">
          Don't have an account? Sign up
        </Link>
      </div>
    </form>
  );
}
