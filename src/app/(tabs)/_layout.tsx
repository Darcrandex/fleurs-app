import { cls } from '@/utils/cls'
import { AntDesign } from '@expo/vector-icons'
import { Tabs, usePathname } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { gray } from 'tailwindcss/colors'

const tabs = [
  { path: '/', href: 'index', title: '发现', icon: <AntDesign name='search1' size={24} color={gray[900]} /> },
  { path: '/search', href: 'search', title: '搜索', icon: <AntDesign name='find' size={24} color={gray[900]} /> },
  { path: '/mine', href: 'mine', title: '我的', icon: <AntDesign name='user' size={24} color={gray[900]} /> },
]

export default function TabLayout() {
  const pathname = usePathname()
  return (
    <Tabs
      tabBar={(tabBarProps) => (
        <View className='flex flex-row items-center bg-white' style={{ paddingBottom: tabBarProps.insets.bottom }}>
          {tabs.map((t) => (
            <Pressable
              key={t.href}
              className={cls(
                'flex flex-1 flex-col items-center justify-center p-2',
                pathname === t.path ? 'opacity-100' : 'opacity-50',
              )}
              onPress={() => tabBarProps.navigation.navigate(t.href)}
            >
              {t.icon}
              <Text className='mt-1 text-xs text-gray-900'>{t.title}</Text>
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
