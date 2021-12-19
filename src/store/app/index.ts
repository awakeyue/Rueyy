import { darkTheme } from 'naive-ui'
const enum Theme { DARK = 'dark', LIGHT = 'light' }
export default {
  state: () => {
    return {
      theme: sessionStorage.getItem('N_THEME')
    }
  },
  mutations: {
    SET_THEME(state: any, theme: string) {
      state.theme = theme
      sessionStorage.setItem('N_THEME', theme)
    }
  },
  getters: {
    theme: (state: any) => {
      return state.theme === Theme.DARK ? darkTheme : null
    }
  }
}