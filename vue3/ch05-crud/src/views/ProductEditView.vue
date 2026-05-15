<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// URLから更新対象のIDを取得
const id = route.params.id

// 入力データ（初期値は空だが、onMountedでデータが入る）
const name = ref('')
const price = ref<number | null>(null)
const category = ref('電子機器')

// エラーメッセージ用
const error = ref<string | null>(null)

/**
 * 【第1部】既存データの取得（初期表示用）
 * 詳細画面と同じAPIを使って、現在の情報を取得します
 */
const getProduct = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/products/${id}`)
    const product = res.data
    
    // 取得したデータをフォームの変数にセット（これで画面に表示されます）
    name.value = product.name
    price.value = product.price
    category.value = product.category
    
  } catch (err) {
    console.error(err)
    error.value = '商品データの取得に失敗しました。'
  }
}

/**
 * 【第2部】更新データの送信
 * 登録処理と似ていますが、メソッドが PUT になっています
 */
const updateProduct = async () => {
  // 簡易バリデーション
  if (!name.value || !price.value || price.value <= 0) {
    error.value = '商品名と正しい価格を入力してください。'
    return
  }

  try {
    const updatedProduct = {
      name: name.value,
      price: price.value,
      category: category.value
    }

    // PUT リクエスト送信（URLにIDを含めるのを忘れずに）
    await axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct)
    
    alert('商品を更新しました。')
    
    // 更新後は、その商品の「詳細画面」に戻るのが一般的です
    router.push(`/products/${id}`)

  } catch (err) {
    console.error(err)
    error.value = '更新に失敗しました。'
  }
}

// 画面が表示されたら、まず既存データを取得する
onMounted(() => {
  getProduct()
})
</script>

<template>
  <div class="container mt-4 ">
    <h2 class="mb-4">商品情報の編集</h2>

    <!-- エラーアラート -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

     <!-- フォーム（送信時に updateProduct を実行） -->
    <form class="card p-4 shadow-sm col-md-6" @submit.prevent="updateProduct">

      <!-- 商品名 -->
      <div class="mb-3">
        <label class="form-label">商品名 <span class="text-danger">*</span></label>
        <input type="text" class="form-control" v-model="name" required>
      </div>

      <!-- 価格 -->
      <div class="mb-3">
        <label class="form-label">価格(円) <span class="text-danger">*</span></label>
        <div class="input-group">
          <input type="number" class="form-control" v-model="price" min="1" required>
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
            保存
          </button>
        </div>
    </form>
  </div>
</template>