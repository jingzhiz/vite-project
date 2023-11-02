<template>
  <div class="chart-container">
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <ChartOne/>
          </el-col>
          <el-col :span="24">
            <ChartTwo/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <ChartThree/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import ChartOne from './children/chartOne.vue'
import ChartTwo from './children/chartTwo.vue'
import ChartThree from './children/chartThree.vue'
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  padding: 20px;

  :deep(.el-row) {
    height: 100%;
  }
}
</style>
