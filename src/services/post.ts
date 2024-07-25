import { http } from '@/utils/http'

export const postService = {
  getById: async (id: number) => {
    const res = await http.get<API.PostShema>(`/api/post/${id}`)
    return res.data
  },

  pages: async (params?: { page?: string; pageSize?: string; keyword?: string; categoryId?: string }) => {
    const res = await http.get<API.PageData<API.PostShema>>('/api/post', { params })
    return res.data
  },

  like: async (id: number) => {
    const res = await http.post(`/api/post/${id}/like`)
    return res.data
  },

  favorite: async (postId: number, favoriteId?: number) => {
    const res = await http.post(`/api/post/${postId}/favorite`, { favoriteId })
    return res.data
  },
}
