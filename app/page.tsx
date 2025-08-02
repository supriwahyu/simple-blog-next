import { getAllBlogs } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'

export default async function HomePage() {
  const blogs = await getAllBlogs()

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </main>
  )
}
