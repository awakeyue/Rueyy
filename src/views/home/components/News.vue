<template>
   <n-carousel autoplay show-arrow dot-placement="top">
     <template v-for="item in list">
       <div class="img-wrap">
         <img 
          class="carousel-img"
          :src="item.image"
        />
        <div class="text" @click="toDetail(item)">
          <n-ellipsis :line-clamp="2" >{{item.title}}</n-ellipsis>
        </div>
       </div>
     </template>
  </n-carousel>
</template>

<script lang="js">
import { defineComponent, ref, onMounted } from 'vue'
import { ysxw } from '@/api/index'
export default defineComponent({
  name: 'News',
  setup () {
    const list = ref([])
    const getData = async () => {
      const data = await ysxw()
      list.value = data.slice(0, 5)  
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
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
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