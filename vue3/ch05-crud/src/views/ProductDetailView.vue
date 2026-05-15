<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink,useRouter } from 'vue-router'
import axios from 'axios'

// 型定義（単一の商品データ用）
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
}
//【5.6】削除後の画面遷移用
const router = useRouter()

// ルート情報の取得（4.6節と同じ）
const route = useRoute()

// URLパラメータからIDを取得（文字列なので数値に変換）
const id = Number(route.params.id)

// データ管理用の変数
// 初期値は null にしておき、データ取得後にオブジェクトが入るようにします
const product = ref<Product | null>(null) //配列ではなく単一オブジェクト
const loading = ref(true)
const error = ref<string | null>(null)

// 詳細データ取得関数
const fetchProductDetail = async () => {
  try {
    // APIリクエスト：末尾にIDを付与して送信
    const res = await axios.get(`http://localhost:3000/api/products/${id}`)
    product.value = res.data
  } catch (err) {
    console.error(err)
    error.value = '商品データの取得に失敗しました。'
  } finally {
    loading.value = false
  }
}

/**
 * 商品削除処理
 * 削除ボタンがクリックされたときに実行されます
 */
const deleteProduct = async () => {
  // 1. 削除確認ダイアログの表示
  // 誤操作を防ぐため、必ずユーザーに確認を求めます
  const isConfirmed = confirm('本当にこの商品を削除してもよろしいですか？')
  
  // キャンセルが押された場合は、処理を中断して終了します
  if (!isConfirmed) {
    return
  }

  try {
    // 2. DELETE リクエスト送信
    // 削除対象のIDをURLに含めます
    await axios.delete(`http://localhost:3000/api/products/${id}`)
    
    alert('商品を削除しました。')
    
    // 3. 画面遷移
    // 削除された商品の詳細画面には留まれないため、一覧画面へ戻します
    router.push('/products')
    
  } catch (err) {
    console.error(err)
    error.value = '削除に失敗しました。'
  }
}
// 画面表示時に実行
onMounted(() => {
  fetchProductDetail()
})
</script>

<template>
  <div class="container mt-4">
    <!-- ローディング表示 -->
    <div v-if="loading" class="text-center">
      <p>読み込み中...</p>
    </div>

    <!-- エラー表示 -->
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- 商品詳細表示（データがある場合のみ表示） -->
    <div v-else-if="product">
      <h2 class="mb-3">商品詳細</h2>
      
      <div class="card col-md-6">
        <div class="card-body">
          <h3 class="card-title">{{ product.name }}</h3>
          <hr>
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">商品ID</div>
            <div class="col-md-9">{{ product.id }}</div>
          </div>
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">価格</div>
            <div class="col-md-9">{{ product.price }} 円</div>
          </div>
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">カテゴリ</div>
            <div class="col-md-9">
              <span class="badge bg-info text-dark">{{ product.category }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <RouterLink to="/products" class="btn btn-secondary">
          一覧に戻る
        </RouterLink>
         <!-- 【5.5 更新処理】: 編集画面へのリンク -->
        <RouterLink :to="`/products/edit/${product.id}`" class="btn btn-primary ms-2">
          編集する
        </RouterLink>
        <button class="btn btn-danger ms-2" @click="deleteProduct">
          削除する
        </button>
      </div>
    </div>
  </div>
</template>