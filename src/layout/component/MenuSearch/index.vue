<template>
  <el-drawer
    :direction="direction"
    custom-class="search-nav"
    :modal="false"
    :with-header="false"
    :model-value="visible"
    :before-close="handleClose"
  >
    <section class="search-box">
      <el-input>
        <template #prepend>
          <span>搜索</span>
        </template>
      </el-input>
    </section>
    <section class="route-container">
      <div
        class="route-group"
        v-for="route in permissionStore.addRoutes"
        :key="route.path"
      >
        {{ route?.meta?.alias }}
      </div>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import usePermissionStore from '@/store/module/permission'

const props = defineProps<{
  direction: 'ttb' | 'ltr',
  visible: boolean
}>()
const $emit = defineEmits<{
  (e: 'closeSearchNav', value: boolean): void
}>()

const permissionStore = usePermissionStore()

onMounted(() => {
  document.body.addEventListener('click', () => {
    if (props.visible) {
      handleClose()
    }
  })
})

const handleClose = () => {
  $emit('closeSearchNav', false)
}
</script>

<style lang="scss">
.search-nav.ttb {
  top: 42px!important;
}
.el-drawer.search-nav {
  min-height: 65%;
  min-width: 65%;
  background-color: #2f4867;

  .search-box {
    text-align: center;

    .el-input {
      width: 40%;

      .el-input-group__prepend {
        background-color: #304156;
      }
    }
  }
}
</style>