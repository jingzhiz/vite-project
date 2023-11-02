import { defineStore } from 'pinia'
import { ElMessage, ElNotification } from 'element-plus'
import cache from '@/utils/cache'
import { formatDate } from '@/utils/formatter'
import { TodoNotifyState } from './type'
import { TodoItemType } from '@/views/operation/personal/todo/todo.type'

const useTodoNoticeStore = defineStore('todo', {
  state: (): TodoNotifyState => {
    let todoConfig = cache.getCache('TodoConfig')
    if (!todoConfig) {
      todoConfig = {
        notifyStatus: true,
        advanceDay: 3,
        priority: 3
      }
    }
    return todoConfig
  },
  actions: {
    configNotify(notifyConfig: TodoNotifyState) {
      Object.assign(this.$state, notifyConfig)
      cache.setCache('TodoConfig', notifyConfig)
      ElMessage({
        type: 'success',
        message: "设置成功"
      })
    },
    notify() {
      const todoList = cache.getCache('TODO')
      if (todoList && todoList.length) {
        if (this.notifyStatus) {
          const deadlineTodo: TodoItemType[] = []
          const outOfDateTodo: TodoItemType[] = []
          todoList.forEach((todo: TodoItemType) => {
            if (todo.status !== 'doing') return
            const [year, month, day] = todo.doneTime.split('-')
            const [currentYear, currentMonth, currentDay] = formatDate(new Date).split('-')
            if (
              currentYear === year &&
              currentMonth === month &&
              ((Number(currentDay) - Number(day)) <= this.advanceDay)
            ) {
              if (this.priority) {
                if (Number(todo.priority) >= Number(this.priority)) {
                  deadlineTodo.push(todo)
                }
              } else {
                deadlineTodo.push(todo)
              }
            }
            if (
              currentYear > year ||
              ((currentYear === year) && (currentMonth > month)) ||
              ((currentYear === year) && (currentMonth === month) && (Number(currentDay) - Number(day) > 0))
            ) {
              if (this.priority) {
                if (Number(todo.priority) >= Number(this.priority)) {
                  outOfDateTodo.push(todo)
                }
              } else {
                outOfDateTodo.push(todo)
              }
            }
          })
          if (deadlineTodo.length || outOfDateTodo.length) {
            ElNotification({
              title: 'TODO提醒',
              position: 'top-right',
              duration: 0,
              dangerouslyUseHTMLString: true,
              message: (() => {
                let htmlStr = ''
                if (deadlineTodo.length) {
                  htmlStr += `
                    <p>
                      您当前还存在<span class="info">${deadlineTodo.length}</span>条TODO未进行处理, 距离完成日期还剩<span class="warning">${this.advanceDay}</span>天不到, 请你尽快完成事项
                    </p>
                  `
                }
                if (outOfDateTodo.length) {
                  htmlStr += `
                    <p>
                      您当前还存在<span class="danger">${outOfDateTodo.length}</span>条TODO已经超过处理时间, 请重新按排TODO事项
                    </p>
                  `
                }
                return `
                  <section class="notice-container">
                    ${htmlStr}
                    <style>
                      .notice-container {
                        font-size: 12px;
                      }
                      .info, .danger, .warning {
                        font-weight: 700;
                      }
                      .info {
                        color: #409EFF;
                      }
                      .danger {
                        color: #F56C6C;
                      }
                      .warning {
                        color: #E6A23C;
                      }
                    </style>
                  </section>
                `
              })(),
            })
          }
        }
      }
    }
  }
})

export default useTodoNoticeStore