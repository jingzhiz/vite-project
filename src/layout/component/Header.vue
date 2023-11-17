<template>
  <div class="header">
    <div class="left">
      <HeadNav v-if="isHorizontal"/>
      <section v-else class="fold-switch">
        <el-icon class="hamburger" @click="toggle">
          <component :is="isFold ? Fold : Expand" />
        </el-icon>
        <Breadcrumb class="breadcrumb" />
      </section>
    </div>
    <div class="right">
      <div class="icon-item">
        <el-tooltip
          effect="dark"
          content="进行菜单搜索"
          placement="bottom"
        >
          <el-icon @click.stop="showSearchNav"><Search /></el-icon>
        </el-tooltip>
      </div>
      <div class="icon-item">
        <el-tooltip
          effect="dark"
          content="切换菜单展示"
          placement="bottom"
        >
          <el-icon @click="switchNav"><Switch /></el-icon>
        </el-tooltip>
      </div>
      <el-divider direction="vertical"></el-divider>
      <el-dropdown>
        <span class="link">
          <span class="username">{{ userStore.user.name }}</span>
          <img class="avatar" :src="userStore.user.avatar" alt="avatar" />
        </span>
        <template #dropdown>
          <el-dropdown-item @click="logout">
            <el-icon><Warning /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
    <SearchNav
      :visible="isShowSearchNav"
      :direction="isHorizontal ? 'ttb' : 'ltr'"
      @close-search-nav="$event => isShowSearchNav = $event "
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from 'store/module/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Fold, Expand, Search, Switch, Warning } from '@element-plus/icons-vue'
import HeadNav from './HeadNav/index.vue'
import SearchNav from './MenuSearch/index.vue'
import Breadcrumb from './Breadcrumb/index.vue'

const $emit = defineEmits<{
  (e: 'toggle', value: boolean): void,
  (e: 'switch', value: boolean): void
}>()
const $router = useRouter()
const userStore = useUserStore()

const isFold = ref(false)
const toggle = () => {
  isFold.value = !isFold.value
  $emit('toggle', isFold.value)
}

const isHorizontal = ref(true)
const color = ref('#FFFFFF')
const bgColor = ref('#304156')
const switchNav = () => {
  isHorizontal.value = !isHorizontal.value
  if (isHorizontal.value) {
    color.value = '#FFFFFF'
    bgColor.value = '#304156'
  } else {
    color.value = '#000000'
    bgColor.value = '#FFFFFF'
  }
  $emit('switch', isHorizontal.value)
}

const isShowSearchNav = ref(false)
const showSearchNav = () => {
  isShowSearchNav.value = true
}

const logout = async () => {
  try {
    await ElMessageBox.confirm('确认退出登录吗？', '退出登录', {
      confirmButtonText: '确定退出',
      cancelButtonText: '取消退出',
      type: 'warning'
    })
    await userStore.logout()
    ElMessage.success('退出成功')
    await $router.push('/login')
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 42px;
  padding: 0 15px;
  background-color: v-bind(bgColor);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2000;

  .left {
    flex: 1;
    .fold-switch {
      display: flex;
      align-items: center;
  
      .hamburger {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    .icon-item {
      font-size: 20px;
      margin: 0 12px;
      color: v-bind(color);
      cursor: pointer;
    }

    .link {
      display: flex;
      align-items: center;
      width: 80px;
      margin-left: 8px;

      .avatar {
        width: 24px;
        height: 24px;
      }
  
      .username {
        padding: 0px 8px;
        color: v-bind(color);
        word-spacing: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
