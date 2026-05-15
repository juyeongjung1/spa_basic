<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// ルーターインスタンスの取得
const router = useRouter()

// 入力データを管理するリアクティブ変数
const name = ref('')
const price = ref<number | null>(null) // 初期値は空にしたいのでnull許容
const category = ref('電子機器') // セレクトボックスの初期値

// エラーメッセージ用
const error = ref<string | null>(null)

// フォーム送信処理関数
const submitProduct = async () => {
  // 1. 簡易バリデーション（入力チェック）
  if (!name.value || !price.value || price.value <= 0) {
    error.value = '商品名と正しい価格を入力してください。'
    return
  }

  try {
    // 2. 送信データの作成
    const newProduct = {
      name: name.value,
      price: price.value,
      category: category.value
    }

    // 3. POST リクエスト送信
    // 第2引数に送信したいデータオブジェクトを渡します
    const res = await axios.post('http://localhost:3000/api/products', newProduct)

    // 4. 成功時の処理
    const newId = res.data.id
    alert(`商品が登録されました。ID: ${newId}`)

    // 一覧画面へ戻る（SPA的な画面遷移）
    router.push('/products')
    //router.push(`/products/${newId}`) // 登録直後に詳細画面へ遷移する場合

  } catch (err) {
    console.error('登録エラー:', err)
    error.value = '登録に失敗しました。'
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">新規商品登録</h2>

    <!-- エラーアラート -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- 登録フォーム -->
    <form class="card p-4 shadow-sm col-md-6" @submit.prevent="submitProduct">

      <!-- 商品名 -->
      <div class="mb-3">
        <label class="form-label">商品名 <span class="text-danger">*</span></label>
        <input type="text" class="form-control" v-model="name" placeholder="例: マウス" required>
      </div>

      <!-- 価格 -->
      <div class="mb-3">
        <label class="form-label">価格(円) <span class="text-danger">*</span></label>
        <div class="input-group">
          <input type="number" class="form-control" v-model="price" placeholder="0" min="1" required>
        </div>
      </div>

      <!-- カテゴリ（セレクトボックス） -->
      <div class="mb-3">
        <label class="form-label">カテゴリ</label>
        <select class="form-select" v-model="category">
          <option value="電子機器">電子機器</option>
          <option value="家具">家具</option>
          <option value="文房具">文房具</option>
          <option value="書籍">書籍</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <!-- ボタンエリア(d-flexとjusty～はボタンを横並びにする)-->
        <div class="d-flex justify-content-between mt-4">
          <!-- 戻るボタン（履歴を一つ戻る） -->
          <button type="button" class="btn btn-secondary" @click="router.back()">
            戻る
          </button>
          <!-- 送信ボタン -->
          <button type="submit" class="btn btn-primary">
            登録
          </button>
        </div>
    </form>
  </div>
</template>