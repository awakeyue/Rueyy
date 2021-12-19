import { createStore } from 'vuex'
import moduleApp from './app/index'

const store = createStore({
  modules: { // 麻雀虽小，也要五脏俱全哦，万一扩展了呢😁
    app: moduleApp
  },
  state: () => {
    return {
      
    }
  },
  mutations: {

  },
  actions: {

  }
})

export default store