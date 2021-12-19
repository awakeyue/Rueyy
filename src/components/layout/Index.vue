<template >
  <n-layout>
    <n-layout-header bordered>
      Logo
      <n-menu mode="horizontal" :options="menuOptions" />
      <router-view></router-view>
    </n-layout-header>
    <n-card>
      <n-space>
        <n-button @click="setTheme('dark')">深色</n-button>
        <n-button @click="setTheme('light')">浅色</n-button>
      </n-space>
    </n-card>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
const menuOptions = [
  {
    label: '首页',
    key: '1',
  },
  {
    label: '关于',
    key: '2',
  }
]
export default defineComponent({
  name: 'Layout',
  setup () {
    const store = useStore()
    return {
      menuOptions,
      setTheme(theme: string) {
        store.commit('SET_THEME', theme)
      }
    }
  }
})
</script>

<style lang="css">

</style>