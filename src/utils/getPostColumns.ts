// 文章多列瀑布流布局的逻辑

import { Dimensions } from 'react-native'
import { toFixed } from './common'

export type PostColumn = {
  id: string
  items: (API.PostShema & { imgWidth: number; imgHeight: number })[]
  height: number
}

export function getPostColumns(params: {
  posts: API.PostShema[]
  columnCount?: number
  spacing?: number
  wrapperWidth?: number
}): PostColumn[] {
  if (!params.posts || !Array.isArray(params.posts) || !params.columnCount || params.columnCount < 1) return []

  const wrapperWidth = params.wrapperWidth || Dimensions.get('window').width
  const columnCount = params.columnCount || 2
  const spacing = params.spacing || 16
  const imgWidth = toFixed((wrapperWidth - (1 + columnCount) * spacing) / columnCount)

  const columns: PostColumn[] = Array(columnCount)
    .fill(0)
    .map(() => ({ id: '', items: [], height: 0 }))

  params.posts.forEach((v) => {
    // 获取高度最小的列
    const targetIdx = columns.reduce((pre, cur, index) => (cur.height < columns[pre].height ? index : pre), 0)
    const targetCol = columns[targetIdx]
    const imgHeight = toFixed(imgWidth / v.coverAspectRatio)
    targetCol.items.push({ ...v, imgWidth, imgHeight })
    targetCol.height += imgHeight
  })

  return columns.map((g) => ({ ...g, id: Math.random().toString() }))
}
