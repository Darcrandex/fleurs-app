/**
 * @name Settings
 * @description
 * @author darcrand
 */

import TopHeader from '@/components/TopHeader'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { USER_PROFILE_KEY } from '@/queries/useProfile'
import { useSetToken } from '@/stores/useToken'
import UButton from '@/ui/UButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import { SafeAreaView, View } from 'react-native'

export default function Settings() {
  useNavigationOptions({ headerShown: false })
  const queryClient = useQueryClient()
  const setToken = useSetToken()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await setToken(null)
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
      router.canDismiss() && router.dismiss()
    },

    onError: (err) => {
      console.error(err)
    },
  })

  return (
    <SafeAreaView>
      <TopHeader title='设置' />

      <View className='m-4'>
        <Link href='/update-pwd'>修改密码</Link>

        <UButton variant='primary' onPress={() => logoutMutation.mutate()} wrapperClassName='mt-4'>
          退出登录
        </UButton>
      </View>
    </SafeAreaView>
  )
}
