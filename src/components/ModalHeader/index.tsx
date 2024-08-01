/**
 * @name ModalHeader
 * @description
 * @author darcrand
 */

import UIconButton from '@/ui/UIconButton'
import { router } from 'expo-router'
import { Text, View } from 'react-native'

export default function ModalHeader(props: { title?: string; message?: string }) {
  return (
    <>
      <View className='my-4 flex flex-row items-center justify-between'>
        <View className='w-12'></View>

        <Text className='text-center text-lg'>{props.title}</Text>

        <UIconButton
          wrapperClassName='w-12 '
          icon='close'
          size={20}
          onPress={() => router.canDismiss() && router.dismiss()}
        />
      </View>

      <Text className='my-2 text-center text-xs text-gray-400'>{props.message}</Text>
    </>
  )
}
