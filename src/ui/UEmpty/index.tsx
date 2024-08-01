/**
 * @name UEmpty
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { Text, View } from 'react-native'

export default function UEmpty(props: { title?: string; message?: string; wrapperClassName?: string }) {
  return (
    <View className={cls('h-full flex-1 items-center justify-center', props.wrapperClassName)}>
      <View className='space-y-2'>
        <Text className='text-gray-800'>{props.title || '暂无数据'}</Text>
        <Text className='text-gray-500'>{props.message}</Text>
      </View>
    </View>
  )
}
