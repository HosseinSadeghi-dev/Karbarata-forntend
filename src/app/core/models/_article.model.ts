import {ProfileContext} from './_user.model';
import {GalleryPhotoContext} from './_gallery.model';

export interface ArticleContext {
  id: number,
  slug: string,
  title: string,
  description: string,
  body: string,
  image: GalleryPhotoContext,
  created: string,
  updated: string,
  tagList: string[],
  favoriteCount: number,
  author: ProfileContext,
  categories: ArticleCategoryContext[],
  comments: ArticleCommentContext[],
  favoriteClients: ProfileContext[],
  status: ArticleStatus
}

export interface ArticleCategoryContext {
  id?: number,
  name?: string,
  slug?: string
}

export interface ArticleCommentContext {
  id?: number,
  body?: string,
  user?: ProfileContext,
  article?: ArticleContext,
  reply?: ArticleCommentReplyContext[],
  created?: string,
  updated?: string
}

export interface ArticleCommentReplyContext {
  id?: number,
  body?: string,
  user?: ProfileContext,
  created?: string,
  updated?: string
}

export enum ArticleStatus {
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished'
}
