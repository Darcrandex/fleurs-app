/**
 * @name LoginModal
 * @description 全局登录弹框
 * @author darcrand
 */

import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { authService } from '@/services/auth'
import { useToken } from '@/stores/useToken'
import { AntDesign } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import CryptoJS from 'react-native-crypto-js'

export default function LoginModal() {
  useNavigationOptions({ headerShown: false, presentation: 'modal' })

  const router = useRouter()
  const queryClient = useQueryClient()
  const [, setToken] = useToken()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (values: Pick<API.UserSchema, 'email' | 'password'>) => authService.login(values),

    onSuccess: async (data) => {
      await setToken(data.token)
      router.canGoBack() && router.back()
      queryClient.invalidateQueries()
    },
  })

  const onSubmit = async () => {
    console.log('formData', formData)

    const { email, password } = formData
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.EXPO_PUBLIC_AES_KEY || '').toString()

    await mutateAsync({ email, password: encryptedPassword })
  }

  return (
    <>
      <View className='my-4 flex flex-row items-center justify-between'>
        <View className='w-12'></View>
        <Text className='text-center text-lg'>login</Text>
        <Pressable className='w-12 p-2' onPress={() => router.back()}>
          <AntDesign name='close' size={20} color='black' />
        </Pressable>
      </View>

      <Text className='my-4 text-center text-gray-400'>fleurs account login</Text>

      <View className='m-4'>
        <TextInput
          className='my-2 rounded bg-gray-200 p-2'
          textContentType='emailAddress'
          value={formData.email}
          placeholder='email'
          maxLength={20}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <TextInput
          className='my-2 rounded bg-gray-200 p-2'
          textContentType='password'
          value={formData.password}
          placeholder='password'
          secureTextEntry
          maxLength={20}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <Pressable className='my-2 rounded bg-violet-500 p-2' onPress={onSubmit}>
          <Text className='text-center text-white'>Login</Text>
        </Pressable>
      </View>
    </>
  )
}
