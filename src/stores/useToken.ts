import { TOKEN_KEY } from '@/constants/common'
import { nativeAsyncStorage } from '@/utils/nativeAsyncStorage'
import { useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const tokenAtom = atomWithStorage<string | null>(TOKEN_KEY, null, nativeAsyncStorage)

export function useToken() {
  return useAtom(tokenAtom)
}

// 目前不知道什么原因
// 使用 useToken 返回的 set 函数会导致 modal 类路由一直重复打开
export function useSetToken() {
  return useSetAtom(tokenAtom)
}
