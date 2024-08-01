/**
 * @name FavoriteDetail
 * @description 收藏夹详情
 * @author darcrand
 */

import PostGridItem from '@/components/PostGridItem'
import TopHeader from '@/components/TopHeader'
import { LAYOUT_SPACING } from '@/constants/common'
import { useNavigationOptions } from '@/hooks/useNavigationOptions'
import { favoriteService } from '@/services/favorite'
import { postService } from '@/services/post'
import UDialog from '@/ui/UDialog'
import UIconButton from '@/ui/UIconButton'
import { getPostColumns } from '@/utils/getPostColumns'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native'

export default function FavoriteDetail() {
  useNavigationOptions({ headerShown: false })

  const { id } = useLocalSearchParams<{ id: string }>()
  const favoriteId = Number(id)
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['favorite', favoriteId],
    queryFn: () => favoriteService.getById(favoriteId),
  })

  const { data: postRes } = useQuery({
    enabled: !!id,
    queryKey: ['favorite', 'posts', favoriteId],
    queryFn: () => postService.pages({ favoriteId }),
  })

  const cols = useMemo(
    () =>
      getPostColumns({
        posts: postRes?.records || [],
        columnCount: 2,
        spacing: LAYOUT_SPACING,
      }),
    [postRes?.records],
  )

  const removeMutation = useMutation({
    mutationFn: () => favoriteService.remove(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
      router.canDismiss() && router.dismissAll()
    },
  })

  const onRemove = () => {
    Alert.alert('提示', '确定要删除吗？', [
      {
        text: '取消',
        onPress: () => {},
      },
      {
        text: '删除',
        onPress: () => {
          removeMutation.mutate()
        },
      },
    ])
  }

  const [visible, setVisible] = useState(false)

  return (
    <>
      <SafeAreaView className='bg-white'>
        <View className='h-screen'>
          <TopHeader
            title={data?.name}
            right={
              <>
                <UIconButton size={20} icon='edit' onPress={() => router.push(`/favorite-edit?id=${favoriteId}`)} />
                <UIconButton wrapperClassName='pr-4' size={20} icon='delete' onPress={() => setVisible(true)} />
              </>
            }
          />

          <ScrollView showsVerticalScrollIndicator={false}>
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
        </View>
      </SafeAreaView>

      <UDialog open={visible} onClose={() => setVisible(false)} onOk={onRemove}>
        <Text className='text-center'>确定要删除此收藏夹吗？</Text>
      </UDialog>
    </>
  )
}
