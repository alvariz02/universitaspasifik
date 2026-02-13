'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Button } from '@/components/ui/button'
import { 
  Bold as BoldIcon, 
  Italic as ItalicIcon, 
  Underline as UnderlineIcon,
  Type as TypeIcon,
  Heading1 as H1Icon,
  Heading2 as H2Icon,
  Heading3 as H3Icon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder = "Mulai menulis...", className = "" }: RichTextEditorProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    // prevent SSR hydration mismatch
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-50 p-4 border border-unipas-primary/20 rounded-lg focus:border-unipas-accent bg-white ${className}`,
        placeholder: placeholder,
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!isClient) {
    return (
      <div className="min-h-50 p-4 border border-unipas-primary/20 rounded-lg bg-unipas-muted animate-pulse">
        <div className="h-4 bg-unipas-primary/20 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-unipas-primary/20 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-unipas-primary/20 rounded w-5/6"></div>
      </div>
    )
  }

  if (!editor) {
    return null
  }

  const setHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run()
  }

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run()
  }

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run()
  }

  const toggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run()
  }

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run()
  }

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run()
  }

  const setParagraph = () => {
    editor.chain().focus().setParagraph().run()
  }

  return (
    <div className="border border-unipas-primary/20 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-unipas-muted border-b border-unipas-primary/20 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-unipas-primary/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={setParagraph}
            className={`h-8 w-8 p-0 ${editor.isActive('paragraph') ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Paragraf"
          >
            <TypeIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(1)}
            className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Heading 1"
          >
            <H1Icon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(2)}
            className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Heading 2"
          >
            <H2Icon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(3)}
            className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 3 }) ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Heading 3"
          >
            <H3Icon className="h-4 w-4" />
          </Button>
        </div>

        {/* Style Formatting */}
        <div className="flex items-center gap-1 border-r border-unipas-primary/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleBold}
            className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Bold"
          >
            <BoldIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleItalic}
            className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Italic"
          >
            <ItalicIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleUnderline}
            className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleBulletList}
            className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Bullet List"
          >
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleOrderedList}
            className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-unipas-accent text-white' : 'text-unipas-primary hover:bg-unipas-primary/10'}`}
            title="Ordered List"
          >
            <ListOrderedIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-75">
        <EditorContent editor={editor} />
      </div>

      {/* Character Count */}
      <div className="bg-unipas-muted border-t border-unipas-primary/20 px-4 py-2 text-xs text-unipas-text">
        {editor.storage.characterCount?.characters() || 0} karakter
      </div>
    </div>
  )
}
