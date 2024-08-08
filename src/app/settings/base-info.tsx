/**
 * @name BaseInfo
 * @description 用户基本信息修改
 * @author darcrand
 */

import TopHeader from '@/components/TopHeader'
import { IMAGE_BLURHASH } from '@/constants/common'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { useProfile, USER_PROFILE_KEY } from '@/queries/useProfile'
import { authService } from '@/services/auth'
import { ossService } from '@/services/oss'
import UButton from '@/ui/UButton'
import UInput from '@/ui/UInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'

export default function BaseInfo() {
  const queryClient = useQueryClient()
  useNavigationOptions({ headerShown: false })
  const { res } = useProfile()

  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
  const [values, setValues] = useState({
    name: res.data?.name || '',
    avatar: res.data?.avatar || '',
  })

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setFile(result.assets[0])
    }
  }

  const updateMutation = useMutation({
    mutationFn: async (data: Pick<API.UserSchema, 'name' | 'avatar'> & { fileUrl?: string }) => {
      let avatar = data.avatar

      if (data.fileUrl) {
        const ext = data.fileUrl.split('.').pop()
        const formData = new FormData()

        // @ts-ignore
        formData.append('file', { uri: data.fileUrl, name: `avatar.${ext}`, type: `image/${ext}` })
        formData.append('bucket', 'avatar')
        const { url } = await ossService.uploadAsFormData(formData)
        avatar = url
      }

      return authService.update({ name: data.name, avatar })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
      router.canDismiss() && router.dismiss()
    },
  })

  const onSubmit = async () => {
    if (!values.name) {
      throw new Error('请输入昵称')
    }

    updateMutation.mutate({ ...values, fileUrl: file?.uri })
  }

  return (
    <SafeAreaView className='h-full bg-white'>
      <TopHeader title='基本信息' />

      <View className='m-4'>
        <Pressable className='flex flex-col items-center' onPress={onPickImage}>
          <Image
            className='h-24 w-24 rounded-full'
            source={file?.uri || res.data?.avatar}
            placeholder={{ blurhash: IMAGE_BLURHASH }}
            cachePolicy='memory-disk'
          />
          <Text className='mt-2 text-gray-500'>点击选择图片</Text>
        </Pressable>

        <UInput
          wrapperClassName='mt-4'
          placeholder='昵称'
          maxLength={20}
          value={values.name}
          onChangeText={(text) => setValues({ ...values, name: text })}
        />

        <UButton wrapperClassName='mt-8' variant='primary' loading={updateMutation.isPending} onPress={onSubmit}>
          确定
        </UButton>
      </View>
    </SafeAreaView>
  )
}
