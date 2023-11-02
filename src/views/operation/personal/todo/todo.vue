<template>
  <div class="todo-container">
    <div class="left">
      <h3 class="todo-title">TODO配置</h3>
      <ConfigTodo />
    </div>
    <div class="middle">
      <AddTodo @add-todo-item="handleAddTodo"/>
    </div>
    <el-row class="right">
      <el-col :span="24" class="doing">
        <h3 class="todo-title">TODO进行中~</h3>
        <el-row class="todo-list-container" :gutter="10">
          <el-col
            v-for="item in doingTodoList"
            :key="item.index"
            :span="8"
          >
            <TodoItem
              :todo-item="item"
              @check-todo-item="(item) => changeTodoStatus(item, 'done')"
              @delete-todo-item="(item) => changeTodoStatus(item, 'delete')"
              @edit-todo-item="(item) => changeTodoStatus(item, 'edit')"
              @un-done-todo-item="(item) => changeTodoStatus(item, 'doing')"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="done">
        <h3 class="todo-title">完成的TODO</h3>
        <el-row class="todo-list-container" :gutter="10">
          <el-col
            v-for="item in doneTodoList"
            :key="item.index"
            :span="24"
          >
            <TodoItem
              :todo-item="item"
              @check-todo-item="(item) => changeTodoStatus(item, 'done')"
              @delete-todo-item="(item) => changeTodoStatus(item, 'delete')"
              @edit-todo-item="(item) => changeTodoStatus(item, 'edit')"
              @un-done-todo-item="(item) => changeTodoStatus(item, 'doing')"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="abandon">
        <h3 class="todo-title">放弃的TODO</h3>
        <el-row class="todo-list-container" :gutter="10">
          <el-col
            v-for="item in abandonTodoList"
            :key="item.index"
            :span="24"
          >
            <TodoItem
              :todo-item="item"
              @check-todo-item="(item) => changeTodoStatus(item, 'done')"
              @delete-todo-item="(item) => changeTodoStatus(item, 'delete')"
              @edit-todo-item="(item) => changeTodoStatus(item, 'edit')"
              @un-done-todo-item="(item) => changeTodoStatus(item, 'doing')"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <EditTodo
      ref="editTodoRef"
      :edit-visible="showTodoModify"
      @update:edit-visible="showTodoModify = $event"
      @edit-todo-item="handleEditTodo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox  } from 'element-plus'
import cache from '@/utils/cache'
import ConfigTodo from './components/configTodo.vue'
import AddTodo from './components/addTodo.vue'
import EditTodo from './components/editTodo.vue'
import TodoItem from './components/todoItem.vue'
import type { TodoItemType } from './todo.type'

let allTodoList = reactive<TodoItemType[]>([])
let doingTodoList = reactive<TodoItemType[]>([])
let doneTodoList = reactive<TodoItemType[]>([])
let abandonTodoList = reactive<TodoItemType[]>([])
const initTodoCache = () => {
  const todoRecord: TodoItemType[] = cache.getCache('TODO')
  if (todoRecord) {
    allTodoList = reactive<TodoItemType[]>(todoRecord)
  }
  cache.setCache('TODO', allTodoList)
}
initTodoCache()

const onTodoStatusChange = () => {
  doingTodoList.length = 0
  doneTodoList.length = 0
  abandonTodoList.length = 0
  allTodoList.forEach(item => {
    if (item.status === 'doing') {
      doingTodoList.push(item)
    } else if (item.status === 'done') {
      doneTodoList.push(item)
    } else {
      abandonTodoList.push(item)
    }
  })
  cache.setCache('TODO', allTodoList)
}
const unwatch = watch(
  allTodoList,
  onTodoStatusChange,
  {
    immediate: true
  }
)
onBeforeUnmount(() => {
  unwatch()
})

const handleAddTodo = (todo: TodoItemType) => {
  allTodoList.push(todo)
  ElMessage({
    type: 'success',
    message: '添加成功',
    duration: 2000
  })
}

const handleEditTodo = (todo: TodoItemType) => {
  const index = allTodoList.findIndex(item => item.index === todo.index)
  allTodoList.splice(index, 1, todo)
  ElMessage({
    type: 'success',
    message: '修改成功',
    duration: 2000
  })
}

const editTodoRef = ref()
const showTodoModify = ref(false)
const changeTodoStatus = (item: TodoItemType, status: 'doing' | 'done' | 'edit' | 'delete') => {
  if (status === 'edit') {
    showTodoModify.value = true
    editTodoRef.value.initTodo(item)
  } else if (status === 'delete') {
    ElMessageBox.confirm(
    '您确定要删除这条TODO?',
    '删除TODO',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }
  )
    .then(() => {
      const index = allTodoList.findIndex(todo => todo.index === item.index)
      allTodoList.splice(index, 1)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
  } else {
    const index = allTodoList.findIndex(todo => todo.index === item.index)
    allTodoList.splice(index, 1, {
      ...allTodoList[index],
      status
    })
  }
}
</script>

<style scoped lang="scss">
.todo-container {
  display: flex;

  .todo-title {
    height: 24px;
    padding: 10px 0px 7px 8px ;
    margin: 0 10px;
    border-bottom: 2px solid currentColor;
    color: $todo-theme-color;
    font-size: 16px;
  }

  .left {
    flex: 2;

    .todo-title {
      margin: 8px 10px 0px;
      font-size: 18px;
    }
  }

  .middle {
    flex: 3;
    border-left: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
  }

  .right {
    flex: 6;

    .doing, .done, .abandon {
      height: 50%;


      .todo-list-container {
        max-height: calc(100% - 42px);
        padding: 12px;
        overflow: auto;

        :deep(.el-col) {
          box-sizing: border-box;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>