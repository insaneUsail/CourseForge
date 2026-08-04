import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { auth } from '@/lib/auth';
import LandingClientPage from './LandingClientPage';

export default async function Page() {
  const session = await auth();
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || '',
    role: session.user.role.toLowerCase() as 'teacher' | 'student'
  } : null;

  return (
    <div className="flex-1 flex flex-col bg-[#F5F3FF] selection:bg-[#834DFB] selection:text-white font-sans antialiased min-h-screen">
      <Navbar user={user} />
      <LandingClientPage user={user} />
      <Footer />
    </div>
  );
}
