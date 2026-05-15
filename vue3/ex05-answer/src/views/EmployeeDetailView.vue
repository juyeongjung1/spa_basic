<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

// 型定義は省略可能ですが、安全のため定義推奨
type Employee = {
  id: number
  password: string
  name: string
  salary: number
  location_name: string
  image_path: string // 型定義に追加
}

const employee = ref<Employee | null>(null)

// 詳細取得
const fetchDetail = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/employees/${id}/`)
    employee.value = res.data
  } catch (err) {
    alert('データ取得に失敗しました')
  }
}

// 削除処理
const deleteEmployee = async () => {
  if(!confirm('本当にこの社員データを削除してもよろしいですか？')) return

  try {
    await axios.delete(`http://localhost:3000/api/employees/${id}/`)
    alert('削除しました')
    router.push('/employees')
  } catch (err) {
    alert('削除に失敗しました')
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<template>
  <div class="container mt-4" v-if="employee">
    <h2>社員詳細</h2>
    <div class="card p-3">
      <!-- 画像表示エリアを追加 -->
      <!-- 画像パスがある場合のみ表示 (v-if) -->
      <div v-if="employee.image_path" class="mb-3 text-center">
        <img :src="employee.image_path" alt="社員写真" class="img-thumbnail" style="max-width: 200px;">
      </div>
      <!-- 画像がない場合の代替表示 -->
      <div v-else class="mb-3 text-center text-muted">
        (写真なし)
      </div>

      <p><strong>ID:</strong> {{ employee.id }}</p>
      <p><strong>氏名:</strong> {{ employee.name }}</p>
      <p><strong>給与:</strong> {{ employee.salary }} 円</p>
      <p><strong>勤務地:</strong> {{ employee.location_name }}</p>
      <p><strong>パスワード:</strong> {{ employee.password }}</p>
      
      <div class="mt-3">
        <RouterLink to="/employees" class="btn btn-secondary me-2">戻る</RouterLink>
        <RouterLink :to="`/employees/edit/${employee.id}`" class="btn btn-primary me-2">編集</RouterLink>
        <button class="btn btn-danger" @click="deleteEmployee">削除</button>
      </div>
    </div>
  </div>
</template>