import { TOKEN_KEY } from '@/constants/common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
})

http.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
