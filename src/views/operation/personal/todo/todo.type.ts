export interface ConfigTodoType {
  notifyStatus: boolean,
  advanceDay: number,
  priority: 1 | 2 | 3 | 4 | ''
}

export interface TodoItemType {
  index: number | string
  tags: string[]
  name: string
  priority: 1 | 2 | 3 | 4 | ''
  status: 'doing' | 'done' | 'abandon'
  remark: string
  startTime: string
  doneTime: string
}