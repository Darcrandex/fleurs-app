/**
 * @name UInput
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { TextInput, View, type TextInputProps } from 'react-native'

export type UInputProps = Omit<TextInputProps, 'className'> & {
  wrapperClassName?: string
  inputClassName?: string
}

export default function UInput(props: UInputProps) {
  const { wrapperClassName, inputClassName, ...inputProps } = props

  return (
    <View className={cls(wrapperClassName)}>
      <TextInput {...inputProps} className={cls('rounded bg-gray-100 p-2 text-sm', inputClassName)} />
    </View>
  )
}
