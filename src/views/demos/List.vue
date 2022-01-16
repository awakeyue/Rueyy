<template>
<div class="demo-list">
  <n-grid x-gap="12" y-gap="12" cols="1 500:2 800:3 1200:4 1600: 6">
     <n-gi v-for="(item, idx) in list" :key="idx">
       <n-card style="cursor: pointer;" :title="item.title" hoverable @click="handleClick(item.url)">
       {{item.description}}
       </n-card>
     </n-gi>
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
}
</style>