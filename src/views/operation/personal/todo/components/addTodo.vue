<template>
  <div class="C_addTodo">
    <h3 class="addTodo-title">添加TODO</h3>
    <section class="addTodo-form">
      <el-form
        ref="formRef"
        :model="todoItem"
        :rules="todoItemRules"
        label-width="95px"
        label-position="right"
      >
        <el-form-item prop="name" label="TODO名称">
          <el-input
            clearable
            placeholder="请输入"
            v-model="todoItem.name"
          />
        </el-form-item>
        <el-form-item prop="tags" label="标签">
          <el-select
            multiple
            clearable
            placeholder="请选择"
            v-model="todoItem.tags"
          >
            <el-option
              v-for="item in tags"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="priority" label="优先级">
          <el-select
            clearable
            placeholder="请选择"
            v-model="todoItem.priority"
          >
            <el-option
              v-for="item in priority"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="doneTime" label="完成时间">
          <el-date-picker
            clearable
            class="date-picker"
            v-model="todoItem.doneTime"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择"
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input
            type="textarea"
            v-model="todoItem.remark"
            placeholder="请输入"
            :rows="4"
          />
        </el-form-item>
      </el-form>
      <section class="addTodo-operation">
        <el-button
          type="primary"
          @click="addTodo"
        >
          添加
        </el-button>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { generateUUID } from '@/utils/uniqueId'
import { useTodo } from '../hooks/useTodo'
import { formatDate } from '@/utils/formatter'
import type { TodoItemType } from '../todo.type'
import { tags, priority} from '../data'

const $emit = defineEmits<{
  (e: 'addTodoItem', value: TodoItemType): void
}>()

const {
  formRef,
  todoItem,
  todoItemRules,
  disabledDate
} = useTodo()


const addTodo = async () => {
  await formRef.value?.validate()
  todoItem.index = generateUUID()
  todoItem.startTime = formatDate(new Date())
  $emit('addTodoItem', {...todoItem})
  nextTick(() => {
    formRef.value?.resetFields()
  })
}
</script>

<style scoped lang="scss">
.C_addTodo {
  height: 100%;
  position: relative;
  padding: 20px 10px;
  box-sizing: border-box;

  .addTodo-title {
    margin: 0;
    color: $todo-theme-color;
    padding-bottom: 7px;
    border-bottom: 2px solid currentColor;
  }

  .addTodo-form {
    margin-top: 12px;
    padding-right: 10px;

    .el-select,
    :deep(.date-picker) {
      width: 100%;
    }
  }

  .addTodo-operation {
    position: absolute;
    left: 50%;
    padding-bottom: 50px;
    margin-top: 100px;
    transform: translateX(-50%);
  }
}
</style>