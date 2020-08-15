
export interface FaqContext {
  id?: number,
  slug?: string,
  question?: string,
  answer?: string,
  categories?: FaqCategoryContext[],
  created?: string,
  updated?: string
}

export interface FaqCategoryContext {
  id?: number,
  name?: string,
  slug?: string
}
