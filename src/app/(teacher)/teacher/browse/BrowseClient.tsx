'use client';

import { useState } from 'react';
import { browsePublicChapters, linkChapterToClass } from '@/lib/actions/browse-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { TicketCard } from '@/components/ui/TicketCard';
import { Badge } from '@/components/ui/Badge';
import { Plus, Search, BookOpen, User } from 'lucide-react';
import Link from 'next/link';

export default function BrowseClient({ classes, initialChapters }: { classes: any[], initialChapters: any[] }) {
  const [query, setQuery] = useState('');
  const [chapters, setChapters] = useState<any[]>(initialChapters);
  const [isSearching, setIsSearching] = useState(false);
  
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setChapters(initialChapters);
      return;
    }

    setIsSearching(true);
    const result = await browsePublicChapters(query);
    if (result) {
      setChapters(result);
    } else {
      setToast({ message: 'SEARCH FAILED', type: 'error' });
    }
    setIsSearching(false);
  };

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapter || !selectedClassId) return;
    
    setIsLinking(true);
    const result = await linkChapterToClass(selectedChapter.id, selectedClassId);
    if (result.success) {
      setToast({ message: 'CHAPTER ADDED TO CLASS SUCCESSFULLY!', type: 'success' });
      setSelectedChapter(null);
    } else {
      setToast({ message: result.error?.toUpperCase() || 'FAILED TO ADD CHAPTER. IT MIGHT ALREADY BE IN THIS CLASS.', type: 'error' });
    }
    setIsLinking(false);
  };

  const ticketColors = ['blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'teal'];

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-12 bg-[#18102B] p-4 md:p-8 rounded-[32px] border-2 md:border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-16 md:w-32 h-16 md:h-32 bg-[#C6FF3D] rounded-full blur-2xl opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-16 md:w-32 h-16 md:h-32 bg-[#FF6B35] rounded-full blur-2xl opacity-20"></div>
        <Input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="SEARCH TOPICS, TITLES..." 
          className="flex-1 text-lg bg-white border-2 border-black font-black uppercase text-black z-10"
          label=""
        />
        <Button 
          type="submit"
          size="lg"
          className="gap-2 self-end sm:self-center bg-[#C6FF3D] text-black hover:bg-white z-10"
        >
          <Search className="w-6 h-6" />
          <span className="font-black tracking-widest">{isSearching ? 'SEARCHING...' : 'SEARCH'}</span>
        </Button>
      </form>

      {toast && (
        <div className={`p-4 mb-6 md:mb-12 rounded-xl font-black text-center border-2 md:border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] uppercase tracking-wider ${toast.type === 'success' ? 'bg-[#C6FF3D] text-[#18102B]' : 'bg-[#FF6B35] text-white'}`}>
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-8">
        {chapters.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-[#F5F3FF] rounded-[32px] border-2 md:border-4 border-dashed border-[#18102B] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 md:w-24 md:w-48 h-12 md:h-24 md:h-48 bg-[#60A5FA] rounded-full blur-3xl opacity-30"></div>
            <Search className="w-16 h-16 mx-auto mb-6 text-[#18102B] opacity-50 relative z-10" />
            <p className="text-xl md:text-3xl font-black text-[#18102B] uppercase tracking-tighter relative z-10">No chapters found.</p>
            <p className="mt-2 text-[#18102B] font-bold bg-[#F0E100] px-4 py-1.5 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] inline-block relative z-10 -rotate-2">Try adjusting your search query.</p>
          </div>
        ) : (
          chapters.map((chapter, idx) => {
            const dateAdded = new Date(chapter.createdAt).toLocaleDateString('en-GB');
            const color = ticketColors[idx % ticketColors.length] as any;

            return (
              <TicketCard 
                key={chapter.id} 
                color={color}
                title={chapter.title}
                subtitle={`By ${chapter.owner?.name || 'Unknown'}`}
                topLeftText={dateAdded}
                topRightText="Public"
                priceText={`${chapter._count?.contents || 0} Sections`}
                className="min-h-[280px]"
              >
                {/* Action Footer */}
                <div className="mt-6 pt-4 border-t-2 border-dashed border-black/30 flex gap-4">
                  <Link href={`/chapters/${chapter.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full text-sm bg-white font-black hover:bg-gray-100">
                      View
                    </Button>
                  </Link>
                  <Button 
                    className="flex-1 gap-1 text-sm font-black bg-[#18102B] text-white hover:bg-[#C6FF3D] hover:text-[#18102B]"
                    onClick={() => setSelectedChapter(chapter)}
                  >
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </div>
              </TicketCard>
            );
          })
        )}
      </div>

      <Modal isOpen={!!selectedChapter} onClose={() => setSelectedChapter(null)} title="ADD TO CLASS">
        {selectedChapter && (
          <form onSubmit={handleLink} className="space-y-6">
            <p className="text-[#18102B] font-bold text-sm bg-[#F5F3FF] p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Select a class to add <strong className="font-black underline decoration-2">{selectedChapter.title}</strong> to:
            </p>
            <div>
              <label className="block text-xs font-black uppercase text-[#18102B] mb-2 tracking-widest">Select Class</label>
              <select 
                value={selectedClassId} 
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full p-4 rounded-xl bg-white border-2 border-black text-[#18102B] font-bold focus:outline-none focus:ring-4 focus:ring-[#834DFB]/50 transition-shadow shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                required
              >
                <option value="" disabled>Choose a class...</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-4 mt-4 md:mt-8">
              <Button type="button" variant="ghost" onClick={() => setSelectedChapter(null)} className="border-2 border-transparent hover:border-black font-bold">Cancel</Button>
              <Button type="submit" disabled={isLinking || !selectedClassId} className="bg-[#18102B] text-white font-black uppercase tracking-widest px-4 md:px-8">
                {isLinking ? 'ADDING...' : 'ADD CHAPTER'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
