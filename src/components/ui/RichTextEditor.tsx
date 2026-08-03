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
    <div className="flex flex-wrap items-center gap-1 p-2 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)] rounded-t-md">
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleBold().run())}
        className={clsx('p-1.5 rounded transition-colors', editor.isActive('bold') ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]')}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleItalic().run())}
        className={clsx('p-1.5 rounded transition-colors', editor.isActive('italic') ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]')}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      
      <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
      
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        className={clsx('p-1.5 rounded transition-colors', editor.isActive('heading', { level: 1 }) ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]')}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        className={clsx('p-1.5 rounded transition-colors', editor.isActive('heading', { level: 2 }) ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]')}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

      <button
        onClick={toggleAction(() => editor.chain().focus().toggleBulletList().run())}
        className={clsx('p-1.5 rounded transition-colors', editor.isActive('bulletList') ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]')}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleOrderedList().run())}
        className={clsx('p-1.5 rounded transition-colors', editor.isActive('orderedList') ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]')}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={toggleAction(() => editor.chain().focus().toggleBlockquote().run())}
        className={clsx('p-1.5 rounded transition-colors', editor.isActive('blockquote') ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]')}
        title="Quote"
      >
        <Quote size={18} />
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
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[150px] p-4 text-slate-800',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className={clsx('border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent transition-all', className)}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
