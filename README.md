# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## problem records

- 如何单独将dist文件推送到一个新的分支（gh-pages）

  git subtree push --prefix dist origin gh-pages
  参考博客：
  https://segmentfault.com/a/1190000012002151
  https://blog.csdn.net/weixin_44717047/article/details/120113869

- alias ‘@’符号如何配置路径智能提示
  在tsconfig.json中这样写

  ```json
    "baseUrl": ".",
      "paths": {
        "cmp/*": ["src/components/*"],
        "@/*": ["src/*"]
      }
  ```

  在vite.config.js中这样写

  ```js
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'cmp': resolve(__dirname, 'src/components')
      }
    }
  ```
