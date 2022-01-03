<template>
  <n-config-provider :theme="themeConfig" :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useStore } from 'vuex'
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui'
document.title = import.meta.env.VITE_APP_TITLE // 设置标签名

const store = useStore()
const theme = computed(() => store.getters.theme)
const themeConfig = computed(() => theme.value === 'light' ? null : darkTheme)
provide('theme', theme) // 向子组件中注入theme

// 覆盖主题
const themeOverrides = {
  Card: {
    borderRadius: '8px'
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
}
</style>
