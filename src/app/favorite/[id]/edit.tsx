/**
 * @name FavoriteEdit
 * @description
 * @author darcrand
 */

import ModalHeader from '@/components/ModalHeader'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { favoriteService } from '@/services/favorite'
import UButton from '@/ui/UButton'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput } from 'react-native'

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
    <>
      <ModalHeader title='收藏夹编辑' />
      <Text>FavoriteEdit</Text>
      <Text>{data?.name}</Text>

      <TextInput
        className='m-2 rounded bg-gray-200 p-2 text-sm'
        placeholder='收藏夹名称'
        maxLength={20}
        value={name}
        onChangeText={setName}
      />

      <UButton onPress={() => updateMutation.mutate(name)}>确定</UButton>
    </>
  )
}
