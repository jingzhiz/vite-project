<template>
  <div class="form-container">
    <el-form
      ref="form"
      label-width="130px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item prop="name" label="Activity name">
        <el-input v-model="formData.name" style="width: 355px;"/>
      </el-form-item>
      <el-form-item prop="region" label="Activity zone">
        <el-select v-model="formData.region" clearable style="width: 355px;">
          <el-option label="上海" value="101" />
          <el-option label="北京" value="102" />
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item prop="date" label="Activity time">
            <el-date-picker
              type="date"
              v-model="formData.date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-form-item prop="time" label-width="0">
            <el-time-picker
              type="time"
              v-model="formData.time"
              placeholder="Pick a time"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="delivery" label="Instant delivery">
        <el-switch v-model="formData.delivery" />
      </el-form-item>
    </el-form>
    <section class="operation">
      <el-button
        type="primary"
        @click="handleConfirm"
      >
        确定
      </el-button>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, readonly } from 'vue'
import { ElMessage } from 'element-plus'

const form = ref()
const formData = reactive({
  name: '',
  region: '',
  date: '',
  time: '',
  delivery: ''
})
const formRules = readonly({
  name: {required: true, message: 'please input name', trigger: 'blur'},
  region: {required: true, message: 'please input region', trigger: 'blur'},
  date: {required: true, message: 'please select date', trigger: 'change'},
  time: {required: true, message: 'please select time', trigger: 'change'}
})

const handleConfirm = async () => {
  await form.value.validate()
  Object.keys(formData).forEach(key => {
    formData[key as keyof typeof formData] = ''
  })
  ElMessage({
    type: 'success',
    message: '数据写入成功!',
    duration: 2000
  })
}
</script>

<style lang="scss" scoped>
.form-container {
  padding: 20px;

  .operation {
    padding-left: 12px;
  }
}
</style>
