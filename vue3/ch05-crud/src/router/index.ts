// Vue Router の機能をインポート
import { createRouter, createWebHistory } from 'vue-router'

// 各ビューコンポーネントをインポート
import HomeView from '../views/HomeView.vue'
import ProductListView from '../views/ProductListView.vue'
import NewProductView from '../views/NewProductView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ProductListView2 from '../views/ProductListView2.vue'
import ProductEditView from '../views/ProductEditView.vue'

// ルート（URLとコンポーネントの対応表）を定義
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/products', name: 'products', component: ProductListView },
  { path: '/products/new', name: 'new-product', component: NewProductView },
  { path: '/products/:id', name: 'product-detail', component: ProductDetailView },
  { path: '/products2', name: 'products2', component: ProductListView2 },
  { path: '/products/edit/:id', name: 'product-edit', component: ProductEditView}
]

// ルーターを作成
const router = createRouter({
  // ブラウザの履歴管理を有効に、基本URLをvite.config.tsのBASE_URLを基準に設定
  history: createWebHistory(import.meta.env.BASE_URL),
  routes                        // 上で定義したルート情報を登録
})

// 他のファイル（main.tsなど）で使えるようにエクスポート
export default router
