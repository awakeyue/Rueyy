<template>
  <n-grid cols="1 500:2 800:4 1200:4" :x-gap="12" :y-gap="12">
    <n-grid-item :span="3">
      <n-card title="卡片" embedded hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="卡片" embedded hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="卡片" embedded hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="卡片" embedded hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="卡片" embedded hoverable> 卡片内容 </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="卡片" embedded hoverable> 卡片内容 </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CardList',
  setup () {
    return {
       
    }
  }
})
</script>

<style lang="scss" scoped>


</style>