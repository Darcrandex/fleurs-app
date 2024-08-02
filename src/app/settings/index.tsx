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
import { router } from 'expo-router'
import { Fragment } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'

const links = [
  { title: '基本信息', href: '/settings/base-info' },
  { title: '修改密码', href: '/settings/update-pwd' },
]

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
    <SafeAreaView className='h-full bg-white'>
      <TopHeader title='设置' />

      <ScrollView className='bg-gray-50'>
        <View className='m-4 rounded bg-white'>
          {links.map((link, idx) => (
            <Fragment key={link.href}>
              {!!idx && <View className='mx-2 border-b border-gray-100' />}

              <Pressable className='p-2' onPress={() => router.push(link.href)}>
                <Text className='text-base text-gray-900'>{link.title}</Text>
              </Pressable>
            </Fragment>
          ))}
        </View>

        <UButton variant='primary' onPress={() => logoutMutation.mutate()} wrapperClassName='m-4'>
          退出登录
        </UButton>
      </ScrollView>
    </SafeAreaView>
  )
}
