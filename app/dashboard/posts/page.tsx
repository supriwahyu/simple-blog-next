'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  created_at: string
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
  setLoading(true)
  try {
    const token = localStorage.getItem('token') // or however you store your token

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/master/post/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    setPosts(res.data.data)
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    setLoading(false)
  }
}

  const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this post?')) return

  const token = localStorage.getItem('token') // atau dari context/state

  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/master/post/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setPosts(posts.filter((post) => post.id !== id))
  } catch (error) {
    console.error('Delete failed:', error)
  }
}


  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1 px-6 py-10">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Posts</h1>
            <Link
              href="/dashboard/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + New Post
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">No posts found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-3 border-b">Title</th>
                    <th className="p-3 border-b">Slug</th>
                    <th className="p-3 border-b">Created</th>
                    <th className="p-3 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post: any) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{post.title}</td>
                      <td className="p-3 border-b">{post.slug}</td>
                      <td className="p-3 border-b">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 border-b text-center space-x-2">
                        <Link
                          href={`/dashboard/edit/${post.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
