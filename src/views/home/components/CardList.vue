<template>
  <n-grid cols="1 500:4 800:6 1200:6" :x-gap="12" :y-gap="12">
    <n-grid-item :span="4">
      <n-card>
        <my-wisdom />
      </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card  content-style="padding: 0">
        <my-news />
      </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card title="卡片"  hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item :span="4">
      <n-card title="卡片"  hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card title="卡片"  hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item :span="2">
      <n-card title="卡片" hoverable> 卡片内容 </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import News from './News.vue'
import Yiyan from './Yiyan.vue'
export default defineComponent({
  name: 'CardList',
  components: {
    MyNews: News,
    MyWisdom: Yiyan
  },
  setup () {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>


</style>