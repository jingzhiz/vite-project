<template>
  <div class="notFound-container">
    <section class="notFound-description">
      <h3 class="title">
        <img class="logo" src="~images/logo.svg" alt="">
        Vue3 + Typescript
      </h3>
      <section>
        <p class="description">This page isn't available. The link you followed may be broken, or the page may have been removed. Sorry about that.</p>
        <el-button type="primary" @click="backHome">返回首页</el-button>
      </section>
    </section>
    <img class="notFound_bg" src="~images/404.png" alt="">
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

const $router = useRouter()

const backHome = () => {
  $router.push('/')
}
</script>

<style scoped lang="scss">
.notFound-container {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;

  .notFound-description {
    position: absolute;
    left: 10%;
    top: 20%;
    width: 380px;

    .title {
      height: 64px;
      line-height: 64px;
      font-size: 32px;

      .logo {
        height: 64px;
        width: 64px;
        margin-bottom: -10px;
      }
    }

    .description {
      font-size: 24px;
    }

    .el-button {
      position: absolute;
      left: 45%;
      transform: translateX(-50%);
    }
  }

  .notFound_bg {
    position: absolute;
    right: -5%;
    height: 100%;
    width: 75%;
  }
}
</style>