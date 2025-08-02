import Link from 'next/link'
import { BlogPost } from '@/types/blog'

export default function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
          <p className="text-sm text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
          <p className="mt-2 text-gray-600">{blog.excerpt}</p>
        </div>
      </div>
    </Link>
  )
}
