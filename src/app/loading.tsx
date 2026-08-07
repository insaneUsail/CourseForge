import React from 'react';
import Loader from '@/components/ui/Loader';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-white z-[9999]">
      <Loader />
      <span className="mt-6 text-sm font-black uppercase tracking-widest text-[#18102B]">
        Loading courseforge...
      </span>
    </div>
  );
}
