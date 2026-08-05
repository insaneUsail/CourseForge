'use client';

import { useActionState, useEffect, useState } from 'react';
import { signUpAction } from '@/lib/actions/auth-actions';
import { ActionResult } from '@/lib/actions/class-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { GraduationCap, BookOpen } from 'lucide-react';

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
      <div className="flex flex-col gap-3 md:gap-6 w-full">
        <h2 className="text-xl font-black text-center text-[#18102B] uppercase tracking-wider">Choose your path</h2>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mt-4">
          <button
            type="button"
            onClick={() => setRole('TEACHER')}
            className="flex-1 bg-white text-[#18102B] p-4 md:p-6 rounded-2xl border-[3px] border-black hover:bg-[#C6FF3D] transition-all flex flex-col items-center gap-3 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none group"
          >
            <GraduationCap className="w-12 h-12 text-[#18102B] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="font-black uppercase tracking-wider text-sm mt-2">Teacher</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className="flex-1 bg-white text-[#18102B] p-4 md:p-6 rounded-2xl border-[3px] border-black hover:bg-[#FF6B35] transition-all flex flex-col items-center gap-3 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none group"
          >
            <BookOpen className="w-12 h-12 text-[#18102B] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="font-black uppercase tracking-wider text-sm mt-2">Student</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3 md:gap-6 w-full">
      <div className="flex items-center justify-between mb-4 bg-slate-50 border-[2px] border-black p-3 rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2">
          {role === 'TEACHER' ? <GraduationCap className="w-5 h-5 text-[#834DFB]" /> : <BookOpen className="w-5 h-5 text-[#FF6B35]" />}
          <span className="text-[11px] font-black uppercase tracking-widest text-[#18102B]">
            Role: <strong className="text-[#834DFB]">{role === 'TEACHER' ? 'Teacher' : 'Student'}</strong>
          </span>
        </div>
        <button 
          type="button" 
          onClick={() => setRole(null)} 
          className="text-[10px] font-black bg-white border border-black px-3 py-1 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#F0E100] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none uppercase tracking-wider transition-all"
        >
          Change
        </button>
      </div>
      
      <input type="hidden" name="role" value={role} />
      
      <Input
        label="Full Name"
        name="name"
        type="text"
        placeholder="Jane Doe"
        required
      />
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
        {isPending ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      </Button>
    </form>
  );
}
