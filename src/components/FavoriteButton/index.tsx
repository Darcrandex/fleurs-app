/**
 * @name FavoriteButton
 * @description 收藏按钮
 * @author darcrand
 */

import { useProfile } from '@/queries/useProfile'
import { favoriteService } from '@/services/favorite'
import UIconButton from '@/ui/UIconButton'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { yellow } from 'tailwindcss/colors'

export default function FavoriteButton(props: { postId: number; wrapperClassName?: string }) {
  const { isLoggedIn } = useProfile()

  const { data } = useQuery({
    queryKey: ['favorite', 'status', props.postId],
    queryFn: () => favoriteService.status(props.postId),
  })

  const onPress = useCallback(() => {
    if (isLoggedIn) {
      router.push(`/favorite-modal?postId=${props.postId}`)
    } else {
      router.push('/login')
    }
  }, [isLoggedIn, props.postId])

  return (
    <UIconButton
      wrapperClassName='pr-4'
      icon={data?.favorited ? 'star' : 'staro'}
      color={yellow[500]}
      onPress={onPress}
    />
  )
}
