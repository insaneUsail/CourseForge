'use client';

import { useState } from 'react';
import { browsePublicChapters, linkChapterToClass } from '@/lib/actions/browse-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
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

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm max-w-3xl mx-auto">
        <Input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search topics, titles..." 
          className="flex-1 text-lg"
          label=""
        />
        <Button 
          type="submit"
          size="lg"
          className="gap-2 self-end sm:self-center"
        >
          <Search className="w-5 h-5" />
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {toast && (
        <div className={`p-4 mb-8 rounded-lg font-medium text-center shadow-sm border ${toast.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {chapters.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-xl font-semibold text-gray-600">No chapters found.</p>
            <p className="mt-1 text-gray-500">Try adjusting your search query.</p>
          </div>
        ) : (
          chapters.map((chapter) => {
            const dateAdded = new Date(chapter.createdAt).toLocaleDateString('en-GB');

            return (
              <Card key={chapter.id} className="flex flex-col justify-between min-h-[260px] hover:border-blue-500 transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-gray-100 text-gray-700 font-medium">
                      {dateAdded}
                    </Badge>
                    <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                      {chapter._count?.contents || 0} Sections
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-3">
                    {chapter.title}
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-md mt-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      By {chapter.owner?.name || 'Unknown'}
                    </span>
                  </div>
                </div>
                
                {/* Action Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
                  <Link href={`/chapters/${chapter.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full text-sm bg-white">
                      View Content
                    </Button>
                  </Link>
                  <Button 
                    variant="primary" 
                    className="flex-1 gap-1 text-sm"
                    onClick={() => setSelectedChapter(chapter)}
                  >
                    <Plus className="w-4 h-4" /> Add to Class
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <Modal isOpen={!!selectedChapter} onClose={() => setSelectedChapter(null)} title="Add Chapter to Class">
        {selectedChapter && (
          <form onSubmit={handleLink} className="space-y-4">
            <p className="text-gray-700 font-medium text-sm">
              Select a class to add <strong className="font-semibold text-gray-900">{selectedChapter.title}</strong> to:
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Select Class</label>
              <select 
                value={selectedClassId} 
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                required
              >
                <option value="" disabled>Choose a class...</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <Button type="button" variant="ghost" onClick={() => setSelectedChapter(null)}>Cancel</Button>
              <Button type="submit" disabled={isLinking || !selectedClassId}>
                {isLinking ? 'Adding...' : 'Add Chapter'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
