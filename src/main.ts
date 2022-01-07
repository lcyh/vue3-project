import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import store from '@/store'

createApp(App).use(store).use(router).use(ElementPlus, { size: 'small', zIndex: 3000 })
  .mount('#app')
