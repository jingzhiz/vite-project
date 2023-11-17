<template>
  <el-drawer
    class="search-nav"
    append-to-body
    :modal="false"
    :direction="direction"
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
        v-if="filterRouters.length > 0"
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
            <h4 class="route-item-title" @click="() => handleRouteItemClick(item.name)">{{ item.meta?.alias }}</h4>
          </div>
        </section>
      </div>
      <el-empty v-else></el-empty>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
const addRoutes = cloneDeep(permissionStore.addRoutes)
const filterRouters = ref(addRoutes)
const isIncludes = (target: string, value: string): boolean => {
  return target.includes(value)
}
const handleSearch = () => {
  const searchValue = search.value
  if (!searchValue) {
    addRoutes.forEach((item, index) => {
      filterRouters.value[index] = item
    })
  } else {
    filterRouters.value = addRoutes.filter((item) => {
      const alias = item.meta?.alias || ''
      if (isIncludes(alias, searchValue)) return item

      const children = (item.children || []).filter(child => {
        const alias = child.meta?.alias || ''
        return isIncludes(alias, searchValue)
      })

      if (children.length) return item
    })
  }

}

const $router = useRouter()
const handleRouteItemClick = (name: string) => {
  $router.push({ name })
  handleClose()
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
  min-height: 385px;
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
    justify-content: center;
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
            cursor: pointer;

            &:hover {
              border-color: #00a4ff;
            }
          }
        }
      }
    }
  }
}
*:has(.search-nav) {
  position: absolute!important;
}
</style>