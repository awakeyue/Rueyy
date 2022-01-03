<template>
   <div class="app-header">
     <m-logo /> 
     <n-icon size="28" class="cp" @click="toggleTheme">
      <transition name="component-fade" mode="out-in">
        <component :is="componentId"></component>
      </transition>
    </n-icon>
   </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, markRaw } from 'vue'
import { useStore } from 'vuex'
import { Sunny as SunIcon, Moon as MoonIcon } from '@vicons/ionicons5'
import MLogo from '@cmp/layout/Logo.vue'
export default defineComponent({
  name: 'AppHeader',
  components: {
    MLogo,
    SunIcon,
    MoonIcon
  },
  setup () {
    const store = useStore()
    const theme: any = inject('theme')
    const moonIcon = markRaw(MoonIcon)
    const sunIcon = markRaw(SunIcon)
    const componentId = ref(theme.value === 'light' ? moonIcon : sunIcon)
    const toggleTheme = () => {
      componentId.value = theme.value === 'dark' ? moonIcon : sunIcon
      const value = theme.value === 'dark' ? 'light' : 'dark'
      store.commit('SET_THEME', value)
    }
    return {
      componentId,
      toggleTheme
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
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.5s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>