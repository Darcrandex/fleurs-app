import { http } from '@/utils/http'

export const authService = {
  login: async (data: Pick<API.UserSchema, 'email' | 'password'>) => {
    const res = await http.post<{ token: string }>('/api/auth/login', data)
    return res.data
  },

  signUp: async (data: Pick<API.UserSchema, 'email' | 'password'>) => {
    const res = await http.post('/api/auth/sign', data)
    return res.data
  },

  profile: async () => {
    const res = await http.get<Omit<API.UserProfileSchema, 'password'>>('/api/auth/profile')
    return res.data
  },

  update: async (data: Pick<API.UserSchema, 'name' | 'avatar'>) => {
    const res = await http.put('/api/auth/profile', data)
    return res.data
  },

  pwd: async (data: { oldPassword: string; newPassword: string }) => {
    const res = await http.put('/api/auth/pwd', data)
    return res.data
  },
}
