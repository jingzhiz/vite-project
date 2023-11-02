<template>
  <div class="aside-menu">
    <section class="app-logo" @click="backHome">
      <img src="~images/logo.svg" alt="">
      <span v-if="!collapse" class="title">Vite</span>
    </section>
    <el-menu
      router
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="$route.path"
    >
      <MenuItem
        v-for="route in permissionStore.routes"
        :collapse="collapse"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePermissionStore from 'store/module/permission'
import MenuItem from './MenuItem.vue'

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const $route = useRoute()
const $router = useRouter()
const permissionStore = usePermissionStore()

const width = ref('239px')
watchEffect(() => {
  if (props.collapse) {
    width.value = 'unset'
  } else {
    width.value = '239px'
  }
})

const backHome = () => {
  $router.push('/')
}
</script>

<style lang="scss" scoped>
.aside-menu {
  width: v-bind(width);
  background-color: #304156;
  overflow-x: hidden;
  overflow-y: auto;

  .app-logo {
    display: flex;
    align-items: center;
    height: 42px;
    line-height: 42px;
    padding: 3px 10px;
    cursor: pointer;
    
    img {
      height: 36px;
      margin: 0 5px;
    }

    .title {
      margin: 0px 10px;
      color: #FFFFFF;
      font-size: 24px;
      font-weight: 600;
    }
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    height: calc(100% - 48px);
    border: unset;
  }

  :deep(.el-menu--collapse) {
    border: unset;

    .el-sub-menu__icon-arrow {
      display: none;
    }
  }
}
</style>
