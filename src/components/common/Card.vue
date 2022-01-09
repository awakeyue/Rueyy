<template>
  <div class="card" :class="'size-' + widthNum">
    <div class="card-inner" :style="{'background-color': themeVars.cardColor, 'border-color': themeVars.borderColor }">
      <n-icon v-if="closeable" class="icon" :size="28" @click="handleClose">
        <close-icon />
      </n-icon>
      <n-icon v-if="expand" class="icon" :size="28" @click="widthNum = widthNum === 2 ? 1 : 2">
        <back-icon v-show="widthNum === 2" />
        <resize-icon v-show="widthNum === 1" />
      </n-icon>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useThemeVars } from 'naive-ui'
import { CloseOutline as CloseIcon, ResizeOutline as ResizeIcon, ReturnUpBackOutline as BackIcon } from '@vicons/ionicons5'
export default defineComponent({
  name: 'Card',
  emits: ['close'],
  props: {
    closeable: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    widthNum: {
      default: 1,
      validator(value: number) {
        return [1, 2, 3, 4].includes(value)
      }
    },
    parentList: {
      validator(value: any) {
        return value
      }
    }
  },
  components: {
    CloseIcon,
    ResizeIcon,
    BackIcon
  },
  setup (props: any, { emit }) {
    console.log(props)
    const themeVars = useThemeVars()
    const showCard = ref(true)
    const handleClose = () => { // v-if必须写在transition-group 才有列表过渡动画
      emit('close')
    }
    return {
      closeable: props.closeable,
      widthNum: computed(() => props.widthNum),
      expend: props.expand,
      themeVars,
      showCard,
      handleClose
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  // transition: width 0.5s ease;
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
  .icon {
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    z-index: 9;
    transition: all .3s;
    &:hover {
      transform: scale(1.1);
    }
  }
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