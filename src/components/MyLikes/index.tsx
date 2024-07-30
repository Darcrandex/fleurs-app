/**
 * @name MyLikes
 * @description
 * @author darcrand
 */

import { useProfile } from '@/queries/useProfile'
import { ScrollView, Text } from 'react-native'

export default function MyLikes() {
  const profileRes = useProfile()

  return (
    <ScrollView showsVerticalScrollIndicator={false} className='bg-gray-50'>
      <Text>MyLikes</Text>
    </ScrollView>
  )
}
