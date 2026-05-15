import { createApp } from 'vue'
import App from './App.vue'
import { createBootstrap } from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import router from './router' // 追加：ルーターのインポート

createApp(App)
    .use(createBootstrap()) 
    .use(router) // 追加：ルーターをアプリに登録
     .mount('#app')
