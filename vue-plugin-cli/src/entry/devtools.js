import { createApp } from 'vue'
import App from '../view/devtools.vue'
chrome.devtools.panels.create('vue-plugin-cli', '', 'devtools.html')
createApp(App).mount('#app')
