<template>
  <div class="yiyan" >
    <p class="sentence">
      <span>
        {{wisdom.content}}
        <n-icon class="cp refresh" @click="changeSentence" :color="themeVars.primaryColor"><refresh-icon></refresh-icon></n-icon>
      </span>
    </p>
    <p class="source">{{wisdom.source}}</p>
    <p id="write_box"></p>
  </div>
  <!-- <div v-else>
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%;" />
  </div> -->
</template>

<script lang="js">
import { defineComponent, onMounted, reactive, inject } from 'vue'
import { yiyan } from '@/api'
import { Refresh as RefreshIcon } from '@vicons/ionicons5'
import { useThemeVars } from 'naive-ui'
import anime from 'animejs'
export default defineComponent({
  name: 'Yiyan',
  components: {
    RefreshIcon
  },
  setup () {
    const wisdom = reactive({
      content: '',
      source: ''
    })

    const getSentence = async () => {
      const { constant: sentence, source } = await yiyan()
      wisdom.content = sentence
      wisdom.source = '-- ' + source
      anime({
        targets: ['.sentence'],
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 2000
      })
    }

    const changeSentence = () => {
      anime({
        targets: ['.refresh'],
        rotate: [0, 360],
        duration: 1000,
        easing: 'linear'
      })
      anime({
        targets: ['.sentence'],
        opacity: 0,
        translateY: [0, 20],
        duration: 2000
      })
      setTimeout(() => {
        getSentence()
      }, 500)
    }
    onMounted(() => {
      getSentence()
    })
    return {
      wisdom,
      themeVars: useThemeVars(),
      changeSentence
    }
  }
})
</script>

<style lang="scss" scoped>
.yiyan {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .sentence {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  .source {
    font-size: 14px;
    text-align: right;
  }
  .refresh {
    margin-left: 5px;
    position: relative;
    top: 2px;
  }
  @media only screen and (max-width: 600px) {
    .sentence {
      font-size: 16px;
    }
  }
}
</style>