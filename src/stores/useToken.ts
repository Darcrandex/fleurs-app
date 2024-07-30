import { TOKEN_KEY } from '@/constants/common'
import { nativeAsyncStorage } from '@/utils/nativeAsyncStorage'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const tokenAtom = atomWithStorage<string | null>(TOKEN_KEY, null, nativeAsyncStorage)

export function useToken() {
  return useAtom(tokenAtom)
}
