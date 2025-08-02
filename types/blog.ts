export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  date: string
  content?: string
}
export interface BlogPostInput {
  title: string
  content: string
  excerpt: string
  coverImage?: string
}
