import { authService } from '@/services/auth'
import { useQuery } from '@tanstack/react-query'

export const USER_PROFILE_KEY = ['user', 'profile']

export function useProfile() {
  const res = useQuery({
    queryKey: USER_PROFILE_KEY,
    queryFn: () => authService.profile(),
  })

  return res
}
