<template>
  <n-scrollbar style="max-height: 200px;" class="news" v-if="calcList && calcList.length">
    <transition-group tag="div" name="group" id="newsList">
      <div class="item" v-for="(item, index) in calcList" :key="item.url">
        <n-space align="center">
          <n-grid cols="8" x-gap="10">
            <n-grid-item span="2">
              <img style="width: 90%; height: 90%; object-fit: cover;" :src="item.image" />
            </n-grid-item>
            <n-grid-item span="6">
              <n-text @click="toDetail(item)" class="clickable">
                <n-ellipsis :line-clamp="2" >{{item.title}}</n-ellipsis>
              </n-text>
            </n-grid-item>
          </n-grid>
        </n-space>
      </div>
    </transition-group>
  </n-scrollbar>
  <div class="news" v-else>
    <n-space>
      <n-skeleton :height="100" :repeat="5" />
    </n-space>
  </div>
</template>

<script lang="js">
import { defineComponent, ref, onMounted, nextTick, computed } from 'vue'
import { ysxw } from '@/api/index'
import anime from 'animejs'
export default defineComponent({
  name: 'News',
  setup () {
    const list = ref([])
    const calcList = computed(() => list.value.slice(0, 10))
    const getData = async () => {
      list.value = []
      const data = await ysxw()
      list.value = data
      nextTick(() => {
        // anime({
        //   targets: ['#newsList .item'],
        //   translateX: -40,
        //   loop: true
        // })
      })
    }
    onMounted(() => {
      getData()
      setTimeout(() => {
        getData()
      }, 7000);
    })
    return {
      list,
      calcList,
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
.group-enter-from, .group-leave-to  {
  opacity: 0;
}
.group-enter-active, .group-leave-active {
  transition: all 1s;
  opacity: 1;
  transform: translateX(30px);
}
.group-leave-active {
  position: absolute;
}
.group-move {
  transition: transform 1s ease;
}
.text-width {
  max-width: 260px !important;
}
@media (max-width: 400px) {
  .text-width {
    max-width: 200px !important;
  }
}
</style>