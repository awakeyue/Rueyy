import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './assets/css/global.scss'

import {
  // create naive ui
  create,
  // component
  NButton,
  NCarousel,
  NMenu,
  NSpace,
  NCard,
  NEl,
  NIcon,
  NSwitch,
  NGrid,
  NGridItem,
  NEllipsis,
  NInput,
  NInputGroup,
  NSelect,
  NTag,
  NForm,
  NModal,
  NDynamicInput,
  NSkeleton,
  NPopselect,
  NAlert,
  NSlider,
  NProgress,
  NText,
  NImage
} from 'naive-ui'
import { NScrollbar } from 'naive-ui/lib/_internal'

const naive = create({
  components: [
    NButton,
    NCarousel,
    NMenu,
    NSpace,
    NCard,
    NEl,
    NIcon,
    NSwitch,
    NGrid,
    NGridItem,
    NEllipsis,
    NInput,
    NInputGroup,
    NSelect,
    NTag,
    NForm,
    NModal,
    NDynamicInput,
    NSkeleton,
    NPopselect,
    NAlert,
    NSlider,
    NProgress,
    NText,
    NImage,
    NScrollbar
  ]
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(naive)
setTimeout(() => {
  app.mount('#app')
}, 0)
