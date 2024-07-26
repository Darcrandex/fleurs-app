/**
 * @name LoginModal
 * @description 全局登录弹框
 * @author darcrand
 */

import { TOKEN_KEY } from '@/constants/common'
import { authService } from '@/services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import CryptoJS from 'react-native-crypto-js'

export default function LoginModal() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (values: Pick<API.UserSchema, 'email' | 'password'>) => authService.login(values),

    onSuccess: async (data) => {
      await AsyncStorage.setItem(TOKEN_KEY, data.token)
      router.canGoBack() && router.back()
      queryClient.invalidateQueries({ queryKey: ['user'] })
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
      <View>
        <Text className='text-center text-3xl'>Login</Text>

        <View>
          <Text>email</Text>
          <TextInput
            className='m-2 border'
            textContentType='emailAddress'
            value={formData.email}
            placeholder='email'
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <Text>password</Text>
          <TextInput
            className='m-2 border'
            textContentType='password'
            value={formData.password}
            placeholder='password'
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />

          <Button title='Login' onPress={onSubmit}></Button>
        </View>
      </View>
    </>
  )
}
