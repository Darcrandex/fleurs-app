/**
 * @name PostDetail
 * @description
 * @author darcrand
 */

import { useProfile, USER_PROFILE_KEY } from '@/queries/useProfile'
import { postService } from '@/services/post'
import { http } from '@/utils/http'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useLocalSearchParams } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function PostDetail() {
  const queryClient = useQueryClient()
  const { id } = useLocalSearchParams()

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: () => http.get(`/api/post/${id}`).then((res) => res.data),
  })

  const userRes = useProfile()
  const userHasLiked = userRes.data?.likes?.some((v) => v.postId === Number(id))

  const likeMutation = useMutation({
    mutationFn: () => postService.like(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
    },
  })

  return (
    <>
      <View>
        <Text>PostDetail</Text>
        <Text>id: {id}</Text>

        <Text>{JSON.stringify(data, null, 2)}</Text>

        <Button title={userHasLiked ? 'unlike' : 'like'} onPress={() => likeMutation.mutate()}></Button>

        <Link href={`/favorite-modal?postId=${id}`}>favorite</Link>
      </View>
    </>
  )
}
