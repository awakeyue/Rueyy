import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { MUSIC_HOST } from './src/config/index'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode)
  const isDev = mode === 'development'
  return {
    plugins: [vue()],
    // base: isDev ? '/' : '/blog-vite/', 如果部署到github要加仓库名
    base: '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@cmp': resolve(__dirname, 'src/components'),
        '@util': resolve(__dirname, 'src/utils')
      }
    },
    server: {
      // proxy: {
      //   '/api': {
      //     target: MUSIC_HOST,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    }
  }
})
