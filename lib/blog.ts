import axios from 'axios'
import { BlogPost, BlogPostInput } from '@/types/blog'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// ✅ GET: All posts
export async function getAllBlogs(): Promise<BlogPost[]> {
  const res = await axios.get(`${BASE_URL}/blogs`)
  return res.data.data
}

// ✅ GET: One post by slug or ID
export async function getBlogById(id: string | number): Promise<BlogPost> {
  const res = await axios.get(`${BASE_URL}/blogs/${id}`)
  return res.data.data
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
