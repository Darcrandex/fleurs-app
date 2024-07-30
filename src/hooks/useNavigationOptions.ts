// 封装从页面文件配置路由选项的 hook
// https://docs.expo.dev/router/advanced/stack/#statically-configure-route-options

import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'

export function useNavigationOptions(options?: NativeStackNavigationOptions) {
  const navigation = useNavigation()
  useEffect(() => navigation.setOptions(options || {}), [navigation, options])
}
