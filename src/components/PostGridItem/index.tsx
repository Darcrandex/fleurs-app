/**
 * @name PostGridItem
 * @description 帖子瀑布流列表-帖子卡片
 * @author darcrand
 */

import { IMAGE_BLURHASH } from '@/constants/common'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export type PostGridItemProps = {
  data: API.PostShema & { imgWidth: number; imgHeight: number }
  showAuthor?: boolean
}

export default function PostGridItem(props: PostGridItemProps) {
  const router = useRouter()

  return (
    <Pressable
      key={props.data.id}
      className='rounded-sm bg-white shadow-sm'
      onPress={() => router.push(`/post/${props.data.id}`)}
    >
      <Image
        source={props.data.coverThumbnail}
        contentFit='cover'
        placeholder={{ blurhash: IMAGE_BLURHASH }}
        transition={500}
        cachePolicy='memory-disk'
        className='rounded-t-sm'
        style={{ width: props.data.imgWidth, height: props.data.imgHeight }}
      />

      <View className='space-y-2 p-2'>
        <Text className='truncate text-xs text-gray-600'>{props.data.title}</Text>

        {props.showAuthor !== false && (
          <View className='flex flex-row items-center'>
            <Image
              className='h-6 w-6 rounded-full'
              source={props.data.author.avatar}
              placeholder={{ blurhash: IMAGE_BLURHASH }}
              transition={500}
              cachePolicy='memory-disk'
            />

            <Text className='ml-2 truncate text-xs'>{props.data.author.name}</Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}
