import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import {
  // create naive ui
  create,
  // component
  NConfigProvider,
  NButton,
  NCarousel,
  NMenu,
  NSpace,
  NCard,
  NEl,
  NIcon,
  NSwitch
} from 'naive-ui'

const naive = create({
  components: [NConfigProvider, NButton, NCarousel, NMenu, NSpace, NCard, NEl, NIcon, NSwitch]
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(naive)
setTimeout(() => {
  app.mount('#app')
}, 0)
