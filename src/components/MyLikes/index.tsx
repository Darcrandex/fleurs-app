/**
 * @name MyLikes
 * @description
 * @author darcrand
 */

import PostGridItem from '@/components/PostGridItem'
import { LAYOUT_SPACING } from '@/constants/common'
import { likeService } from '@/services/like'
import { getPostColumns } from '@/utils/getPostColumns'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

export default function MyLikes() {
  const { data } = useQuery({
    queryKey: ['like', 'pages'],
    queryFn: () => likeService.pages(),
  })

  const cols = useMemo(
    () =>
      getPostColumns({
        posts: (data?.records || []).map((v) => v.post).filter(Boolean) as API.PostShema[],
        columnCount: 2,
        spacing: LAYOUT_SPACING,
      }),
    [data],
  )

  return (
    <ScrollView showsVerticalScrollIndicator={false} className='bg-gray-50'>
      <View
        className='flex flex-row'
        style={{ marginHorizontal: 0.5 * LAYOUT_SPACING, marginVertical: LAYOUT_SPACING }}
      >
        {cols.map((c) => (
          <View key={c.id} style={{ marginHorizontal: 0.5 * LAYOUT_SPACING }} className='space-y-4'>
            {c.items.map((v) => (
              <View key={v.id}>
                <PostGridItem data={v} showAuthor={false} />
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
