import { http } from '@/utils/http'

export const postService = {
  getById: async (id: number) => {
    const res = await http.get<API.PostShema>(`/api/post/${id}`)
    return res.data
  },

  pages: async (params?: {
    page?: number
    pageSize?: number
    keyword?: string
    categoryId?: number

    // 这个字段只用于查询用户的收藏夹中的文章
    favoriteId?: number
  }) => {
    const res = await http.get<API.PageData<API.PostShema>>('/api/post', { params })
    return res.data
  },
}
