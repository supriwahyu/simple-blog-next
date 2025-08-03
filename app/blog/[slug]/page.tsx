// app/blog/[slug]/page.tsx

import { getAllBlogs, getBlogById } from '@/lib/blog'
import BlogContent from '@/components/BlogContent'

export default async function BlogDetailPage({ params }: any) {
  const allBlogs = await getAllBlogs()
  const matched = allBlogs.find((b) => b.slug === params.slug)

  if (!matched) {
    return <div className="text-red-600 text-center py-10">Post not found</div>
  }

  const blog = await getBlogById(matched.id.toString())

  return blog ? <BlogContent blog={blog} /> : <div>Loading...</div>
}
