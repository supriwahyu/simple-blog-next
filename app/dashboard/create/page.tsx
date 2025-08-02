'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import QuillEditor from '@/components/QuillEditor' // adjust path

export default function CreatePostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: null as File | null,
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, cover_image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('slug', form.slug)
      formData.append('excerpt', form.excerpt)
      formData.append('content', form.content)
      if (form.cover_image) {
        formData.append('cover_image', form.cover_image)
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/master/post/store`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      router.push('/dashboard/posts')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Excerpt</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                className="mt-1 w-full border rounded p-2"
              />
            </div>

            <QuillEditor value={form.content} onChange={(value) => setForm(prev => ({ ...prev, content: value }))} />
            <input type="hidden" name="content" value={form.content} />

            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Image</label>
              <input type="file" name="cover_image" onChange={handleFileChange} />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {submitting ? 'Submitting...' : 'Create Post'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
