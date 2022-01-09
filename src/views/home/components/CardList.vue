<template>
  <t-card-list :list="componentList"></t-card-list>
</template>

<script lang="ts">
import TransitonCardListVue from '@cmp/common/TransitonCardList.vue'
import { defineComponent, shallowRef } from 'vue'
import anime from 'animejs'
import Card from '@cmp/common/Card.vue'
import News from './News.vue'
import Yiyan from './Yiyan.vue'
import WeatherBox from './WeatherBox.vue'
import RandomMusic from './RandomMusic.vue'
export default defineComponent({
  name: 'CardList',
  components: {
    TCardList: TransitonCardListVue,
    News,
    Yiyan,
    WeatherBox
  },
  setup () {
    const componentList = [
      {
        component: shallowRef(Yiyan),
        key: 'Yiyan',
        sizeNum: 3,
        closeable: true
      },
      {
        component: shallowRef(WeatherBox),
        key: 'weatherBox',
      },
      {
        component: shallowRef(RandomMusic),
        key: 'RandomMusic'
      },
      {
        component: shallowRef(News),
        key: 'News'
      },
      {
        component: null,
        key: '13'
      },
      {
        component: null,
        key: '14'
      },{
        component: null,
        key: '15'
      }
    ]
    return {
      componentList
    }
  }
})
</script>

<style lang="scss" scoped>

</style>