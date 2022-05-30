# chrome-extension
chrome-extension

chrome 插件开发 调研

## 1. 原生的插件开发

/simple-ext

[从零深入Chrome插件开发 掘金](https://juejin.cn/post/7035782439590952968)

## 2. kocal/vue-web-extension

/vue-web-ext

[Building Chrome Extensions with Vue.js](https://medium.com/@simoneldevig_80359/building-chrome-extensions-with-vue-js-cafaefb82bd4)
[How to Build a Chrome Extension with Vue](https://www.sitepoint.com/build-vue-chrome-extension/)

[Unable to create a vue-web-extension from vue-cli](https://stackoverflow.com/questions/66784850/unable-to-create-a-vue-web-extension-from-vue-cli)  
[Cannot serve and build](https://github.com/Kocal/vue-web-extension/issues/683)  
[Webpack 5 support?](https://github.com/adambullmer/vue-cli-plugin-browser-extension/issues/126)

使用 
```cmd
# vue init kocal/vue-web-extension [NAME OF YOUR EXTENSION]
vue create --preset kocal/vue-web-extension vue-web-ext 
```

这个项目问题太多了 换别的实现


## 3. vue3-chrome-ext-template

/vue3-chrome-ext

[vue3-chrome-ext-template](https://github.com/cinob/vue3-chrome-ext-template)

比较简单的项目模板

## 4. vue-cli-plugin-chrome-extension-cli

/vue-plugin-cli     

[vue-cli-plugin-chrome-extension-cli](https://github.com/sanyu1225/vue-cli-plugin-chrome-extension-cli/tree/60a6d0e96fb66642b73742bde18fabf888321d97)

有配置脚手架  
没有优化开发环境??? 使用 npm run build-watch  
[Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)

值得参考

实现分析

项目框架

- [ ] 路径
- [ ] vue-router
- [ ] pinua
- [ ] antd

## 5. vite
[Chrome Extension (Vue 3 + Vue Router + Typescript + Vite + TailwindCSS)](https://dev.to/rezvitsky/chrome-extension-vue-3-vue-router-typescript-vite-tailwindcss-42d0)

<s>/vite-ext </s>



## 6. 官方 vue dev 插件如何编写的

## 7. vue 模板项目原理 

## 8. vue add 插件原理
[vuecli 插件和 Preset](https://cli.vuejs.org/zh/guide/plugins-and-presets.html#%E6%8F%92%E4%BB%B6)  
[vuecli 插件开发指南](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html)  
[vue add 插件原理](https://github.com/thetime50/note/blob/master/%E6%97%A5%E5%BF%97/2022/log-2022-05.md#vue-add-插件原理)

