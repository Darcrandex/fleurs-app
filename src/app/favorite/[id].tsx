/**
 * @name FavoriteDetail
 * @description
 * @author darcrand
 */

import { favoriteService } from '@/services/favorite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function FavoriteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['favorite', id],
    queryFn: () => favoriteService.getById(Number(id)),
  })

  const removeMutation = useMutation({
    mutationFn: () => favoriteService.remove(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
  })

  return (
    <>
      <Text>Favorite</Text>

      <Text>id: {id}</Text>

      <View>{data?.posts?.map((v) => <Text key={v.postId}>{v.post?.title}</Text>)}</View>

      <Button title='remove' onPress={() => removeMutation.mutate()}></Button>
    </>
  )
}
