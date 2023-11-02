<template>
  <div class="login-container">
    <div class="mark">
      <img src="~images/logo.svg" alt="" />
      <h2>Vue3 + TypeScript</h2>
    </div>
    <el-card class="login-panel">
      <h2 class="title">
        <el-icon><ElementPlus /></el-icon>
        <span>Element Plus</span>
      </h2>
      <el-form ref="form" :model="formData" :rules="formRules">
        <el-form-item prop="username">
          <el-input v-model="formData.username">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" :type="showPassword ? '' : 'password'">
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
            <template #suffix>
              <el-icon @click="changeType">
                <component :is="showPassword ? View : Hide" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <section class="remember">
          <el-checkbox v-model="formData.remembered" size="small" />
          <span>Remember me</span>
        </section>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElementPlus, User, Key, View, Hide } from '@element-plus/icons-vue'
import useLogin from '@/hooks/useLogin'

const {
  form,
  formData,
  formRules,
  showPassword,
  changeType,
  onSubmit
} = useLogin()
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('images/login-bg.svg');

  .mark {
    display: flex;
    position: fixed;
    top: 5vh;
    left: 8vw;

    img {
      width: 24px;
    }

    h2 {
      margin-left: 5px;
      font-size: 16px;
    }
  }

  .login-panel {
    width: 320px;
    height: 240px;

    .title {
      margin: 0px 0px 15px;
      text-align: center;
      color: #409eff;
    }
  }

  :deep(.el-form-item__content) {
    .el-form-item__error {
      right: 0;
      left: unset;
    }
  }

  :deep(.el-button) {
    width: 120px;
    margin: auto;
  }

  .remember {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
    padding: 0 1px;
    margin-top: -5px;
    margin-bottom: 15px;

    span {
      color: #666666;
      font-size: 12px;
    }
  }
}
</style>
