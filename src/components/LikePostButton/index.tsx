/**
 * @name LikePostButton
 * @description 点赞按钮
 * @author darcrand
 */

import { useProfile, USER_PROFILE_KEY } from '@/queries/useProfile'
import { likeService } from '@/services/like'
import UIconButton from '@/ui/UIconButton'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { rose } from 'tailwindcss/colors'

export default function LikePostButton(props: { postId: number; wrapperClassName?: string }) {
  const { isLoggedIn } = useProfile()
  const { postId } = props
  const queryClient = useQueryClient()

  const { data: liked } = useQuery({
    enabled: !!postId && isLoggedIn,
    queryKey: ['like', 'status', postId],
    queryFn: () => likeService.status(postId),
    select: (data) => data.liked,
  })

  const likeMutation = useMutation({
    mutationFn: () => likeService.toggle(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
      queryClient.invalidateQueries({ queryKey: ['like', 'status'] })
    },
  })

  const onPress = useCallback(() => {
    if (isLoggedIn) {
      likeMutation.mutate()
    } else {
      router.push('/login')
    }
  }, [isLoggedIn, likeMutation])

  return (
    <UIconButton
      icon={liked ? 'heart' : 'hearto'}
      color={rose[500]}
      loading={likeMutation.isPending}
      onPress={onPress}
    />
  )
}
