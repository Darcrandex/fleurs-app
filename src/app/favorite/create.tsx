/**
 * @name FavoriteCreate
 * @description 新建收藏夹
 * @author darcrand
 */

import ModalHeader from '@/components/ModalHeader'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { USER_PROFILE_KEY } from '@/queries/useProfile'
import { favoriteService } from '@/services/favorite'
import UButton from '@/ui/UButton'
import UInput from '@/ui/UInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView, View } from 'react-native'

export default function FavoriteCreate() {
  useNavigationOptions({ headerShown: false, presentation: 'modal' })
  const queryClient = useQueryClient()
  const [name, setName] = useState('')

  const updateMutation = useMutation({
    mutationFn: (name: string) => favoriteService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
      router.canDismiss() && router.dismiss()
    },
  })

  return (
    <SafeAreaView className='h-full bg-white'>
      <ModalHeader title='新建收藏夹' />

      <View className='m-4'>
        <UInput placeholder='收藏夹名称' maxLength={20} value={name} onChangeText={setName} />

        <UButton variant='primary' wrapperClassName='mt-4' onPress={() => updateMutation.mutate(name)}>
          确定
        </UButton>
      </View>
    </SafeAreaView>
  )
}
