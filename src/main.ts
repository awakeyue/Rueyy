import { createApp } from 'vue'
import App from './App.vue'

import {
  // create naive ui
  create,
  // component
  NButton,
  NCarousel,
  NMenu
} from 'naive-ui'

const naive = create({
  components: [NButton, NCarousel, NMenu]
})

createApp(App).use(naive).mount('#app')
