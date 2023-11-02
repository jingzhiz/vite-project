<template>
  <div class="App-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import * as echarts from 'echarts'

provide('echarts', echarts)
</script>

<style scoped lang="scss">
.App-container {
  height: 100%;
  width: 100%;
}
</style>
