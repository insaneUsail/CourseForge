'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote } from 'lucide-react';
import clsx from 'clsx';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const toggleAction = (action: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-[#F5F3FF] border-b-2 md:border-b-4 border-black rounded-t-xl shrink-0">
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleBold().run())}
        className={clsx('p-2 rounded-lg transition-transform border-2 font-black', editor.isActive('bold') ? 'bg-[#18102B] text-[#C6FF3D] border-black shadow-[2px_2px_0px_rgba(198,255,61,1)]' : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D]')}
        title="Bold"
      >
        <Bold size={18} strokeWidth={3} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleItalic().run())}
        className={clsx('p-2 rounded-lg transition-transform border-2 font-black', editor.isActive('italic') ? 'bg-[#18102B] text-[#C6FF3D] border-black shadow-[2px_2px_0px_rgba(198,255,61,1)]' : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D]')}
        title="Italic"
      >
        <Italic size={18} strokeWidth={3} />
      </button>
      
      <div className="w-1 h-6 bg-black mx-1 rounded-full opacity-20" />
      
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        className={clsx('p-2 rounded-lg transition-transform border-2 font-black', editor.isActive('heading', { level: 1 }) ? 'bg-[#18102B] text-[#C6FF3D] border-black shadow-[2px_2px_0px_rgba(198,255,61,1)]' : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D]')}
        title="Heading 1"
      >
        <Heading1 size={18} strokeWidth={3} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        className={clsx('p-2 rounded-lg transition-transform border-2 font-black', editor.isActive('heading', { level: 2 }) ? 'bg-[#18102B] text-[#C6FF3D] border-black shadow-[2px_2px_0px_rgba(198,255,61,1)]' : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D]')}
        title="Heading 2"
      >
        <Heading2 size={18} strokeWidth={3} />
      </button>

      <div className="w-1 h-6 bg-black mx-1 rounded-full opacity-20" />

      <button
        onClick={toggleAction(() => editor.chain().focus().toggleBulletList().run())}
        className={clsx('p-2 rounded-lg transition-transform border-2 font-black', editor.isActive('bulletList') ? 'bg-[#18102B] text-[#C6FF3D] border-black shadow-[2px_2px_0px_rgba(198,255,61,1)]' : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D]')}
        title="Bullet List"
      >
        <List size={18} strokeWidth={3} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleOrderedList().run())}
        className={clsx('p-2 rounded-lg transition-transform border-2 font-black', editor.isActive('orderedList') ? 'bg-[#18102B] text-[#C6FF3D] border-black shadow-[2px_2px_0px_rgba(198,255,61,1)]' : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D]')}
        title="Numbered List"
      >
        <ListOrdered size={18} strokeWidth={3} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleBlockquote().run())}
        className={clsx('p-2 rounded-lg transition-transform border-2 font-black', editor.isActive('blockquote') ? 'bg-[#18102B] text-[#C6FF3D] border-black shadow-[2px_2px_0px_rgba(198,255,61,1)]' : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D]')}
        title="Quote"
      >
        <Quote size={18} strokeWidth={3} />
      </button>
    </div>
  );
};

export function RichTextEditor({ value, onChange, placeholder = 'Start writing...', className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-slate max-w-none focus:outline-none min-h-[250px] p-4 md:p-6 text-[#18102B] font-medium leading-relaxed',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className={clsx('border-2 md:border-4 border-black rounded-2xl bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] focus-within:ring-4 focus-within:ring-[#C6FF3D] transition-transform flex flex-col overflow-hidden', className)}>
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
