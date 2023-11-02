<template>
  <div class="head-nav">
    <section class="app-logo" @click="backHome">
      <img src="~images/logo.svg" alt="">
      <span class="title">Vue + Vite + Typescript</span>
    </section>
    <el-divider direction="vertical" />
    <div class="nav-list-container">
      <template v-for="(route, i) in permissionStore.routes">
        <section
          :key="route.path"
          class="route-group"
          :class="{
            active: $route.path.startsWith(route.path)
          }"
          v-if="!route?.meta?.hidden"
          @mouseenter="handleMouseEvent(i)"
          @mouseleave="handleMouseEvent(-1)"
        >
          <div class="route-title">{{ route?.meta?.alias }}</div>
          <section class="secRoute-group-container" v-show="index === i">
            <section class="secRoute-group">
              <template v-for="secRoute in route.children">
                <span
                  class="secRoute-title"
                  :key="secRoute.path"
                  v-if="!secRoute?.meta?.hidden"
                  @click="handleRouteClick(secRoute?.name as string)"
                >
                  <el-icon>
                    <component :is="filterIcon(secRoute?.meta?.icon || '')" />
                  </el-icon>
                  {{ secRoute?.meta?.alias }}
                </span>
              </template>
            </section>
          </section>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {  useRoute, useRouter } from 'vue-router'
import * as ElIcons from '@element-plus/icons-vue'
import usePermissionStore from 'store/module/permission'

const $route = useRoute()
const $router = useRouter()

const permissionStore = usePermissionStore()

const filterIcon = (iconName: string) => ElIcons[iconName as keyof typeof ElIcons]

const backHome = () => {
  $router.push('/')
}

const index = ref(-1)
const handleMouseEvent = (i:number) => {
  index.value = i
}

const handleRouteClick = (name: string) => {
  $router.push({
    name
  })
}
</script>

<style scoped lang="scss">
.head-nav {
  display: flex;
  align-items: center;
  height: 42px;

  .app-logo {
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;

    img {
      height: 100%;
    }

    .title {
      color: #FFFFFF;
      padding-left: 8px;
    }
  }

  .el-divider {
    height: 55%;
    margin: 0 18px 0 12px;
    color: #eaeaea;
  }

  .nav-list-container {
    display: flex;
    align-items: center;
    height: 100%;
    color: #ffffff;

    .route-group {
      position: relative;
      padding: 0px 12px;
      cursor: pointer;

      &.active {
        .route-title {
          border-bottom: 3px solid currentColor;
        }
      }

      .route-title {
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        box-sizing: border-box;

        &:hover {
          color: #409EFF;
        }
      }

      .secRoute-group {
        position: absolute;
        left: -10%;
        display: flex;
        flex-direction: column;
        width: 200px;
        background-color: #375274;

        .secRoute-title {
          display: inline-block;
          flex: 1;
          padding: 15px 20px;
          font-size: 14px;
          
          i {
            padding-right: 8px;
          }

          &:hover {
            border-left: 3px solid #409EFF;
          }
        }
      }
    }
  }
}
</style>