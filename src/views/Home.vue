<template>
  <n-layout content-style="height: 100vh;">
    <n-layout-header class="layout-header" bordered>
      <app-header></app-header>
    </n-layout-header>
    <n-layout-content :native-scrollbar="false" class="layout-content" content-style="padding: 24px;">
      <div class="layout-content-inner" :style="{'max-width': width + 'px'}">
        <card-list></card-list>
      </div>
    </n-layout-content>
    <!-- <n-layout-footer  class="layout-footer" bordered></n-layout-footer> -->
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppHeader from '@cmp/layout/AppHeader.vue'
import CardList from '@cmp/common/CardList.vue'
import { 
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter
} from 'naive-ui'
import Layout from '@cmp/layout/index.vue'


export default defineComponent({
  name: 'Home',
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    AppHeader,
    CardList
  },
  setup() {
    return {
      width: 1200
    }
  }
})

</script>

<style lang="scss" scoped>
$header-height: 50px;
$footer-height: 0;
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
.layout-footer {
  height: $footer-height;
}
  
</style>