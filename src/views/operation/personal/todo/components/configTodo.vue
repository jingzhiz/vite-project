<template>
  <div class="C_configTodo">
    <el-form
      ref="formRef"
      v-if="isEdit"
      class="configTodo-form"
      label-position="top"
      :model="configForm"
      :rules="formRules"
    >
      <el-form-item class="config-status">
        <span class="el-form-item__label">
          开启TODO提醒: 
        </span>
        <el-switch v-model="configForm.notifyStatus"/>
      </el-form-item>
      <el-form-item label="优先级设置:">
        <el-select
          clearable
          v-model="configForm.priority"
          placeholder="请选择"
        >
          <el-option
            v-for="item in priority"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="advanceDay" label="临近通知天数:">
        <el-select
          clearable
          v-model="configForm.advanceDay"
          placeholder="请选择"
        >
          <el-option
            v-for="item in 3"
            :key="item"
            :label="'提前' + item + '天'"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <section v-else class="static">
      <p>开启TODO提醒: {{ configForm.notifyStatus ? '开启' : '关闭' }}</p>
      <p>优先级设置: {{ priority.find(item => item.value === configForm.priority)?.label || '--'  }}</p>
      <p>临近通知天数: 提前{{ configForm.advanceDay }}天</p>
    </section>
    <section class="configTodo-operation">
      <el-button
        v-if="!isEdit"
        size="small"
        type="primary"
        @click="openEdit"
      >
        修改配置
      </el-button>
      <el-button
        v-if="isEdit"
        size="small"
        type="primary"
        @click="submit"
      >
        修改
      </el-button>
      <el-button
        v-if="isEdit"
        size="small"
        @click="cancel"
      >
        取消
      </el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import useTodoNoticeStore from 'store/module/notification/todoNotify'
import { ConfigTodoType } from '../todo.type'
import { priority } from '../data'

const noticeStore = useTodoNoticeStore()

const formRef = ref<FormInstance>()
const configForm = reactive<ConfigTodoType>({...noticeStore.$state})
const formRules = {
  advanceDay: [{
    required: true, message: '请选择临近通知天数', trigger: 'change'
  }]
}

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}
const submit = async () => {
  await formRef.value?.validate()
  noticeStore.configNotify(configForm)
  cancel()
}
const cancel = () => {
  formRef.value?.resetFields()
  Object.assign(configForm, noticeStore.$state)
  isEdit.value = false
}
</script>

<style scoped lang="scss">
.C_configTodo {
  padding: 5px 8px;

  .configTodo-form {
    .config-status {
      margin-bottom: 5px;

      .el-form-item__label {
        margin: 0;
      }
    }

    :deep(.el-form-item__label) {
      font-size: 12px;
    }

    .el-select {
      width: 100%;
    }
  }

  .static {
    padding: 0 5px;
    margin-bottom: 20px;

    p {
      font-size: 12px;
    }
  }

  .configTodo-operation {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>