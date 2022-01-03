# Vue 3 + Typescript + Vite

## todo

- 天气图标地址 https://github.com/basmilius/weather-icons

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

- ts中如何引入js？

  比如有的vue组件不想要js, 将script lang=“js”，但是vscode插件volar会提示，这时可以在 ts.config.json 中添加 allowJs: true
