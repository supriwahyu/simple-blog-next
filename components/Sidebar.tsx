'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Admin Panel</h2>
      <nav className="space-y-4">
        <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/dashboard/posts" className="block text-gray-700 hover:text-blue-600">
          My Posts
        </Link>
        <Link href="/dashboard/create" className="block text-gray-700 hover:text-blue-600">
          Create Post
        </Link>
        <Link href="/settings" className="block text-gray-700 hover:text-blue-600">
          Settings
        </Link>
      </nav>
    </aside>
  )
}
