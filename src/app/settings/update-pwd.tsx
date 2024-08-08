/**
 * @name UpdatePassword
 * @description 修改密码
 * @author darcrand
 */

import TopHeader from '@/components/TopHeader'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { authService } from '@/services/auth'
import { useSetToken } from '@/stores/useToken'
import UButton from '@/ui/UButton'
import UInput from '@/ui/UInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import CryptoJS from 'react-native-crypto-js'

export default function UpdatePassword() {
  useNavigationOptions({ headerShown: false })
  const setToken = useSetToken()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const submitMutation = useMutation({
    mutationFn: async (data: { oldPassword: string; newPassword: string }) => {
      return authService.pwd({
        oldPassword: CryptoJS.AES.encrypt(data.oldPassword, process.env.EXPO_PUBLIC_AES_KEY || '').toString(),
        newPassword: CryptoJS.AES.encrypt(data.newPassword, process.env.EXPO_PUBLIC_AES_KEY || '').toString(),
      })
    },
    onSuccess() {
      // 清空所有数据，并返回首页
      queryClient.invalidateQueries()
      setToken(null)
      router.canDismiss() && router.dismissAll()
    },
  })

  const onSubmit = () => {
    if (
      !formData.oldPassword.trim() ||
      !formData.newPassword.trim() ||
      formData.newPassword !== formData.confirmPassword
    ) {
      return
    }

    submitMutation.mutate(formData)
  }

  return (
    <SafeAreaView className='h-screen bg-white'>
      <TopHeader title='修改密码' />

      <View className='m-4 space-y-2'>
        <UInput
          textContentType='password'
          value={formData.oldPassword}
          placeholder='旧密码'
          secureTextEntry
          maxLength={20}
          onChangeText={(text) => setFormData({ ...formData, oldPassword: text })}
        />

        <UInput
          textContentType='password'
          value={formData.newPassword}
          placeholder='新密码'
          secureTextEntry
          maxLength={20}
          onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
        />

        <UInput
          textContentType='password'
          value={formData.confirmPassword}
          placeholder='确认新密码'
          secureTextEntry
          maxLength={20}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        />

        <UButton variant='primary' wrapperClassName='mt-4' onPress={onSubmit}>
          确定
        </UButton>
      </View>
    </SafeAreaView>
  )
}
