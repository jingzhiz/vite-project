<template>
  <div class="dashboard-container">
    <h2>name: {{ user.name }}</h2>
    <h2>roles: {{ user.roles }}</h2>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useUserStore from '@/store/module/user'

const userStore = useUserStore()

const user = storeToRefs(userStore).user
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}
</style>
