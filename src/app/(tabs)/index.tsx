/**
 * @name Find
 * @description 发现（tab）
 * @author darcrand
 */

import PostGridItem from '@/components/PostGridItem'
import { categoryService } from '@/services/category'
import { postService } from '@/services/post'
import { cls } from '@/utils/cls'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { Dimensions, Pressable, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'

const ALL_CATEGORY_ID = -1
const COLUMN_COUNT = 2
const SPACING = 16

export default function Find() {
  const { data: categories } = useQuery({
    queryKey: ['category', 'all'],
    queryFn: () => categoryService.all(),
    select: (data) => [{ id: ALL_CATEGORY_ID, name: '全部' }, ...data],
  })

  const [query, setQuery] = useState({ categoryId: ALL_CATEGORY_ID, page: 1 })
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['post', 'pages', query],
    queryFn: async () => {
      return postService.pages({
        ...query,
        categoryId: query.categoryId === ALL_CATEGORY_ID ? undefined : query.categoryId,
      })
    },
  })

  const onRefresh = useCallback(() => {
    setQuery((prev) => ({ ...prev, page: 1 }))
    refetch()
  }, [refetch])

  const cols = useMemo(() => {
    if (!data || !Array.isArray(data.records)) return []

    const winWidth = Dimensions.get('window').width
    const imgWidth = Number.parseFloat(((winWidth - (1 + COLUMN_COUNT) * SPACING) / COLUMN_COUNT).toFixed(2))
    const arr: { id: string; items: (API.PostShema & { imgWidth: number; imgHeight: number })[]; height: number }[] =
      Array(COLUMN_COUNT)
        .fill(0)
        .map(() => ({ id: '', items: [], height: 0 }))

    data.records.forEach((v) => {
      // 获取高度最小的列
      const targetIdx = arr.reduce((pre, cur, index) => (cur.height < arr[pre].height ? index : pre), 0)
      const targetCol = arr[targetIdx]
      const imgHeight = Number.parseFloat((imgWidth / v.coverAspectRatio).toFixed(2))
      targetCol.items.push({ ...v, imgWidth, imgHeight })
      targetCol.height += imgHeight
    })

    return arr.map((g) => ({ ...g, id: Math.random().toString() }))
  }, [data])

  return (
    <SafeAreaView className='bg-white'>
      <View className='h-screen bg-white'>
        <View>
          <ScrollView horizontal>
            {categories?.map((v) => (
              <Pressable
                key={v.id}
                className={cls('m-2 rounded-full px-3 py-1 text-sm', query.categoryId === v.id && 'bg-gray-900')}
                onPress={() => setQuery({ ...query, categoryId: v.id, page: 1 })}
              >
                <Text className={query.categoryId === v.id ? 'text-white' : 'text-gray-900'}>{v.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className='flex-1 bg-gray-50'
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        >
          <View className='flex flex-row' style={{ marginHorizontal: 0.5 * SPACING, marginVertical: SPACING }}>
            {cols.map((c) => (
              <View key={c.id} style={{ marginHorizontal: 0.5 * SPACING }} className='space-y-4'>
                {c.items.map((v) => (
                  <View key={v.id}>
                    <PostGridItem data={v} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
