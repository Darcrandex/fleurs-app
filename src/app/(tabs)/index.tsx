/**
 * @name IndexTab
 * @description
 * @author darcrand
 */

import { http } from '@/utils/http'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function IndexTab() {
  const { data } = useQuery({
    queryKey: ['post', 'pages'],
    queryFn: () => http.get('/api/post').then((res) => res.data),
  })

  useEffect(() => {
    console.log('data ===>\n', data)
  }, [data])

  return (
    <>
      <View>
        <Text>Index</Text>
      </View>
    </>
  )
}
