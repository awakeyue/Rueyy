<template>
  <div class="yiyan">
    <p style="font-size: 24px;"><span class="sentence">{{wisdom.content}}</span></p>
    <p style="text-align: right;">{{wisdom.source}}</p>
    <p id="write_box"></p>
   </div>
</template>

<script lang="js">
import { defineComponent, onMounted, reactive } from 'vue'
import { yiyan } from '@/api'
import anime from 'animejs'
export default defineComponent({
  name: 'Yiyan',
  setup () {
    const wisdom = reactive({
      content: '',
      source: ''
    })
    onMounted(async () => {
      const { constant: sentence, source } = await yiyan()
      wisdom.content = sentence
      wisdom.source = source
      const el = document.querySelector('.sentence')
      anime({
        targets: el,
        opacity: [0, 1],
        duration: 3000
      })
    })
    return {
      wisdom
    }
  }
})
</script>

<style lang="scss" scoped>
.yiyan {
  height: 214px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .sentence {

  }
}
</style>