'use client';

import { useState } from 'react';
import { browsePublicChapters, linkChapterToClass } from '@/lib/actions/browse-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { TicketCard, TicketColor } from '@/components/ui/TicketCard';
import { PillButton } from '@/components/ui/PillButton';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

const ticketColors: TicketColor[] = ['blue', 'green', 'yellow', 'pink', 'purple'];

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
      setToast({ message: 'Search failed', type: 'error' });
    }
    setIsSearching(false);
  };

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapter || !selectedClassId) return;
    
    setIsLinking(true);
    const result = await linkChapterToClass(selectedChapter.id, selectedClassId);
    if (result.success) {
      setToast({ message: 'Chapter added to class successfully!', type: 'success' });
      setSelectedChapter(null);
    } else {
      setToast({ message: result.error || 'Failed to add chapter. It might already be in this class.', type: 'error' });
    }
    setIsLinking(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-4 mb-10 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <Input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search topics, titles, or subjects..." 
          className="flex-1 border-0 focus:ring-0 text-lg bg-transparent shadow-none"
        />
        <PillButton 
          color="purple" 
          label={isSearching ? 'Searching...' : 'Search'} 
          icon={<Search />} 
          type="submit"
        />
      </form>

      {toast && (
        <div className={`p-4 mb-8 rounded-xl font-bold text-center ${toast.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {chapters.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
            <p className="text-xl font-medium">No public chapters found.</p>
            <p className="mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          chapters.map((chapter, index) => {
            const color = ticketColors[index % ticketColors.length];
            const dateAdded = new Date(chapter.createdAt).toLocaleDateString('en-GB');

            return (
              <TicketCard
                key={chapter.id}
                color={color}
                topLeftText="PUBLIC"
                topRightText={dateAdded}
                title={chapter.title}
                subtitle={`By ${chapter.owner?.name || 'Unknown Author'}`}
                statusBadge={
                  <span className="px-2 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                    {chapter._count?.contents || 0} Sections
                  </span>
                }
                priceText="Free"
              >
                <Link href={`/chapters/${chapter.id}`}>
                  <PillButton 
                    color="light" 
                    label="View Content" 
                    className="px-4 py-2 text-xs" 
                  />
                </Link>
                <PillButton 
                  color="dark" 
                  label="Add to Class" 
                  className="px-4 py-2 text-xs" 
                  icon={<Plus className="w-3 h-3" />} 
                  onClick={() => setSelectedChapter(chapter)}
                />
              </TicketCard>
            );
          })
        )}
      </div>

      <Modal isOpen={!!selectedChapter} onClose={() => setSelectedChapter(null)} title="Add Chapter to Class">
        {selectedChapter && (
          <form onSubmit={handleLink} className="space-y-6">
            <p className="text-slate-600 font-medium">
              Select a class to add <strong className="text-slate-900">{selectedChapter.title}</strong> to:
            </p>
            <select 
              value={selectedClassId} 
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>Select a class...</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
            
            <div className="flex justify-end gap-3 mt-8">
              <Button type="button" variant="ghost" onClick={() => setSelectedChapter(null)}>Cancel</Button>
              <Button type="submit" disabled={isLinking || !selectedClassId} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6">
                {isLinking ? 'Adding...' : 'Add Chapter'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
