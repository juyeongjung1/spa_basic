<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

// 商品配列の型定義
type Product = {
  id: number;
  name: string;
  price: number;
  category: string
}

// 商品一覧データ、ローディング状態、エラー状態を保持する変数
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

//【5.3.2 】検索キーワードを保持する変数
const keyword = ref<string>('')

//【5.3.2】 商品検索を行う関数
const searchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await axios.get(
      'http://localhost:3000/api/products2', {
        params: {
          keyword: keyword.value 
      }
  })
    products.value = res.data
    console.log('商品データを取得しました:', products.value)

  } catch (err) {
    error.value = '該当する商品がありません。'
    console.error(err)

  } finally {
    loading.value = false
  }
}

// 商品一覧をAPIから取得する関数
const fetchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    // データ取得（ここがAPIとの通信部分）
    const res = await axios.get<Product[]>('http://localhost:3000/api/products')
    products.value = res.data
    console.log('商品データを取得しました:', products.value)

    // ローディング検証用コード（ローディング表示を維持したい場合）
    // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    // await sleep(3000) // 3秒待機

  } catch (err) {
    // エラーが起きた場合
    console.error(err)
    error.value = '商品情報の取得に失敗しました。'

  } finally {
    // 成功・失敗にかかわらず、ロード中フラグを終了
    loading.value = false
  }
}
// この画面が表示された瞬間にAPIを呼び出す
onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <main>
    <div class="card mt-4 shadow-sm">
      <div class="card-body">
        <h2 class="mb-3">商品一覧</h2>
        <!-- 【5.3.2】 検索フォーム -->
        <div class="mb-2 input-group w-50 gap-1">
          <input v-model="keyword" type="text" class="form-control" placeholder="商品名で検索">
          <button class="btn btn-primary" @click="searchProducts">
            検索
          </button>
        </div>

        <!-- ローディング中 -->
        <div v-if="loading" class="d-flex justify-content-center my-4">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <!-- エラー発生時 -->
        <div v-else-if="error" class="text-danger">
          {{ error }}
        </div>

        <!-- 正常に取得できた場合の一覧表示 -->
        <table v-else class="table table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>商品番号</th>
              <th>商品名</th>
              <th>価格</th>
              <th>カテゴリ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in products" :key="p.id">
              <td>{{ p.id }}</td>
              <td>
                <RouterLink :to="`/products/${p.id}`">
                  {{ p.name }}
                </RouterLink>
              </td>
              <td>{{ p.price }} 円</td>
              <td>{{ p.category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
