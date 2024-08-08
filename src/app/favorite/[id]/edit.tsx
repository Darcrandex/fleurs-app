/**
 * @name FavoriteEdit
 * @description
 * @author darcrand
 */

import ModalHeader from '@/components/ModalHeader'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { favoriteService } from '@/services/favorite'
import UButton from '@/ui/UButton'
import UInput from '@/ui/UInput'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView, View } from 'react-native'

export default function FavoriteEdit() {
  useNavigationOptions({ headerShown: false, presentation: 'modal' })
  const search = useLocalSearchParams<{ id?: string }>()
  const favoriteId = Number(search.id)

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['favorite', favoriteId],
    queryFn: () => favoriteService.getById(favoriteId),
  })

  const [name, setName] = useState(data?.name || '')

  const updateMutation = useMutation({
    mutationFn: (name: string) => favoriteService.update(favoriteId, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      router.canDismiss() && router.dismiss()
    },
  })

  return (
    <SafeAreaView className='h-full bg-white'>
      <ModalHeader title='收藏夹编辑' />

      <View className='m-4'>
        <UInput placeholder='收藏夹名称' maxLength={20} value={name} onChangeText={setName} />

        <UButton variant='primary' wrapperClassName='mt-4' onPress={() => updateMutation.mutate(name)}>
          确定
        </UButton>
      </View>
    </SafeAreaView>
  )
}
