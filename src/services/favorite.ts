import { http } from '@/utils/http'

export const favoriteService = {
  // 当前用户收藏夹
  pages: async (params?: { page?: number; pageSize?: number; keyword?: string }) => {
    const res = await http.get<API.PageData<API.FavoriteSchema>>('/api/auth/favorite', { params })
    return res.data
  },

  // 判断是否收藏过文章
  status: async (postId: number) => {
    const res = await http.get<{ favorited: boolean }>('/api/auth/favorite/status', { params: { postId } })
    return res.data
  },

  // 收藏（取消收藏）文章
  toggle: async (data: { favoriteId?: number; postId: number }) => {
    const res = await http.post('/api/auth/favorite', data)
    return res.data
  },

  create: async (data: { name: string }) => {
    const res = await http.post('/api/favorite', data)
    return res.data
  },

  getById: async (id: number) => {
    const res = await http.get<API.FavoriteSchema>(`/api/favorite/${id}`)
    return res.data
  },

  update: async (id: number, data: { name: string }) => {
    const res = await http.put(`/api/favorite/${id}`, data)
    return res.data
  },

  remove: async (id: number) => {
    const res = await http.delete(`/api/favorite/${id}`)
    return res.data
  },
}
