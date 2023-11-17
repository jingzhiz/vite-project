<template>
  <el-drawer
    :direction="direction"
    class="search-nav"
    :modal="false"
    :with-header="false"
    :model-value="visible"
    :before-close="handleClose"
  >
    <section class="search-box">
      <el-input v-model="search" @input="handleSearch">
        <template #prepend>
          <span>搜索</span>
        </template>
      </el-input>
    </section>
    <section class="route-container">
      <div
        class="route-group"
        v-for="route in filterRouters"
        :key="route.path"
      >
        <h3 class="route-group-title">{{ route?.meta?.alias }}</h3>
        <section class="route-children">
          <div
            class="route-item"
            v-for="item in route.children"
            :key="item.path"
            :class="item.name === $route.name ? 'active' : ''"
          >
            <h4 class="route-item-title">{{ item.meta?.alias }}</h4>
          </div>
        </section>
      </div>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { cloneDeep } from 'lodash'
import usePermissionStore from '@/store/module/permission'

const props = defineProps<{
  direction: 'ttb' | 'ltr',
  visible: boolean
}>()
const $emit = defineEmits<{
  (e: 'closeSearchNav', value: boolean): void
}>()

const $route = useRoute()

const permissionStore = usePermissionStore()

const search = ref('')
const filterRouters = cloneDeep(permissionStore.addRoutes)
const handleSearch = () => {
  const searchValue = search.value
  if (!searchValue) {
    cloneDeep(permissionStore.addRoutes).forEach((item, index) => {
      filterRouters[index] = item
    })
  } else {
    filterRouters.forEach((item) => {
      const alias = item.meta?.alias
      if (alias?.includes(searchValue)) return item

      const children = item.children || []
      item.children = children.filter(child => {
        const alias = child.meta?.alias
        return alias?.includes(searchValue)
      })
    })
  }

}


onMounted(() => {
  document.body.addEventListener('click', () => {
    if (props.visible) {
      handleClose()
    }
  })
})

const handleClose = () => {
  search.value = ''
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

  .route-container {
    display: flex;
    margin-top: 20px;
    color: #ffffff;

    .route-group {
      flex: 1;
      min-width: 20%;
      max-width: 20%;

      .route-group-title {
        margin: 0;
        padding: 0;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
      }

      .route-children {
        margin-top: 8px;

        .route-item {
          padding: 5px 8px;

          &.active {
            .route-item-title {
              color: #00a4ff;
              border-color: currentColor;
            }
          }

          .route-item-title {
            height: 22px;
            margin: 0;
            padding-left: 8px;
            border-left: 2px solid transparent;
            line-height: 22px;
            font-size: 14px;
            font-weight: 400;
            box-sizing: border-box;

            &:hover {
              border-color: #00a4ff;
            }
          }
        }
      }
    }
  }
}
</style>