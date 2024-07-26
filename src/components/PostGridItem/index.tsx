/**
 * @name PostGridItem
 * @description
 * @author darcrand
 */

import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Pressable, Text } from 'react-native'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export type PostGridItemProps = {
  data: API.PostShema & { imgWidth: number; imgHeight: number }
}

export default function PostGridItem(props: PostGridItemProps) {
  const router = useRouter()

  return (
    <Pressable
      key={props.data.id}
      className='rounded-md bg-white shadow-sm'
      onPress={() => router.push(`/post/${props.data.id}`)}
    >
      <Image
        source={props.data.coverUrl}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={500}
        cachePolicy='memory-disk'
        style={{ width: props.data.imgWidth, height: props.data.imgHeight }}
        className='rounded-t-md bg-gray-300'
      />

      <Text className='truncate p-2 text-gray-600'>{props.data.title}</Text>
    </Pressable>
  )
}
