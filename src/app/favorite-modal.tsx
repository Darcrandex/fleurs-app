/**
 * @name FavoriteModal
 * @description
 * @author darcrand
 */

import { favoriteService } from '@/services/favorite'
import { postService } from '@/services/post'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Pressable, Text, TextInput, View } from 'react-native'

export default function FavoriteModal() {
  const router = useRouter()
  const { postId } = useLocalSearchParams<{ postId?: string }>()
  const queryClient = useQueryClient()

  const { data: allFavorites } = useQuery({
    queryKey: ['favorite', 'all'],
    queryFn: () => favoriteService.all(),
  })

  const [favoriteName, setFavoriteName] = useState('')
  const createFavorite = useMutation({
    mutationFn: (name: string) => favoriteService.create({ name }),
    onSuccess: () => {
      setFavoriteName('')
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
    },
  })

  const [favoriteId, setFavoriteId] = useState<number>()
  const onToggle = (id: number) => setFavoriteId((prev) => (prev === id ? undefined : id))

  useEffect(() => {
    if (allFavorites?.length) {
      setFavoriteId((prev) => {
        const matched = allFavorites.find((v) => v.posts?.some((p) => p.postId === Number(postId)))
        return matched?.id || prev
      })
    }
  }, [allFavorites, postId])

  const favoriteMutation = useMutation({
    mutationFn: (data: { postId: number; favoriteId?: number }) => postService.favorite(data.postId, data.favoriteId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      router.back()
    },
  })
  const onSubmit = async () => {
    console.log('ok', {
      postId: Number(postId),
      favoriteId,
    })

    favoriteMutation.mutateAsync({ postId: Number(postId), favoriteId })
  }

  return (
    <>
      <View>
        <Text>favorite a post</Text>

        <View className='space-y-2'>
          {allFavorites?.map((v) => (
            <Pressable key={v.id} className='block m-2 p-2' onPress={() => onToggle(v.id)}>
              <Text className={v.id === favoriteId ? 'text-rose-500' : 'text-gray-800'}>{v.name}</Text>
            </Pressable>
          ))}
        </View>

        <View className='flex items-center'>
          <TextInput className='w-3/4 border p-2 text-lg' value={favoriteName} onChangeText={setFavoriteName} />
          <Button title='create' onPress={() => createFavorite.mutate(favoriteName)}></Button>
        </View>

        <View className='flex flex-row items-center justify-center mt-10 space-x-2'>
          <Button title='cancel' onPress={() => router.canGoBack() && router.back()}></Button>
          <Button title='submit' onPress={onSubmit}></Button>
        </View>
      </View>
    </>
  )
}
