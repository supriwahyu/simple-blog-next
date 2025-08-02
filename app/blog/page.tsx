import BlogCard from '@/components/BlogCard'
import { getAllBlogs } from '@/lib/blog'

export default async function BlogList() {
  const blogs = await getAllBlogs()
  return (
    <div>
      <h1>All Posts</h1>
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  )
}
