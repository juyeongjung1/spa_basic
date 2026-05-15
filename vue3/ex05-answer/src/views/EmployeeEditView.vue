<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const name = ref('')
const password = ref('')
const salary = ref<number | null>(null)
const location_name = ref('')
const image_path = ref('') // 画像パス保持用に追加

// 既存データの取得
const fetchEmployee = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/employees/${id}/`)
    name.value = res.data.name
    password.value = res.data.password
    salary.value = res.data.salary
    location_name.value = res.data.location_name
    image_path.value = res.data.image_path // 画像パスを保存
  } catch (err) {
    alert('データ取得エラー')
  }
}

// 更新処理
const updateEmployee = async () => {
  try {
    await axios.put(`http://localhost:3000/api/employees/${id}/`, {
      name: name.value,
      password: password.value,
      salary: salary.value,
      location_name: location_name.value,
      image_path: image_path.value // 画像パスをリクエストに含める
    })
    alert('更新しました')
    router.push(`/employees/${id}`)
  } catch (err) {
    alert('更新エラー')
  }
}

onMounted(() => {
  fetchEmployee()
})
</script>

<template>
  <div class="container mt-4">
    <h2>社員情報編集</h2>
    <form @submit.prevent="updateEmployee">
      <div class="mb-3">
        <label>氏名</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="mb-3">
        <label>パスワード</label>
        <input type="text" class="form-control" v-model="password">
      </div>
      <div class="mb-3">
        <label>給与</label>
        <input type="number" class="form-control" v-model="salary">
      </div>
      <div class="mb-3">
        <label>勤務地</label>
        <input type="text" class="form-control" v-model="location_name">
      </div>
      <button class="btn btn-primary">保存</button>
    </form>
  </div>
</template>