/**
 * @name MyFavorites
 * @description 我的收藏
 * @author darcrand
 */

import { IMAGE_BLURHASH } from '@/constants/common'
import { favoriteService } from '@/services/favorite'
import { postService } from '@/services/post'
import UIconButton from '@/ui/UIconButton'
import { cls } from '@/utils/cls'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'

export default function MyFavorites() {
  const { data } = useQuery({
    queryKey: ['favorite', 'pages'],
    queryFn: () => favoriteService.pages(),
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false} className='bg-gray-50'>
      <View className='m-2 flex flex-row flex-wrap'>
        <View className='w-1/2 p-2'>
          <FavoriteCreateCard />
        </View>

        {data?.records?.map((v) => (
          <View key={v.id} className='w-1/2 p-2'>
            <FavoriteCard data={v} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

function FavoriteCard(props: { data: API.FavoriteSchema; wrapperClassName?: string }) {
  // 获取该收藏夹中的前 3 篇文章
  const { data } = useQuery({
    enabled: !!props.data.id,
    queryKey: ['favorite', 'posts', props.data.id],
    queryFn: () => postService.pages({ favoriteId: props.data.id, pageSize: 3 }),
    select: (data) => data.records.slice(0, 3),
  })

  return (
    <Pressable
      className={cls('rounded-sm bg-white shadow-sm', props.wrapperClassName)}
      onPress={() => router.push(`/favorite/${props.data.id}`)}
    >
      <View className='mx-2 mt-2 flex flex-row'>
        <Image
          source={data?.[0]?.coverThumbnail}
          className='h-40 w-1/2 rounded-sm bg-rose-500'
          contentFit='cover'
          placeholder={{ blurhash: IMAGE_BLURHASH }}
          transition={500}
        />

        <View className='ml-1 flex h-40 flex-1 flex-col'>
          <Image
            source={data?.[1]?.coverThumbnail}
            className='h-2/3 rounded-sm bg-amber-200'
            placeholder={{ blurhash: IMAGE_BLURHASH }}
            transition={500}
          />
          <Image
            source={data?.[2]?.coverThumbnail}
            className='mt-1 flex-1 rounded-sm bg-cyan-200'
            placeholder={{ blurhash: IMAGE_BLURHASH }}
            transition={500}
          />
        </View>
      </View>

      <Text className='truncate p-2 text-xs text-gray-500'>{props.data.name}</Text>
    </Pressable>
  )
}

function FavoriteCreateCard() {
  return (
    <>
      <Pressable className={cls('rounded-sm bg-white shadow-sm')} onPress={() => router.push('/favorite/create')}>
        <View className='mt-2 flex h-48 flex-col items-center justify-center'>
          <UIconButton icon='plus' size={20} />
          <Text className='p-2 text-xs text-gray-500'>新建收藏夹</Text>
        </View>
      </Pressable>
    </>
  )
}
