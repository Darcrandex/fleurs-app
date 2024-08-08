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
  const variant = props.variant || 'default'

  return (
    <Pressable
      className={cls(
        'rounded border px-4 py-2',
        variant === 'default' && 'border-gray-200 bg-white',
        variant === 'primary' && 'border-violet-500 bg-violet-500 text-white',
        props.loading && 'opacity-50',
        props.wrapperClassName,
      )}
      onPress={() => {
        props.onPress && !props.loading && props.onPress()
      }}
    >
      <Text className={cls('text-center', variant === 'primary' && 'text-white')}>{props.children}</Text>
    </Pressable>
  )
}
