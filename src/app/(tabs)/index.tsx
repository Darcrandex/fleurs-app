/**
 * @name IndexTab
 * @description
 * @author darcrand
 */

import { postService } from '@/services/post'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function IndexTab() {
  const { data } = useQuery({
    queryKey: ['post', 'pages'],
    queryFn: () => postService.pages(),
  })

  return (
    <>
      <View>
        <Text className='m-3 border text-3xl'>post list</Text>

        {data?.records?.map((v) => (
          <View key={v.id} className='m-2'>
            <Link href={`/post/${v.id}`}>{v.title}</Link>
          </View>
        ))}
      </View>
    </>
  )
}
