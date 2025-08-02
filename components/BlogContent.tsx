import { BlogPost } from '@/types/blog'

export default function BlogContent({ blog }: { blog: BlogPost }) {
  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        {new Date(blog.date).toLocaleDateString()}
      </p>
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}
      <div className="prose prose-lg max-w-none">
        {blog.content || 'No content available.'}
      </div>
    </article>
  )
}
