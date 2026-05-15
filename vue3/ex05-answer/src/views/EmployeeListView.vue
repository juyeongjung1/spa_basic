<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

// 社員の型定義
type Employee = {
  id: number
  password: string
  name: string
  salary: number
  location_name: string
}

const employees = ref<Employee[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const keyword = ref('')

// 検索・一覧取得関数
const fetchEmployees = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get('http://localhost:3000/api/employees/', {
      params: { keyword: keyword.value }
    })
    employees.value = res.data
  } catch (err) {
    error.value = '社員情報の取得に失敗しました。'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEmployees()
})
</script>

<template>
  <div class="container mt-4">
    <h2>人事管理システム</h2>
    
    <!-- 検索フォームと新規登録ボタン -->
    <div class="d-flex justify-content-between mb-3">
      <div class="input-group w-50">
        <input type="text" class="form-control" v-model="keyword" placeholder="氏名で検索">
        <button class="btn btn-primary" @click="fetchEmployees">検索</button>
      </div>
      <RouterLink to="/employees/new" class="btn btn-success">新規登録</RouterLink>
    </div>

    <!-- ローディング・エラー表示 -->
    <div v-if="loading">読み込み中...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>

    <!-- 社員一覧テーブル -->
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>氏名</th>
          <th>給与</th>
          <th>勤務地</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>
            <RouterLink :to="`/employees/${emp.id}`">
              {{ emp.name }}
            </RouterLink>
          </td>
          <td>{{ emp.salary.toLocaleString() }} 円</td>
          <td>{{ emp.location_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>