/**
 * @name UIconButton
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { AntDesign } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import { gray } from 'tailwindcss/colors'

export type UIconButtonProps = {
  icon?: string
  color?: string
  size?: number

  onPress?: () => void
  loading?: boolean
  wrapperClassName?: string
}

export default function UIconButton(props: UIconButtonProps) {
  // Pressable 不能嵌套
  const Wrapper = typeof props.onPress === 'undefined' ? View : Pressable

  return (
    <Wrapper
      className={cls('p-2 transition-all', props.loading && 'opacity-50', props.wrapperClassName)}
      onPress={() => {
        if (props.onPress && !props.loading) props.onPress()
      }}
    >
      <AntDesign name={props.icon as any} size={props.size || 24} color={props.color || gray[900]} />
    </Wrapper>
  )
}
