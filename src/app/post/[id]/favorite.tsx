/**
 * @name FavoriteModal
 * @description 收藏帖子到指定的收藏夹（单个）
 * @author darcrand
 */

import ModalHeader from '@/components/ModalHeader'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { USER_PROFILE_KEY } from '@/queries/useProfile'
import { favoriteService } from '@/services/favorite'
import UButton from '@/ui/UButton'
import { cls } from '@/utils/cls'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'

export default function FavoriteModal() {
  useNavigationOptions({ headerShown: false, presentation: 'modal' })

  const { id: postId } = useLocalSearchParams<{ id?: string }>()
  const queryClient = useQueryClient()

  const { data: allFavorites } = useQuery({
    queryKey: ['favorite', 'all'],
    queryFn: () => favoriteService.pages({ pageSize: 1000 }), // 简单处理
    select: (data) => data.records,
  })

  const [favoriteName, setFavoriteName] = useState('')
  const createFavorite = useMutation({
    mutationFn: (name: string) => {
      if (!name.trim()) throw new Error('收藏夹名称不能为空')
      return favoriteService.create({ name })
    },
    onSuccess: () => {
      setFavoriteName('')
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
    },
  })

  const [favoriteId, setFavoriteId] = useState<number>()
  const onToggle = (id: number) => setFavoriteId((prev) => (prev === id ? undefined : id))
  const tips = useMemo(() => {
    const matched = allFavorites?.find((v) => v.id === favoriteId)
    return matched ? `收藏到【${matched.name}】` : '取消收藏'
  }, [favoriteId, allFavorites])

  useEffect(() => {
    if (allFavorites?.length) {
      setFavoriteId((prev) => {
        const matched = allFavorites.find((v) => v.posts?.some((p) => p.postId === Number(postId)))
        return matched?.id || prev
      })
    }
  }, [allFavorites, postId])

  const favoriteMutation = useMutation({
    mutationFn: (data: { postId: number; favoriteId?: number }) => favoriteService.toggle(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
      router.canDismiss() && router.dismiss()
    },
  })

  const onSubmit = async () => {
    favoriteMutation.mutateAsync({ postId: Number(postId), favoriteId })
  }

  return (
    <>
      <ModalHeader title='收藏' message='收藏到指定的收藏夹' />

      <View className='m-4 flex flex-row items-stretch'>
        <TextInput
          className='flex-1 rounded bg-gray-200 p-2 text-sm'
          value={favoriteName}
          onChangeText={setFavoriteName}
          placeholder='新建收藏夹'
          maxLength={20}
        />

        <Pressable
          className='ml-2 flex items-center justify-center rounded bg-violet-500 px-4'
          onPress={() => createFavorite.mutate(favoriteName)}
        >
          <Text className='text-white'>新建</Text>
        </Pressable>
      </View>

      <View className='h-60'>
        <ScrollView>
          {allFavorites?.map((v) => (
            <Pressable
              key={v.id}
              className={cls(
                'mx-4 my-2 block rounded border p-2',
                v.id === favoriteId ? 'border-violet-500' : 'border-transparent',
              )}
              onPress={() => onToggle(v.id)}
            >
              <Text className={v.id === favoriteId ? 'text-violet-500' : 'text-gray-800'}>{v.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text className='text-center text-xs text-gray-400'>{tips}</Text>

      <View className='m-4'>
        <UButton variant='primary' onPress={onSubmit}>
          确定
        </UButton>
      </View>
    </>
  )
}
