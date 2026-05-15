<script setup lang="ts">
import HeaderMenu from './components/HeaderMenu.vue'
import SideMenu from './components/SideMenu.vue'
import FooterInfo from './components/FooterInfo.vue'
import { ref, provide } from 'vue'

// 商品一覧データ
const products = ref([
  { id: 1, name: 'ノートパソコン', price: 120000, category: '電子機器' },
  { id: 2, name: 'スマートフォン', price: 90000, category: '電子機器' },
  { id: 3, name: 'オフィスチェア', price: 25000, category: '家具' },
  { id: 4, name: 'ボールペンセット', price: 800, category: '文房具' }
])

// 子コンポーネント（画面全体）で参照できるように登録
provide('products', products)
</script>

<template>
  <div class="container-fluid bg-light">
  
    <HeaderMenu />

    <div class="container my-4">
      <div class="row">
        <div class="col-md-3">
          <SideMenu />
        </div>
        <div class="col-md-9">
          <!-- ルーティングされたコンポーネントがここに表示される -->
          <RouterView />　
        </div>
      </div>
    </div>
    <FooterInfo />
  </div>
</template>
<style scoped></style>