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
  
- 使用vue3时，对对象数组进行push时报错，TypeError: Cannot read property 'insertBefore' of null

  这个报错就很诡异，明明写法没有问题，在codePen中验证也没有问题，偏偏在开发环境用chrome浏览器有问题，但是发布到线上就没有问题，在stackoverflow发现，有的插件会引起这个问题，然后我就试了下，还 真是插件引起的，把所有插件重新启动一遍，发现问题没有了......然而，问题又复现了，关掉所有插件都没用，清理了一下缓存就好了......

- 天气城市定位

  刚开始使用搜狐的定位接口

  ```js
    <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
    <script>
      // 获取当前城市名, 接口会使用jsonp方式定义一个变量returnCitySN，全局直接使用
      window.currentLocation = returnCitySN['cname']
    </script>

  ```

  然后换成了淘宝的https服务 https://www.taobao.com/help/getip.php, 调用方式是jsonp, callback名是ipCallback