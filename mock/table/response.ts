import { ResultCodeEnum } from '../enum'
import { tableData } from './data'

const getTableList = {
  url: '/mock/table/list',
  method: 'get',
  response: () => {
    const data = tableData.items
    return {
      status: ResultCodeEnum.SUCCESS,
      message: 'success',
      data: {
        data,
        total: data.length
      }
    }
  }
}

export default [getTableList]