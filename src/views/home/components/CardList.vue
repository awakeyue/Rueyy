<template>
  <n-grid cols="1 500:4 800:6 1200:6" :x-gap="12">
    <n-grid-item class="yiyan gutter-y" :span="6" v-if="showCard">
      <n-card size="small" closable @close="handleClose" >
        <my-wisdom />
      </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card size="small">
        <weather-box />
      </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card>
        
      </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card title="卡片"  hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card title="卡片"  hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item class="gutter-y card" :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import anime from 'animejs'
import News from './News.vue'
import Yiyan from './Yiyan.vue'
import WeatherBox from './WeatherBox.vue'
export default defineComponent({
  name: 'CardList',
  components: {
    MyNews: News,
    MyWisdom: Yiyan,
    WeatherBox
  },
  setup () {
    const state = reactive({
      showCard: true
    })
    const handleClose = () => {
      anime({
        targets: ['.yiyan'],
        opacity: [1, 0],
        height: 0,
        marginBottom: 0,
        endDelay: 0,
        duration: 1000,
        easing: 'easeInOutExpo'
      }).finished.then(() => {
        state.showCard = false
      })
    }
    return {
      ...toRefs(state),
      handleClose
    }
  }
})
</script>

<style lang="scss" scoped>
// 为什么不用y-gap，因为影响动画流畅
.gutter-y {
  margin-bottom: 12px;
}
</style>