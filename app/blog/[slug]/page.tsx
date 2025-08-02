import BlogContent from '@/components/BlogContent'
import { getBlogBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  const blogs = await getAllBlogs()
  return blogs.map((b) => ({ slug: b.slug }))
}

export default async function BlogDetail({ params }) {
  const blog = await getBlogBySlug(params.slug)
  return <BlogContent blog={blog} />
}
