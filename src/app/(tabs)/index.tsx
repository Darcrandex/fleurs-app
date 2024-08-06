/**
 * @name Find
 * @description 发现（tab）
 * @author darcrand
 */

import PostGridItem from '@/components/PostGridItem'
import { LAYOUT_SPACING } from '@/constants/common'
import { categoryService } from '@/services/category'
import { postService } from '@/services/post'
import UEmpty from '@/ui/UEmpty'
import { cls } from '@/utils/cls'
import { getPostColumns } from '@/utils/getPostColumns'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { Pressable, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'

const ALL_CATEGORY_ID = -1

export default function Find() {
  const { data: categories } = useQuery({
    queryKey: ['category', 'all'],
    queryFn: () => categoryService.all(),
    select: (data) => [{ id: ALL_CATEGORY_ID, name: '全部' }, ...data],
  })

  const [query, setQuery] = useState({ categoryId: ALL_CATEGORY_ID, page: 1 })

  const {
    data: pageData,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['post', 'pages', query],
    initialPageParam: { page: 1, hasNext: true },
    queryFn: async ({ pageParam }) =>
      postService.pages({
        categoryId: query.categoryId === ALL_CATEGORY_ID ? undefined : query.categoryId,
        page: pageParam.page,
        pageSize: 20,
      }),
    getNextPageParam: (lastPage) => {
      const { page, pageSize, total } = lastPage
      const hasNext = page * pageSize < total
      return { page: 1 + page, hasNext }
    },
  })

  const total = pageData?.pages.reduce((acc, cur) => cur.total, 0)

  const onRefresh = useCallback(() => {
    setQuery((prev) => ({ ...prev, page: 1 }))
    refetch()
  }, [refetch])

  const cols = useMemo(
    () =>
      getPostColumns({
        posts: pageData?.pages.reduce<API.PostShema[]>((acc, cur) => [...acc, ...cur.records], []) || [],
        columnCount: 2,
        spacing: LAYOUT_SPACING,
      }),
    [pageData],
  )

  return (
    <SafeAreaView className='flex-1 bg-white'>
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
        <View
          className='flex flex-row'
          style={{ marginHorizontal: 0.5 * LAYOUT_SPACING, marginVertical: LAYOUT_SPACING }}
        >
          {cols.map((c) => (
            <View key={c.id} style={{ marginHorizontal: 0.5 * LAYOUT_SPACING }} className='space-y-4'>
              {c.items.map((v) => (
                <View key={v.id}>
                  <PostGridItem data={v} />
                </View>
              ))}
            </View>
          ))}
        </View>
        {total === 0 && <UEmpty />}
      </ScrollView>
    </SafeAreaView>
  )
}
