import {GalleryPhotoContext} from './_gallery.model';

export interface MasterCategoryContext {
  id?: string,
  name?: string,
  slug?: string
  description?: string,
  image?: GalleryPhotoContext,
  svg?: GalleryPhotoContext,
  created?: Date,
  updated?: Date,
  skills?: MasterSkillContext[]
}

export interface MasterSkillContext {
  id?: number,
  name?: string,
  slug?: string,
  image?: GalleryPhotoContext,
  svg?: GalleryPhotoContext,
  categories?: MasterCategoryContext[],
  notices: string[],
  services?: string[],
  tips?: string[],
  tagList?: string[],
  created?: Date,
  updated?: Date
}


export enum WorkforceStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  WORK = 'work'
}

export enum WorkforceSimpleType {
  DAILY = 'daily',
  CONTRACT = 'contract'
}
