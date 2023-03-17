import { Offer } from "./offers"

export type Comment = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
}
export type CommentAuth = Pick<Comment, 'comment' | 'rating'> & Pick<Offer, 'id'>
