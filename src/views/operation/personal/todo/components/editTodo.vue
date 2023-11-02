<template>
  <el-dialog
    width="520px"
    title="修改TODO"
    :model-value="editVisible"
    @close="handleClose"
  >
    <section class="editTodo-form">
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
            v-model="todoItem.tags"
            placeholder="请选择"
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
        <el-form-item prop="status" label="当前状态">
          <el-select
            clearable
            placeholder="请选择"
            v-model="todoItem.status"
          >
            <el-option
              v-for="item in status"
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
    </section>
    <template #footer>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useTodo } from '../hooks/useTodo'
import { TodoItemType } from '../todo.type'
import { tags, priority, status} from '../data'

defineProps({
  editVisible: {
    type: Boolean,
    required: true
  }
})
const $emit = defineEmits<{
  (e: 'update:editVisible', value: boolean): void,
  (e: 'editTodoItem', value: TodoItemType): void,
}>()

const {
  formRef,
  todoItem,
  todoItemRules,
  disabledDate
} = useTodo()

const initTodo = (todo: TodoItemType) => {
  Object.assign(todoItem, todo)
}

const handleConfirm = async () => {
  await formRef.value?.validate()
  $emit('editTodoItem', {...todoItem})
  handleClose()
  nextTick(() => {
    formRef.value?.resetFields()
  })
}

const handleClose = () => {
  $emit('update:editVisible', false)
}

defineExpose({
  initTodo
})
</script>

<style scoped lang="scss">
.editTodo-form {
  .el-select,
  :deep(.date-picker) {
    width: 100%;
  }
}
</style>