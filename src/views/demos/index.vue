<template>
  <n-scrollbar style="max-height: 100vh;">
    <router-view></router-view>
  </n-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Demos',
  setup () {
    return {
       
    }
  }
})
</script>

<style lang="scss" scoped>

</style>