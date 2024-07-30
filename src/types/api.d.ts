declare namespace API {
  type PageData<T = any> = {
    records: T[]
    total: number
    page: number
    pageSize: number
  }

  type PostShema = {
    id: number
    title: string
    content: string
    coverUrl: string
    coverWidth: number
    coverHeight: number
    coverAspectRatio: number
    coverThumbnail: string

    authorId: number
    author: { name: string; avatar: string }
    createdAt: string
  }

  type LikeSchema = {
    id: number
    userId: number
    postId: number
  }

  type FavoriteSchema = {
    id: number
    name: string
    userId: number
    posts: { postId: number; favoriteId: number; post?: PostShema }[]
  }

  type UserSchema = {
    id: number
    email: string
    password: string
    avatar: any
    role: string
    name: string
    posts: PostShema[]
    likes: LikeSchema[]
    favorites: { id: number; name: string }[]
  }

  type CategorySchema = {
    id: number
    name: string
  }
}
