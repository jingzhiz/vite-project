import  dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言

dayjs.locale('zh-cn') // 使用本地化语言

type DateType = string | number | Date | null | undefined
export function formatDate(date: DateType, template = 'YYYY-MM-DD') {
  return dayjs(date).format(template)
}