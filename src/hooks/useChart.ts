import { unref, inject, nextTick } from 'vue'
import type { ECharts, EChartsType, EChartsOption } from 'echarts'

export function useChart(cb?: () => void) {
  const echarts = inject('echarts') as ECharts

  let chartInstance: EChartsType | null

  const initEchart = (elMark: string | HTMLElement) => {
    const el = typeof elMark === 'string' ? document.querySelector(elMark as string) : elMark

    console.assert(el, `cannot get the correct DOM element by ${elMark}`)

    chartInstance = echarts.init(el)
  }

  const getChartInstance = () => {
    return chartInstance
  }

  const setOption = (option: EChartsOption) => {
    nextTick(() => {
      chartInstance?.setOption(unref(option))
    })
  }

  const resizeEvent = () => {
    cb && cb()

    nextTick(() => {
      chartInstance?.resize({
        animation: {
          duration: 300,
          easing: 'quadraticIn'
        }
      })
    })
  }

  const watchResize = () => {
    window.addEventListener('resize', resizeEvent)
  }

  const unWatchResize = () => {
    if (!chartInstance) return
    chartInstance.dispose()
    chartInstance = null
    window.removeEventListener('resize', resizeEvent)
  }

  return {
    initEchart,
    getChartInstance,
    setOption,
    resizeEvent,
    watchResize,
    unWatchResize
  }
}