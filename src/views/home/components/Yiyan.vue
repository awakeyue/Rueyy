<template>
  <div class="yiyan" v-if="wisdom.content">
    <p class="sentence" >
      <span>
        <span class="word" style="display: inline-flex;" v-for="(word, idx) in wisdom.content" :key="idx">{{word}}</span>
        <n-icon class="cp refresh word" @click="changeSentence" :color="themeVars.primaryColor"><refresh-icon></refresh-icon></n-icon>
      </span>
    </p>
    <p class="source">{{wisdom.source}}</p>
  </div>
  <!-- <div v-else>
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%;" />
  </div> -->
</template>

<script lang="js">
import { defineComponent, onMounted, reactive, nextTick, toRefs } from 'vue'
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
    const state = reactive({
      wisdom: {}
    })

    const getSentence = async () => {
      state.wisdom = {}
      const res = await yiyan()
      state.wisdom.content = res
      // state.wisdom.source = '-- ' + source
      nextTick(() => {
        const len = document.querySelectorAll('.sentence .word').length
        anime({
          targets: ['.sentence .word'],
          opacity: [0, 1],
          scale: [.5, 1],
          translateY: [-50, 0],
          delay: anime.stagger(50),
          duration: len * 10,
          easing: 'easeInOutQuad'
        })
        // anime({
        //   targets: ['.source'],
        //   opacity: [0, 1],
        //   translateX: [50, 0],
        //   duration: 1000,
        //   easing: 'easeInOutQuad'
        // })
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
        translateX: [0, -80],
        duration: 1000
      }).finished.then(() => {
        getSentence()
      })
      anime({
        targets: ['.source'],
        opacity: 0,
        translateX: [0, 20],
        duration: 1000
      })
    }
    onMounted(() => {
      getSentence()
    })
    return {
      ...toRefs(state),
      themeVars: useThemeVars(),
      changeSentence
    }
  }
})
</script>

<style lang="scss" scoped>
.yiyan {
  height: 200px;
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
      font-size: 18px;
    }
  }
}
</style>