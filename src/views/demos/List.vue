<template>
<div class="demo-list">
  <n-grid x-gap="12" y-gap="12" cols="1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
    <n-grid-item v-for="(item, idx) in list" :key="idx">
      <n-card style="cursor: pointer;" :title="item.title" hoverable @click="handleClick(item.url)">
      {{item.description}}
      </n-card>
    </n-grid-item>
  </n-grid>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'DemoList',
  setup () {
    const router = useRouter()
    const handleClick = (url: string) => {
      router.push(url)
    }
    return {
       list: [
         {
           title: 'transition-group应用',
           description: '小demo',
           url: '/demos/transitonGroup'
         },
         {
           title: '锻炼每一天',
           description: '你想变得更强吗？跟我来',
           url: '/demos/exerciseEveryday'
         }
       ],
       handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.demo-list {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}
</style>