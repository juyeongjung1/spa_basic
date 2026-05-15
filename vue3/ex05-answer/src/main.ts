import { createApp } from 'vue'
import App from './App.vue'
import { createBootstrap } from 'bootstrap-vue-next/plugins/createBootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import router from './router' // 追加：Vue Router のインポート

createApp(App)
    .use(createBootstrap())
    .use(router) // 追加：Vue Router をアプリに登録
    .mount('#app')
