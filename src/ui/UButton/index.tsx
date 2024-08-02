/**
 * @name UButton
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { PropsWithChildren } from 'react'
import { Pressable, Text } from 'react-native'

export type UButtonProps = PropsWithChildren<{
  variant?: 'default' | 'primary'
  wrapperClassName?: string
  onPress?: () => void
  loading?: boolean
}>

export default function UButton(props: UButtonProps) {
  return (
    <Pressable
      className={cls(
        'rounded px-4 py-2',
        props.variant === 'primary' && 'bg-violet-500',
        props.loading && 'opacity-50',
        props.wrapperClassName,
      )}
      onPress={() => {
        props.onPress && !props.loading && props.onPress()
      }}
    >
      <Text className={cls('text-center', props.variant === 'primary' && 'text-white')}>{props.children}</Text>
    </Pressable>
  )
}
