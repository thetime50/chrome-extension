import { createApp } from 'vue'
import App from './options.vue'
import { createPinia } from "pinia"
import router from './router'
import 'ant-design-vue/dist/antd.css';
import antDesign from 'ant-design-vue';

const vue = createApp(App)
vue.use(router)
vue.use(createPinia())
vue.use(antDesign);
vue.mount('#app')

