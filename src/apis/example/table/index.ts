import request from '@/utils/request'
import type { TableResponse } from './types'

export function getTableData(fn: (data: TableResponse) => void, errFn?: (data?: unknown) => void) {
  return request.get<TableResponse>({
    url: '/mock/table/list'
  })
    .then((data: TableResponse) => {
      fn(data)
    })
    .catch((e) => {
      console.error(e)
      errFn && errFn()
    })
}