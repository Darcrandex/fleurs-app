/**
 * @name LoginModal
 * @description 全局登录弹框
 * @author darcrand
 */

import ModalHeader from '@/components/ModalHeader'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { authService } from '@/services/auth'
import { useSetToken } from '@/stores/useToken'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import CryptoJS from 'react-native-crypto-js'

export default function LoginModal() {
  useNavigationOptions({ headerShown: false, presentation: 'modal' })

  const router = useRouter()
  const queryClient = useQueryClient()
  const setToken = useSetToken()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (values: Pick<API.UserSchema, 'email' | 'password'>) => authService.login(values),

    onSuccess: async (data) => {
      await setToken(data.token)
      router.canDismiss() && router.dismiss()
      queryClient.invalidateQueries()
    },
  })

  const onSubmit = async () => {
    const { email, password } = formData
    if (!email || !password) {
      return
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.EXPO_PUBLIC_AES_KEY || '').toString()

    await mutateAsync({ email, password: encryptedPassword })
  }

  return (
    <SafeAreaView className='h-full bg-white'>
      <ModalHeader title='登录' message='登录 Fleurs 账号' />

      <View className='m-4'>
        <TextInput
          className='my-2 rounded bg-gray-100 p-2'
          textContentType='emailAddress'
          value={formData.email}
          placeholder='邮箱地址'
          maxLength={20}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <TextInput
          className='my-2 rounded bg-gray-100 p-2'
          textContentType='password'
          value={formData.password}
          placeholder='密码'
          secureTextEntry
          maxLength={20}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <Pressable className='my-2 rounded bg-violet-500 p-2' onPress={onSubmit}>
          <Text className='text-center text-white'>登录</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
