import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { formatDate } from '@/utils/formatter'
import type { TodoItemType } from '../todo.type'

export function useTodo() {
  const formRef = ref<FormInstance>()
  const todoItem: TodoItemType = reactive({
    index: '',
    tags: [],
    name: '',
    priority: '',
    status: 'doing',
    remark: '',
    startTime: '',
    doneTime: ''
  })
  const todoItemRules = {
    name: [{ required: true, message: '请输入TODO事项', trigger: 'blur'}],
    tags: [{ required: true, message: '请选择标签', trigger: 'blur'}],
    priority: [{ required: true, message: '请选择优先级', trigger: 'blur'}],
    status: [{ required: true, message: '请选择当前状态', trigger: 'blur'}],
    doneTime: [{ required: true, message: '请选择完成时间', trigger: 'blur'}]
  }
  const disabledDate = (date: Date): boolean => {
    const [year, month, day] = formatDate(date).split('-')
    const [currentYear, currentMonth, currentDay] = formatDate(new Date).split('-')
    if (year < currentYear) {
      return true
    } else if ((year === currentYear) && (month < currentMonth)) {
      return true
    } else if ((year === currentYear) && (month === currentMonth) && (day < currentDay)) {
      return true
    }
    return false
  }

  return {
    formRef,
    todoItem,
    todoItemRules,
    disabledDate
  }
}