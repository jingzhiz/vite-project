<template>
  <div class="C_chartTwo" ref="chart">
    <div class="chart2" ref="chart2"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import { useChart } from '@/hooks/useChart'
import type { EChartsOption } from 'echarts'

const chart = ref()
const chart2 = ref()
const chart_width = ref('1px')
const chart_height = ref('1px')

const option: EChartsOption = {
  title: {
    text: 'Referer of a Website',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine'},
        { value: 735, name: 'Direct'},
        { value: 580, name: 'Email'},
        { value: 484, name: 'Union Ads'},
        { value: 300, name: 'Video Ads'}
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0,0,0,.5)'
        }
      }
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
  initEchart(chart2.value)
  setOption(option)
  resizeEvent()
  watchResize()
})

onBeforeUnmount(() => {
  unWatchResize()
})
</script>

<style lang="scss" scoped>
.C_chartTwo {
  width: 100%;
  height: 100%;

  .chart2 {
    width: v-bind(chart_width);
    height: v-bind(chart_height);
  }
}
</style>