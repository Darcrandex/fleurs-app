import { http } from '@/utils/http'

export const ossService = {
  upload: async (file: File, bucket?: string) => {
    const params = { filename: file.name, bucket }
    const res = await http.post<{ url: string }>('/api/oss/image', file, {
      params,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },

  uploadAsBuffer: async (arrayBuffer: ArrayBuffer, params?: { bucket?: string }) => {
    const res = await http.post<{ url: string }>('/api/oss/image/buffer', arrayBuffer, {
      params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  },

  uploadAsFormData: async (formData: FormData) => {
    const res = await http.post<{ url: string }>('/api/oss/image/form-data', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  },
}
