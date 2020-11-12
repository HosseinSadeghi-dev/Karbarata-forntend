export interface GalleryAlbumContext {
  id?: string,
  name?: string
  slug?: string,
  photos?: GalleryPhotoContext[]
}

export interface GalleryPhotoContext {
  id?: number,
  name?: string,
  created?: string,
  updated?: string,
  album?: GalleryAlbumContext
}

