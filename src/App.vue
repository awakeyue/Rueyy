<template>
  <n-config-provider :theme="theme">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
document.title = import.meta.env.VITE_APP_TITLE // 设置标签名

const store = useStore()
const theme = computed(() => store.getters.theme)
console.log(theme.value)
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
