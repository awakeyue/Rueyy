<template>
  <div class="detail">
    <div class="inner">
      <div style="width: 400px; height: 400px;" id="warterBall" class="progress-ball"></div>
      <n-icon size="46" class="clickable" @click="handleClick">
        <component :is="componentId"></component>
      </n-icon>
    </div>
  </div>
</template>

<script lang="ts">
import echarts from '@/utils/charts'
import { getWaterChartOption } from '@/utils/chartsOptions'
import { PlayCircleOutline as playIcon,
         PauseCircleOutline as pauseIcon }from '@vicons/ionicons5'
import { defineComponent, shallowRef, onMounted, ref, watch } from 'vue'
export default defineComponent({
  name: 'ExerciseDetail',
  components: {
    playIcon,
    pauseIcon,
  },
  props: {
    data: Array,
    default: () => [
      {
        time: 12,
        type: 1
      }
    ]
  },
  setup (props) {
    const componentId = shallowRef(playIcon)
    let waterProgress = 0.5
    let progress = 0
    let timer: any = null
    const total = 276
    let chart: any = null
    const data = [
      {
        time: 12,
        type: 1
      }
    ]
    console.log(props)
    const strategy = {
      type: 1,
      duration: 1,
      executor() {
        return new Promise((resolve) => {
          setTimeout(resolve, this.duration, 1)
        })
      }
    }
    const setOption = () => {
      chart.setOption(getWaterChartOption({ waterProgress, progress, total }))
    }
    const initChart = () => {
      chart = echarts.init(document.getElementById('warterBall') as HTMLElement)
      setOption()
    }
    const runExercise = () => {
      timer = setInterval(() => {
        progress += 1
        setOption()
      }, 1000)
    }
    const start = () => {
      runExercise()
    }
    const stop = () => {
      clearInterval(timer)
      timer = null
    }
    const reStart = () => {
      progress = 0
      start()
    }
    const handleClick = () => {
      if (componentId.value === pauseIcon) {
        componentId.value = playIcon
        stop()
      } else {
        componentId.value = pauseIcon
        start()
      }
    }
    onMounted(() => {
      initChart()
    })
    return {
      componentId,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.detail {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    border-radius: 4px;
  }
}
</style>