/**
 * @name Mine
 * @description 我的（tab）
 * @author darcrand
 */

import MyLikes from '@/components/MyLikes'
import { IMAGE_BLURHASH } from '@/constants/common'
import { useProfile } from '@/queries/useProfile'
import { favoriteService } from '@/services/favorite'
import { cls } from '@/utils/cls'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'

export default function Mine() {
  const profileRes = useProfile()
  const isLoggedIn = profileRes.isSuccess && !!profileRes.data?.id

  const { data: allFavorites } = useQuery({
    enabled: isLoggedIn,
    queryKey: ['favorite', 'all'],
    queryFn: () => favoriteService.all(),
  })

  const tabs = useMemo(
    () => [
      { value: 'likes', label: '点赞', badge: profileRes.data?.likes?.length || 0 },
      { value: 'favorite', label: '收藏', badge: allFavorites?.length || 0 },
    ],
    [allFavorites?.length, profileRes.data?.likes?.length],
  )

  const [tabKey, setTabKey] = useState(tabs[0].value)

  useEffect(() => {
    console.log('profileRes.data', JSON.stringify(profileRes.data))
  }, [profileRes.data])

  if (!isLoggedIn) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-lg'>请先登录</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className='bg-white'>
      <View className='mx-2 flex flex-row items-start justify-end'>
        <Pressable className='p-2' onPress={() => router.push('/settings')}>
          <AntDesign name='setting' size={24} />
        </Pressable>
      </View>

      <View className='m-4 flex flex-row items-center'>
        <Image
          className='h-16 w-16 rounded-full'
          source={profileRes.data?.avatar}
          placeholder={{ blurhash: IMAGE_BLURHASH }}
          cachePolicy='memory-disk'
        />

        <View className='ml-4'>
          <Text className='truncate text-lg'>{profileRes.data?.name}</Text>
          <Text className='truncate text-gray-500'>{profileRes.data?.email}</Text>
        </View>
      </View>

      <View className='mx-2 flex flex-row'>
        {tabs.map((t) => (
          <Pressable
            key={t.value}
            className={cls('mx-2 flex w-1/5 flex-col items-center rounded py-1', tabKey === t.value && 'bg-gray-100')}
            onPress={() => setTabKey(t.value)}
          >
            <Text className='text-sm font-bold'>{t.badge}</Text>
            <Text className='text-xs text-gray-600'>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {tabKey === 'likes' && <MyLikes />}
    </SafeAreaView>
  )
}
