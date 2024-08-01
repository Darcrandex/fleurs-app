/**
 * @name TopHeader
 * @description
 * @author darcrand
 */

import UIconButton from '@/ui/UIconButton'
import { cls } from '@/utils/cls'
import { router } from 'expo-router'
import { Text, View } from 'react-native'

export type TopHeaderProps = {
  title?: string
  right?: React.ReactNode
  wrapperClassName?: string
}

export default function TopHeader(props: TopHeaderProps) {
  return (
    <View className={cls('flex flex-row items-center', props.wrapperClassName)}>
      <View className='w-1/4'>
        <UIconButton
          wrapperClassName='mr-auto'
          icon='arrowleft'
          onPress={() => router.canDismiss() && router.dismiss()}
        />
      </View>

      <Text className='w-1/2 truncate text-center'>{props.title}</Text>

      <View className='flex w-1/4 flex-row justify-end'>{props.right}</View>
    </View>
  )
}
