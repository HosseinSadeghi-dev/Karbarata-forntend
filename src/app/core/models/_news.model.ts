import {GalleryPhotoContext} from '@app/core/models/_gallery.model';
import {ProfileContext} from '@app/core/models/_user.model';

export interface NewsCategoryContext {
  id?: number,
  name?: string,
  slug?: string
}

export enum NewsStatus {
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished'
}

export interface NewsContext {
  id: number,
  slug: string,
  title: string,
  description: string,
  content: string,
  image: GalleryPhotoContext,
  created: string,
  updated: string,
  tagList: string[],
  favoriteCount: number,
  reporter: ProfileContext,
  categories: NewsCategoryContext[],
  favoriteClients: ProfileContext[],
  status: NewsStatus,
  readingTime: number
}
