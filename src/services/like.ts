import { http } from '@/utils/http'

export const likeService = {
  // 用户点赞的文章
  pages: async (params?: { page?: number; pageSize?: number }) => {
    const res = await http.get<API.PageData<API.LikeSchema>>('/api/auth/like', { params })
    return res.data
  },

  // 点赞（取消点赞）文章
  toggle: async (postId: number) => {
    const res = await http.post('/api/auth/like', { postId })
    return res.data
  },

  // 判断是否点赞过文章
  status: async (postId: number) => {
    const res = await http.get<{ liked: boolean }>('/api/auth/like/status', { params: { postId } })
    return res.data
  },
}
