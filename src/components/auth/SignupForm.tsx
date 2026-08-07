'use client';

import { useActionState, useEffect, useState } from 'react';
import { signUpAction, demoLoginAction } from '@/lib/actions/auth-actions';
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
      <div className="flex flex-col gap-2 md:gap-4 w-full">
        <h2 className="text-lg md:text-xl font-black text-center text-[#18102B] uppercase tracking-wider">Choose your path</h2>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-2 md:mt-4">
          <button
            type="button"
            onClick={() => setRole('TEACHER')}
            className="flex-1 bg-white text-[#18102B] p-3 md:p-4 rounded-2xl border-[3px] border-black hover:bg-[#C6FF3D] transition-transform flex flex-col items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none group"
          >
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-[#18102B] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="font-black uppercase tracking-wider text-xs md:text-sm mt-1">Teacher</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className="flex-1 bg-white text-[#18102B] p-3 md:p-4 rounded-2xl border-[3px] border-black hover:bg-[#FF6B35] transition-transform flex flex-col items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none group"
          >
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-[#18102B] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="font-black uppercase tracking-wider text-xs md:text-sm mt-1">Student</span>
          </button>
        </div>

        {/* Guest Demo Access */}
        <div className="mt-4 pt-4 border-t-2 border-black/10 flex flex-col gap-2">
          <h3 className="text-[10px] md:text-xs font-black text-center text-gray-500 uppercase tracking-widest mb-1">Want to just look around?</h3>
          <form action={demoLoginAction}>
            <input type="hidden" name="email" value="teacher@guest.com" />
            <input type="hidden" name="password" value="guest123" />
            <Button type="submit" variant="primary" className="w-full hover:bg-[#834DFB]" size="md">
              🎓 Try Demo as Teacher
            </Button>
          </form>
          <form action={demoLoginAction}>
            <input type="hidden" name="email" value="student@guest.com" />
            <input type="hidden" name="password" value="guest123" />
            <Button type="submit" variant="secondary" className="w-full hover:bg-[#C6FF3D]" size="md">
              🎒 Try Demo as Student
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 md:gap-4 w-full">
      <div className="flex items-center justify-between mb-2 bg-slate-50 border-[2px] border-black p-2 rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2">
          {role === 'TEACHER' ? <GraduationCap className="w-5 h-5 text-[#834DFB]" /> : <BookOpen className="w-5 h-5 text-[#FF6B35]" />}
          <span className="text-[11px] font-black uppercase tracking-widest text-[#18102B]">
            Role: <strong className="text-[#834DFB]">{role === 'TEACHER' ? 'Teacher' : 'Student'}</strong>
          </span>
        </div>
        <button 
          type="button" 
          onClick={() => setRole(null)} 
          className="text-[10px] font-black bg-white border border-black px-3 py-1 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#F0E100] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none uppercase tracking-wider transition-transform"
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
      <Button type="submit" disabled={isPending} className="mt-2 md:mt-4 w-full" size="md">
        {isPending ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      </Button>
    </form>
  );
}
