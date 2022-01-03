import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode)
  const isDev = mode === 'development'
  return {
    plugins: [vue()],
    // base: isDev ? '/' : '/blog-vite/',
    base: '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@cmp': resolve(__dirname, 'src/components'),
        '@util': resolve(__dirname, 'src/utils')
      }
    }
  }
})
