<template>
  <div class="layout-container">
    <el-container>
      <AsideMenu v-if="!isHidden" :collapse="collapse" />
      <el-container class="layout-content">
        <Header @toggle="handleToggle" @switch="handleSwitch" />
        <Breadcrumb v-if="isHidden" style="border-bottom: 1px solid #e0e0e0;"/>
        <section
          class="app-main"
          :class="{
            gutter: isHidden
          }"
        >
          <router-view v-slot="{ Component, route }">
            <transition>
              <component class="container" :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </section>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Header from './component/Header.vue'
import AsideMenu from './component/AsideMenu/index.vue'
import Breadcrumb from './component/Breadcrumb/index.vue'
import useNotice from '@/hooks/useNotice'

useNotice('todo')

const collapse = ref(false)
const handleToggle = (isFold: boolean) => {
  collapse.value = isFold
}

const isHidden = ref(true)
const calculateHeight = computed(() => {
  return isHidden.value ? '72px' : '42px'
})
const handleSwitch = (isHorizontal: boolean) => {
  isHidden.value = isHorizontal
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
  min-width: 1280px;
  min-height: 600px;
  overflow: auto;

  & > .el-container {
    width: 100%;
    height: 100%;
  }

  .layout-content {
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .app-main {
    position: relative;
    height: calc(100% - v-bind(calculateHeight));
    background-color: #eaeaea;

    &.gutter {
      padding: 0 8px 8px;
    }

    .container {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
}
</style>
