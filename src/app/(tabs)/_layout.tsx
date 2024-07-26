import { AntDesign } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'find',
          tabBarIcon: ({ color }) => <AntDesign name='find' size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name='mine'
        options={{
          title: 'Mine',
          tabBarIcon: ({ color }) => <AntDesign name='user' size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}
