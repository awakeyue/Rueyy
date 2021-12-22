<template>
   <div class="app-header">
     <m-logo /> 
     <n-switch v-model:value="theme" :rail-style="railStyle">
        <template #checked>light</template>
        <template #unchecked>dark</template>
      </n-switch>
   </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import MLogo from '@cmp/layout/Logo.vue'
export default defineComponent({
  name: 'AppHeader',
  components: {
    MLogo
  },
  setup () {
    const store = useStore()
    const theme = ref(store.state.app.theme !== 'dark')
    watch(theme, val => {
      console.log(val)
      store.commit('SET_THEME', val ? 'light' : 'dark')
    })
    return {
      theme,
      railStyle: ({ focused, checked }: any) => {
        const style: any = {}
        if (checked) {
          style.background = '#4098fc'
          if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
          }
        } else {
          style.background = '#333'
          if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
          }
        }
        return style
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.app-header {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>