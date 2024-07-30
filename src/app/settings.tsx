/**
 * @name Settings
 * @description
 * @author darcrand
 */

import { USER_PROFILE_KEY } from '@/queries/useProfile'
import { useToken } from '@/stores/useToken'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Text } from 'react-native'
export default function Settings() {
  const queryClient = useQueryClient()
  const [, setToken] = useToken()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await setToken(null)
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
    },
  })

  return (
    <>
      <Text>Settings</Text>
    </>
  )
}
