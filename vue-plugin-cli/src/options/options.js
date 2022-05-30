import { createApp } from 'vue'
import App from './options.vue'
import router from './router'

const vue = createApp(App)
vue.use(router)
vue.mount('#app')

