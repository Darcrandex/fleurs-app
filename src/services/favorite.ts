import { http } from '@/utils/http'

// 当前用户 收藏夹
export const favoriteService = {
  all: async () => {
    const res = await http.get<API.FavoriteSchema[]>('/api/favorite')
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
