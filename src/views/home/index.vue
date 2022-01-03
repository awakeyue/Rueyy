<template>
  <n-layout content-style="height: 100vh;">
    <n-layout-header class="layout-header" bordered>
      <app-header></app-header>
    </n-layout-header>
    <n-layout-content :native-scrollbar="false" class="layout-content" :class="{'custome-bg': theme === 'light'}" content-style="padding: 24px;">
      <div class="layout-content-inner" :style="{'max-width': width + 'px'}">
        <search-box></search-box>
        <card-list></card-list>
      </div>
    </n-layout-content>
    <!-- <n-layout-footer  class="layout-footer" bordered></n-layout-footer> -->
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import AppHeader from '@cmp/layout/AppHeader.vue'
import CardList from './components/CardList.vue'
import SearchBox from './components/SearchBox.vue'
import { 
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter
} from 'naive-ui'
export default defineComponent({
  name: 'Home',
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    AppHeader,
    CardList,
    SearchBox
  },
  setup() {
    const theme = inject('theme')
    return {
      width: 1200,
      theme
    }
  }
})

</script>

<style lang="scss" scoped>
$header-height: 60px;
$footer-height: 0px;
.layout-header {
  height: $header-height;
  box-sizing: border-box;
}
.layout-content {
  height: calc(100vh - $header-height - $footer-height);
  &-inner {
    margin: 0 auto;
  }
}
.custome-bg {
  background-color: #f5f5f5;
}
.layout-footer {
  height: $footer-height;
}
  
</style>