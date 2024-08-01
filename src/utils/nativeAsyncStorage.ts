// 封装 react native storage + jotai 的 api

import NativeAsyncStorage from '@react-native-async-storage/async-storage'
import type { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage'

export const nativeAsyncStorage: AsyncStorage<any> = {
  getItem: async (key: string, initialValue: any) => {
    const value = NativeAsyncStorage.getItem(key)
    return value || initialValue
  },

  // 注意：async-storage 不能使用 null 或 undefined
  // 为了支持 api，当 value 为 undefined 时，需要删除 key
  setItem: async (key: string, value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return NativeAsyncStorage.removeItem(key)
    } else {
      NativeAsyncStorage.setItem(key, value)
    }
  },
  removeItem: async (key: string) => NativeAsyncStorage.removeItem(key),
}
