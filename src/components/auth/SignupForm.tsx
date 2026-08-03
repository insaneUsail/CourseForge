'use client';

import { useActionState, useEffect, useState } from 'react';
import { signUpAction } from '@/lib/actions/auth-actions';
import { ActionResult } from '@/lib/actions/class-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export function SignupForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(signUpAction, null);
  const { toast } = useToast();
  const [role, setRole] = useState<'STUDENT' | 'TEACHER' | null>(null);

  useEffect(() => {
    if (state?.error) {
      toast(state.error, 'error');
    }
  }, [state?.error, toast]);

  if (!role) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <h2 className="text-xl font-bold text-center text-text-default">Choose your role</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => setRole('TEACHER')}
            className="flex-1 bg-white text-slate-800 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex flex-col items-center gap-3 shadow-sm"
          >
            <span className="text-4xl mb-2">👨‍🏫</span>
            <span className="font-bold">I want to teach</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className="flex-1 bg-white text-slate-800 p-6 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex flex-col items-center gap-3 shadow-sm"
          >
            <span className="text-4xl mb-2">👨‍🎓</span>
            <span className="font-bold">I want to learn</span>
          </button>
        </div>
        <div className="text-center mt-4">
          <Link href="/login" className="text-sm text-text-muted-light hover:text-text-default">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-muted-light">
          Signing up as: <strong className="text-text-default">{role === 'TEACHER' ? 'Teacher' : 'Student'}</strong>
        </span>
        <button type="button" onClick={() => setRole(null)} className="text-xs text-accent hover:underline">
          Change
        </button>
      </div>
      
      <input type="hidden" name="role" value={role} />
      
      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="John Doe"
        required
      />
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
        {isPending ? 'Creating Account...' : 'Create Account'}
      </Button>
      <div className="text-center mt-4">
        <Link href="/login" className="text-sm text-text-muted-light hover:text-text-default">
          Already have an account? Log in
        </Link>
      </div>
    </form>
  );
}
