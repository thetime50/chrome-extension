import { createApp } from 'vue'
import App from './devtools.vue'
chrome.devtools.panels.create('vue-plugin-cli', '', 'devtools.html')
createApp(App).mount('#app')
