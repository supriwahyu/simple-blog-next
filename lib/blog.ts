import axios from 'axios'
import { BlogPost, BlogPostInput } from '@/types/blog'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ✅ GET: All posts
export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const res = await axios.get(`${BASE_URL}api/post/all`)
    return res.data.data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      date: item.created_at,
      coverImage: `${BASE_URL}storage/${item.cover_image}`,
      content: item.detail?.content || '',
    }))
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    return []
  }
}

// ✅ GET: One post by slug or ID
export async function getBlogById(id: string): Promise<BlogPost | null> {
  try {
    const res = await axios.get(`${BASE_URL}api/post/${id}`)
    const data = res.data.data

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.created_at,
      coverImage: `${BASE_URL}storage/${data.cover_image}`,
      content: data.detail?.content || '',
    }
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}


// ✅ POST: Create new blog
export async function createBlog(data: BlogPostInput): Promise<BlogPost> {
  const res = await axios.post(`${BASE_URL}/blogs`, data)
  return res.data.data
}

// ✅ PUT: Update existing blog
export async function updateBlog(
  id: string | number,
  data: BlogPostInput
): Promise<BlogPost> {
  const res = await axios.put(`${BASE_URL}/blogs/${id}`, data)
  return res.data.data
}

// ✅ DELETE: Delete blog
export async function deleteBlog(id: string | number): Promise<void> {
  await axios.delete(`${BASE_URL}/blogs/${id}`)
}
