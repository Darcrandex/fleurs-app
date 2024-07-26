/**
 * @name Find
 * @description 发现（tab）
 * @author darcrand
 */

import { categoryService } from '@/services/category'
import { postService } from '@/services/post'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'

export default function Find() {
  const { data: categories } = useQuery({
    queryKey: ['category', 'all'],
    queryFn: () => categoryService.all(),
  })

  const { data } = useQuery({
    queryKey: ['post', 'pages'],
    queryFn: () => postService.pages(),
  })

  return (
    <SafeAreaView className='bg-emerald-400'>
      <View className='h-screen bg-rose-200'>
        <View className='bg-violet-200'>
          <ScrollView horizontal>
            {categories?.map((v) => (
              <Pressable key={v.id} className='m-2 rounded-full bg-gray-950 px-2 py-1'>
                <Text className='text-white'>{v.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <ScrollView className='flex-1 bg-amber-200'>
          {data?.records?.map((v) => (
            <View key={v.id} className='m-2'>
              <Link href={`/post/${v.id}`}>{v.title}</Link>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
