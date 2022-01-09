<template>
  <n-scrollbar style="max-height: 200px;" class="news" v-if="list && list.length">
    <div id="newsList">
      <div v-for="(item, index) in list" :key="index">
        <n-space align="center">
          <n-image width="60" :src="item.image" object-fit="cover"></n-image>
          <n-ellipsis :line-clamp="2" style="max-width: 260px;">{{item.title}}</n-ellipsis> 
        </n-space>
      </div>
    </div>
  </n-scrollbar>
  <div class="news" v-else>
    <n-space>
      <n-skeleton :height="100" :repeat="5" />
    </n-space>
  </div>
</template>

<script lang="js">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { ysxw } from '@/api/index'
import anime from 'animejs'
export default defineComponent({
  name: 'News',
  setup () {
    const list = ref([])
    const getData = async () => {
      const data = await ysxw()
      list.value = data
      nextTick(() => {
        anime({
          targets: ['#newsList'],
          
        })
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      list,
      toDetail(item) {
        window.open(item.url)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.news {
  height: 200px;
  overflow: hidden;
}
.img-wrap {
  position: relative;
  .text {
    width: 100%;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .5);
    padding: 4px 10px;
  }
}
</style>