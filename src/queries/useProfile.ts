import { authService } from '@/services/auth'
import { useQuery } from '@tanstack/react-query'

export const USER_PROFILE_KEY = ['user', 'profile']

export function useProfile() {
  const res = useQuery({
    retry: false,
    queryKey: USER_PROFILE_KEY,
    queryFn: () => authService.profile(),
  })

  const profile = res.data
  const isLoggedIn = !!profile?.id && res.isSuccess

  return { res, profile, isLoggedIn }
}
