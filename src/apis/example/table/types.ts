export type TableResponse = {
  data: TableItemResponse,
  total: number
}
export type TableItemResponse = {
  id: number | string,
  author: string,
  title: string,
  display_time: string,
  status: 'published' | 'draft' | 'deleted',
  pageViews: string
}[]