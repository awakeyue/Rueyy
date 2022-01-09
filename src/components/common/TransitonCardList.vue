<template>
  <transition-group class="t-list" tag="div" name="card">
    <div class="card" v-for="(item, index) in list" :key="item.key" :class="'size-' + (item.sizeNum || 1)">
      <div class="card-inner" :style="{'background-color': themeVars.cardColor, 'border-color': themeVars.borderColor }">
        <div class="icon-wrap">
          <n-icon v-if="item.closeable" class="icon" :color="themeVars.closeColor" :size="24" @click="deleteItem(index)">
            <close-icon />
          </n-icon>
          <n-icon v-if="item.expand" class="icon" :color="themeVars.closeColor" :size="24" @click="handleSizeChange(item)">
            <expand-icon v-show="item.sizeNum === 1" />
            <contract-icon v-show="item.sizeNum === 2" />
          </n-icon>
        </div>
        <component @click="" :is="item.component"></component>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useThemeVars } from 'naive-ui'
import { CloseOutline as CloseIcon, ExpandOutline as ExpandIcon, ContractOutline as ContractIcon } from '@vicons/ionicons5'
interface CardItem {
  component: any,
  key: string,
  closeable?: boolean,
  expand?: boolean
}
export default defineComponent({
  name: 'TransitionCardList',
  components: {
    CloseIcon,
    ExpandIcon,
    ContractIcon
  },
  props: {
    list: {
      type: Array,
      default: (): Array<CardItem> => []
    }
  },
  setup (props) {
    const themeVars = useThemeVars()
    const list = ref(props.list)
    const deleteItem = (index: number) => {
      list.value.splice(index, 1)
    }
    const handleSizeChange = (item: CardItem) => {
      item.sizeNum = item.sizeNum !== 2 ? 2 : 1
    }
    return {
       themeVars,
       list,
       deleteItem,
       handleSizeChange
    }
  }
})
</script>

<style lang="scss" scoped>
.t-list {
  position: relative;
  display: flex;
  flex-wrap: wrap; 
  .card {
    box-sizing: border-box;
    padding: 5px 5px;
    max-width: 100vw;
    .card-inner {
      position: relative;
      padding: 10px 20px;
      border: 1px solid;
      z-index: 1;
      min-height: 200px;
      border-radius: 6px;
    }
    .icon-wrap {
      display: flex;
    }
    .icon {
      position: absolute;
      right: 0px;
      top: 0px;
      cursor: pointer;
      z-index: 9;
      transition: all .3s;
      opacity: .3;
      &:hover {
        transform: scale(1.1);
        opacity: 1;
      }
    }
  }
}

// 为什么不用y-gap，因为影响动画流畅

.card-enter-from, .card-leave-to {
  opacity: 0;
  transform: translate(-100%, -100%);
}

// 必须加绝对定位，否则新增元素整个列表没用过渡效果
.card-leave-active {
  opacity: 0;
  position: absolute;
  transition: all .5s ease;
}

.card-move {
  transition: all .5s ease;
}

// 定义card宽度
@mixin card-width($rowCount) {
  // 定义多个尺寸
  @for $i from 1 through 4 {
    .card.size-#{$i} { width: calc(100% / $rowCount * $i); }
  }
  .card {
    width: calc(100% / $rowCount);
  }
}
@media (min-width: 1540px) {
  @include card-width(4)
}
@media (min-width: 1280px) and (max-width: 1540px) {
  @include card-width(3)
}
@media (max-width: 1280px) {
  @include card-width(2)
}
@media (max-width: 640px) {
  @include card-width(1)
}
</style>