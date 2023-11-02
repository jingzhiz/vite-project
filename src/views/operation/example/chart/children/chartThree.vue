<template>
  <div class="C_chartThree" ref="chart">
    <div class="chart3" ref="chart3"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import { useChart } from '@/hooks/useChart'
import type { EChartsOption } from 'echarts'

const chart = ref()
const chart3 = ref()
const chart_width = ref('1px')
const chart_height = ref('1px')

const option: EChartsOption = {
  title: {
    text: 'demo'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10]
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
  initEchart(chart3.value)
  setOption(option)
  resizeEvent()
  watchResize()
})

onBeforeUnmount(() => {
  unWatchResize()
})
</script>

<style lang="scss" scoped>
.C_chartThree {
  width: 100%;
  height: 100%;

  .chart3 {
    width: v-bind(chart_width);
    height: v-bind(chart_height);
  }
}
</style>