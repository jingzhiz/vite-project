<template>
  <div v-if="!item.meta.hidden">
    <template v-if="item.children.length === 1">
      <el-menu-item :index="resolvePath(item.children[0].path)">
        <el-icon>
          <component :is="filterIcon(item.children[0].meta.icon)" />
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.alias }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon>
          <component :is="filterIcon(item.meta.icon)" />
        </el-icon>
        <span v-show="!collapse">{{ item.meta.alias }}</span>
      </template>
      <el-menu-item
        v-for="subRoute in item.children"
        :key="subRoute.path"
        :index="resolvePath(subRoute.path)"
      >
        <el-icon>
          <component :is="filterIcon(subRoute.meta.icon)" />
        </el-icon>
        <template #title>
          <span>{{ subRoute.meta.alias }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import * as ElIcons from '@element-plus/icons-vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  },
  collapse: {
    type: Boolean,
    default: false
  }
})

const filterIcon = (iconName: string) => ElIcons[iconName as keyof typeof ElIcons]

const resolvePath = (routePath: string):string => {
  if (props.basePath === '/') {
    return '/' + routePath
  }
  return props.basePath + '/' + routePath
}
</script>

<style lang="scss" scoped>
</style>
