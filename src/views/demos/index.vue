<template>
  <h1 style="padding: 20px 10px;">列表过渡演示</h1>
  <div class="example-wrap">
    <div class="actions">
      <n-space vertical>
        <n-alert title="提示" type="info">
          点击方块宽度增加2倍
        </n-alert>
        <n-button style="margin-top: 10px;" @click="add" type="primary">添加块</n-button>
        <n-button style="margin-top: 10px;" @click="handleShuffle" type="primary">位置变换</n-button>
        <p>容器宽度：</p>
        <n-slider v-model:value="boxWidth" :step="100" :max="1000" :min="300" />
      </n-space>
    </div>
    <transition-group tag="div" class="list" name="cells" :style="{width: boxWidth + 'px'}" >
      <div class="item" v-for="(item, idx) in list" :style="{width: item.expand ? '210px' : '100px'}" :key="item.key" @click="item.expand = !item.expand">
      <n-button @click="del(idx)" type="primary">删除</n-button>
      <p>{{item.number}}</p>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { shuffle } from 'lodash'
export default defineComponent({
  name: 'Demos',
  setup () {
    const list = ref(Array(30).fill('').map((_, index) => ({
      key: index,
      number: index,
      expand: false
    })))
    const del = (i: number) => {
      list.value.splice(i, 1)
    }
    const add = () => {
      list.value.unshift({
        key: list.value.length,
        number: list.value.length,
        expand: false
      })
    }
    const handleShuffle = () => {
      list.value = shuffle(list.value)
    }
    return {
       list,
       boxWidth: ref(600),
       del,
       add,
       handleShuffle
    }
  }
})
</script>

<style lang="scss" scoped>
.example-wrap {
  display: flex;
  .actions {
    width: 300px;
    padding: 20px;
    border: 1px solid #10363a;
    border-radius: 4px;
  }
  .list {
    transition: all .5s;
    background-color: rgb(192, 179, 108);
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    // transition: width 0.8s ease;
    width: 100px;
    height: 100px;
    background-color: #10363a;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 30px;
    margin: 5px;
    color: #fff;
    border-radius: 4px;
  }
}

.cells-enter-from, .cells-leave-to {
  // opacity: 0;
}

.cells-leave-active {
  opacity: 0;
  position: absolute;
  transition: all 1s ease;
}

.cells-move {
  transition: all 1s ease;
}
</style>