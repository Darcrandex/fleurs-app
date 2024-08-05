/**
 * @name PreviewedImage
 * @description 可缓存，可预览的图片
 * @author darcrand
 */

import ImageView from '@erosargsyan/react-native-image-viewing'
import { useQuery } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import { useState } from 'react'
import { Image, ImageProps, Pressable } from 'react-native'

export type PreviewedImageProps = ImageProps & {
  url?: string
  imageClassName?: string
}

export default function PreviewedImage(props: PreviewedImageProps) {
  const [visible, setVisible] = useState(false)
  const { data: cachedImageUrl } = useQuery({
    enabled: !!props.url,
    queryKey: ['cached-image', props.url],
    queryFn: () => getCachedImage(props.url || ''),
  })

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <Image
          source={{ uri: cachedImageUrl }}
          className={props.imageClassName}
          style={props.style}
          resizeMode='cover'
        />
      </Pressable>

      <ImageView
        visible={visible}
        imageIndex={0}
        images={[{ uri: cachedImageUrl }]}
        onRequestClose={() => setVisible(false)}
      />
    </>
  )
}

const getCachedImage = async (uri: string): Promise<string> => {
  const filename = uri.split('/').pop() || 'default.jpg'
  const path = `${FileSystem.cacheDirectory}${filename}`

  const image = await FileSystem.getInfoAsync(path)
  if (image.exists) {
    return path
  }

  const newImage = await FileSystem.downloadAsync(uri, path)
  return newImage.uri
}
