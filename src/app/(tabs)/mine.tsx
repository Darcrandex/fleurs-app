/**
 * @name Mine
 * @description 我的（tab）
 * @author darcrand
 */

import MyFavorites from '@/components/MyFavorites'
import MyLikes from '@/components/MyLikes'
import { IMAGE_BLURHASH } from '@/constants/common'
import { useProfile } from '@/queries/useProfile'
import UIconButton from '@/ui/UIconButton'
import { cls } from '@/utils/cls'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useMemo, useState } from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'

export default function Mine() {
  const { profile, isLoggedIn } = useProfile()
  const tabs = useMemo(
    () => [
      { value: 'likes', label: '点赞', badge: profile?.likeCount || 0 },
      { value: 'favorite', label: '收藏', badge: profile?.favoriteCount || 0 },
    ],
    [profile],
  )

  const [tabKey, setTabKey] = useState(tabs[0].value)

  if (!isLoggedIn) {
    return (
      <SafeAreaView>
        <Pressable className='m-4' onPress={() => router.push('/login')}>
          <Text className='text-center'>请先登录</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='bg-white'>
      <View className='flex h-screen flex-col'>
        <View className='mx-2 flex flex-row items-start justify-end'>
          <UIconButton icon='setting' onPress={() => router.push('/settings')} />
        </View>

        <View className='m-4 flex flex-row items-center'>
          <Image
            className='h-16 w-16 rounded-full'
            source={profile?.avatar}
            placeholder={{ blurhash: IMAGE_BLURHASH }}
            cachePolicy='memory-disk'
          />

          <View className='ml-4'>
            <Text className='truncate text-lg'>{profile?.name}</Text>
            <Text className='truncate text-gray-500'>{profile?.email}</Text>
          </View>
        </View>

        <View className='m-2 flex flex-row'>
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
        {tabKey === 'favorite' && <MyFavorites />}
      </View>
    </SafeAreaView>
  )
}
