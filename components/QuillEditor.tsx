'use client'

import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function QuillEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your content...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      })

      // Listen for content changes
      quillRef.current.on('text-change', () => {
        const html = editorRef.current!.querySelector('.ql-editor')?.innerHTML || ''
        onChange(html)
      })

      // Set initial value if any
      if (value) {
        quillRef.current.root.innerHTML = value
      }
    }
  }, [mounted])

  return (
    <div className="bg-white border rounded">
      {mounted && <div ref={editorRef} style={{ minHeight: '200px' }} />}
    </div>
  )
}
