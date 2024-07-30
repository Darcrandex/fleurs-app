// 封装 react native storage + jotai 的 api

import NativeAsyncStorage from '@react-native-async-storage/async-storage'
import type { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage'

export const nativeAsyncStorage: AsyncStorage<any> = {
  getItem: async (key: string, initialValue: any) => {
    const value = NativeAsyncStorage.getItem(key)
    return value || initialValue
  },
  setItem: async (key: string, value: any) => NativeAsyncStorage.setItem(key, value),
  removeItem: async (key: string) => NativeAsyncStorage.removeItem(key),
}
