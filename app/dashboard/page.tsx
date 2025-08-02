'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

export default function DashboardPage() {
  useEffect(() => {
    document.title = 'Dashboard'
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to the Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-white rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
            <p className="text-gray-600">Manage and edit your blog posts here.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <p className="text-gray-600">View post stats and performance insights.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
