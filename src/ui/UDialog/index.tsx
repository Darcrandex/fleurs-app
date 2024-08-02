/**
 * @name UDialog
 * @description
 * @author darcrand
 */

import { PropsWithChildren } from 'react'
import { Dimensions, Modal, Pressable, Text, View } from 'react-native'

export type UDialogProps = PropsWithChildren<{
  open?: boolean
  onClose?: () => void
  onOk?: () => void

  title?: string
}>

export default function UDialog(props: UDialogProps) {
  const windowWidth = Dimensions.get('window').width

  return (
    <Modal animationType='fade' visible={props.open} transparent onRequestClose={props.onClose}>
      <View className='flex h-screen w-screen items-center justify-center bg-black/50'>
        <View className='rounded bg-white' style={{ width: windowWidth * 0.6 }}>
          {!!props.title && <Text className='m-4 text-center font-bold'>{props.title}</Text>}

          <View className='m-4' style={{ minHeight: 100 }}>
            {props.children}
          </View>

          <View className='flex flex-row border-t border-gray-100'>
            <Pressable className='flex-1 border-r border-gray-100 py-4' onPress={props.onClose}>
              <Text className='text-center text-gray-500'>取消</Text>
            </Pressable>

            <Pressable className='flex-1 py-4' onPress={props.onOk}>
              <Text className='text-center text-violet-500'>确定</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
