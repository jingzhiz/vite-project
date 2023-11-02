<template>
  <el-breadcrumb
    class="breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item class="breadcrumb-item" v-for="item in breadcrumbs" :key="item">
        {{ item }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const breadcrumbs: string[] = reactive([])

watchEffect(() => {
  breadcrumbs.splice(0, breadcrumbs.length)
  const breadcrumb = $route.matched.map(item => item.meta.alias).filter(item => item) as string[]
  breadcrumbs.push(...breadcrumb)
})
</script>

<style lang="scss" scoped>
.breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 12px;
  font-size: 14px;
  line-height: 30px;
}

.breadcrumb-move,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
