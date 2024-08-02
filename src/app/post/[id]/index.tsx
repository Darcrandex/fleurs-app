/**
 * @name PostDetail
 * @description
 * @author darcrand
 */

import FavoriteButton from '@/components/FavoriteButton'
import LikePostButton from '@/components/LikePostButton'
import TopHeader from '@/components/TopHeader'
import { IMAGE_BLURHASH } from '@/constants/common'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { postService } from '@/services/post'
import { toFixed } from '@/utils/common'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native'

export default function PostDetail() {
  useNavigationOptions({ headerShown: false })

  const { id } = useLocalSearchParams()

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getById(Number(id)),
  })

  const imageHeight = useMemo(() => {
    const winWidth = Dimensions.get('window').width
    return toFixed(winWidth / (data?.coverAspectRatio || 16 / 9), 2)
  }, [data])

  return (
    <>
      <SafeAreaView>
        <View className='h-screen'>
          <TopHeader
            right={
              <>
                <LikePostButton postId={Number(id)} />
                <FavoriteButton postId={Number(id)} />
              </>
            }
          />

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
