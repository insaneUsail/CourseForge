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
    <div className="w-full">
      <div className="flex flex-col gap-2 mb-4 pb-4 border-b-2 border-black/10">
        <form action={formAction}>
          <input type="hidden" name="email" value="teacher@guest.com" />
          <input type="hidden" name="password" value="guest123" />
          <Button type="submit" disabled={isPending} className="w-full bg-[#18102B] text-white hover:bg-[#7848df]" size="md">
            🎓 {isPending ? 'LOGGING IN...' : 'Login as Demo Teacher'}
          </Button>
        </form>

        <form action={formAction}>
          <input type="hidden" name="email" value="student@guest.com" />
          <input type="hidden" name="password" value="guest123" />
          <Button type="submit" disabled={isPending} className="w-full bg-[#18102B] border-2 border-black text-[#18102B] hover:bg-[#C6FF3D]" size="md">
            🎒 {isPending ? 'LOGGING IN...' : 'Login as Demo Student'}
          </Button>
        </form>
      </div>

      <form action={formAction} className="flex flex-col gap-2 md:gap-4 w-full">
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
        <Button type="submit" disabled={isPending} className="mt-2 md:mt-4 w-full" size="md">
          {isPending ? 'LOGGING IN...' : 'LOG IN'}
        </Button>
      </form>
    </div>
  );
}
