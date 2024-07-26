import { cls } from '@/utils/cls'
import { Tabs, usePathname } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const tabs = [
  { path: '/', href: 'index', title: 'Find' },
  { path: '/mine', href: 'mine', title: 'Mine' },
]

export default function TabLayout() {
  const pathname = usePathname()
  return (
    <Tabs
      tabBar={(tabBarProps) => (
        <View
          className='flex flex-row items-center justify-around bg-blue-500'
          style={{ paddingBottom: tabBarProps.insets.bottom }}
        >
          {tabs.map((t) => (
            <Pressable key={t.href} className='bg-red-400 p-4' onPress={() => tabBarProps.navigation.navigate(t.href)}>
              <Text className={cls('transition-all', pathname === t.path ? 'text-white' : 'text-black')}>
                {t.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    >
      {tabs.map((t) => (
        <Tabs.Screen key={t.href} name={t.href} options={{ headerShown: false }} />
      ))}
    </Tabs>
  )
}
