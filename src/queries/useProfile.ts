import { authService } from '@/services/auth'
import { useToken } from '@/stores/useToken'
import { useQuery } from '@tanstack/react-query'

export const USER_PROFILE_KEY = ['user', 'profile']

export function useProfile() {
  const [token] = useToken()

  const res = useQuery({
    enabled: !!token,
    queryKey: USER_PROFILE_KEY,
    queryFn: () => authService.profile(),
  })

  return res
}
