/**
 * @name PostDetail
 * @description
 * @author darcrand
 */

import { IMAGE_BLURHASH } from '@/constants/common'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { useProfile, USER_PROFILE_KEY } from '@/queries/useProfile'
import { postService } from '@/services/post'
import { toFixed } from '@/utils/common'
import { AntDesign } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { Dimensions, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'

export default function PostDetail() {
  useNavigationOptions({ headerShown: false })

  const queryClient = useQueryClient()
  const { id } = useLocalSearchParams()

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getById(Number(id)),
  })

  const imageHeight = useMemo(() => {
    const winWidth = Dimensions.get('window').width
    return toFixed(winWidth / (data?.coverAspectRatio || 16 / 9), 2)
  }, [data])

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
      <SafeAreaView>
        <View className='h-screen'>
          <View className='flex flex-row items-center'>
            <Pressable className='mr-auto p-2' onPress={() => router.canGoBack() && router.back()}>
              <AntDesign name='arrowleft' size={24} color='black' />
            </Pressable>

            <Pressable className='p-2' onPress={() => likeMutation.mutate()}>
              <AntDesign name={userHasLiked ? 'heart' : 'hearto'} size={24} color='black' />
            </Pressable>

            <Pressable className='mr-2 p-2' onPress={() => router.push(`/favorite-modal?postId=${id}`)}>
              <AntDesign name='star' size={24} color='black' />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
            <Image
              source={data?.coverUrl}
              contentFit='cover'
              placeholder={{ blurhash: IMAGE_BLURHASH }}
              transition={500}
              cachePolicy='memory-disk'
              className='w-full'
              style={{ height: imageHeight }}
            />

            <View className='m-4 space-y-4'>
              <Text className='font-bold'>{data?.title}</Text>
              <Text>{data?.content}</Text>
              <Text className='text-xs text-gray-500'>{dayjs(data?.createdAt).fromNow()}</Text>
            </View>

            <View className='m-4 flex flex-row items-center'>
              <Image
                className='h-8 w-8 rounded-full'
                source={data?.author.avatar}
                placeholder={{ blurhash: IMAGE_BLURHASH }}
                cachePolicy='memory-disk'
              />

              <Text className='ml-2 truncate'>{data?.author.name}</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}
