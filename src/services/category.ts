import { http } from '@/utils/http'

export const categoryService = {
  all: async () => {
    const res = await http.get<API.CategorySchema[]>('/api/category')
    return res.data
  },
}
