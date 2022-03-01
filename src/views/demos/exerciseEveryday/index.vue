<template>
   <div class="exercise">
      <n-h1>每天锻炼，唤醒动力</n-h1>
      <n-grid x-gap="12" y-gap="12" cols="1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
        <n-grid-item v-for="(item, idx) in list" :key="idx">
          <n-card style="cursor: pointer; height: 250px;" :title="item.title" hoverable @click="handleClick(item.type)">
          <n-p>时长：{{item.duration}}</n-p>
          <n-p>动作组</n-p>
          <n-text tag="p" v-for="(val, key) in ACTION_GROUP[idx]" :key="key">
            {{key}}：{{val}}次
          </n-text>
          </n-card>
        </n-grid-item>
      </n-grid>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'ExerciseEveryday',
  setup () {
    const router = useRouter()
    const handleClick = (type: string) => {
      router.push({
        path: '/demos/exerciseEverydayDetail',
        params: {
          type
        }
      })
    }
    const ACTION_GROUP = [
      {
        "爆发训练": 42,
        "中级耐力": 22
      },
      {
        "爆发训练": 20,
        "三步收紧": 5,
        "五步收紧": 8
      },
      {
        "爆发训练": 15,
        "超强耐力": 4,
        "三步收紧": 10
      }
    ]
    return {
       list: [
         {
           title: '唤醒训练',
           duration: '06分57秒',
           type: 'first'
         },
         {
           title: '加强训练',
           duration: '05分54秒',
           type: 'second'
         },
         {
           title: '巩固训练',
           duration: '09分31秒',
           type: 'three'
         }
       ],
       ACTION_GROUP,
       handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.exercise {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}
</style>