<template>
  <div class="C_todoItem">
    <header>
      <span class="title" @click="handleEdit">
        Todo事项
        <el-icon class="edit-icon">
          <Edit />
        </el-icon>
      </span>
      <div class="icons">
        <el-icon class="delete-icon">
          <Delete @click="handleDelete"/>
        </el-icon>
      </div>
    </header>
    <section class="todoItem-content">
      <p class="todoItem-name">
        {{ todoItem.name }}
      </p>
      <p class="todoItem-priority">
        优先级: 
        <span
          :style="{
            color: colorMap[todoItem.priority]
          }"
        >
          {{ priorityMap[todoItem.priority] }}
        </span>
      </p>
      <p class="todoItem-doneTime">
        截至日期: {{ todoItem.doneTime }}
      </p>
      <el-tooltip
        effect="light"
        placement="top"
        :content="todoItem.remark"
      >
        <p class="todoItem-remark">
          TODO描述: {{ todoItem.remark || '--' }}
        </p>
      </el-tooltip>
    </section>
    <section class="todoItem-operation">
      <el-button
        v-if="todoItem.status !== 'done'"
        text
        size="small"
        :icon="CircleCheck"
        @click="handleCheck"
      >
        Done
      </el-button>
      <el-button
        v-else
        text
        size="small"
        :icon="RefreshRight"
        @click="handleUnDone"
      >
        Un Done
      </el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CircleCheck, Edit, Delete, RefreshRight } from '@element-plus/icons-vue'
import type { TodoItemType } from '../todo.type'

const props = defineProps<{
  readonly todoItem: TodoItemType
}>()
const $emit = defineEmits<{
  (e: 'deleteTodoItem', value: TodoItemType): void,
  (e: 'editTodoItem', value: TodoItemType): void,
  (e: 'checkTodoItem', value: TodoItemType): void,
  (e: 'unDoneTodoItem', value: TodoItemType): void
}>()

const handleDelete = () => {
  $emit('deleteTodoItem', props.todoItem)
}
const handleEdit = () => {
  $emit('editTodoItem', props.todoItem)
}
const handleCheck = () => {
  $emit('checkTodoItem', props.todoItem)
}
const handleUnDone = () => {
  $emit('unDoneTodoItem', props.todoItem)
}

const colorMap = {
  '': '#000000',
  1: '##67C23A',
  2: '#409EFF',
  3: '#E6A23C',
  4: '#F56C6C'
}
const priorityMap = {
  '': '--',
  1: '悠闲',
  2: '普通',
  3: '紧张',
  4: '急迫'
}
</script>

<style scoped lang="scss">
.C_todoItem {
  position: relative;
  height: 170px;
  padding: 10px 8px;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px #cccccc;
  transition: all 0.1s ease-in;

  &:hover {
    transform: scale(1.02);
  }

  .edit-icon,
  .delete-icon {
    &:hover {
      color: $todo-theme-color;
    }
  }
  

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .title {
      display: flex;
      align-items: center;
      padding: 0 18px 5px 8px;
      border-left: 2px solid $todo-theme-color;
      border-bottom: 2px solid $todo-theme-color;
      border-radius: 0px 8px;
      font-size: 14px;
      cursor: pointer;

      .edit-icon {
        display: inline;
        font-size: 14px;
        margin-left: 7px;
      }
    }

    .delete-icon {
      float: right;
      cursor: pointer;
    }
  }

  .todoItem-content {
    padding: 0 3px 30px;

    p {
      font-size: 12px;
      margin: 7px 0;
    }

    .todoItem-name {
      margin-top: 12px;
      font-size: 14px;
      font-weight: 700;
    }

    .todoItem-remark {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      max-height: 28px;
    }
  }

  .todoItem-operation {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);

    .el-button {
      &:hover {
        color: #ffffff;
        background-color: $todo-theme-color;
      }
    }
  }
}
</style>