<template>
  <div class="C_chartOne" ref="chart">
    <div class="chart1" ref="chart1"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import { useChart } from '@/hooks/useChart'
import type { EChartsOption } from 'echarts'

const chart = ref()
const chart1 = ref()
const chart_width = ref('1px')
const chart_height = ref('1px')

const option: EChartsOption = {
  legend: {
    top: 'top'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: ['15%', '50%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 50, name: 'rose 1'},
        { value: 42, name: 'rose 2'},
        { value: 46, name: 'rose 3'},
        { value: 52, name: 'rose 4'},
        { value: 47, name: 'rose 5'},
        { value: 49, name: 'rose 6'},
        { value: 43, name: 'rose 7'}
      ]
    }
  ]
}

const onResize = () => {
  chart_width.value = chart.value.offsetWidth + 'px'
  chart_height.value = chart.value.offsetHeight + 'px'
}

const {
  initEchart,
  setOption,
  resizeEvent,
  watchResize,
  unWatchResize
} = useChart(onResize)

onMounted(() => {
  initEchart(chart1.value)
  setOption(option)
  resizeEvent()
  watchResize()
})

onBeforeUnmount(() => {
  unWatchResize()
})
</script>

<style lang="scss" scoped>
.C_chartOne {
  width: 100%;
  height: 100%;

  .chart1 {
    width: v-bind(chart_width);
    height: v-bind(chart_height);
  }
}
</style>