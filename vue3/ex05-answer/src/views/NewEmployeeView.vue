<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// 入力データ
const name = ref('')
const password = ref('')
const salary = ref<number | null>(null)
const location_name = ref('')
const image_path = ref('')

const submitEmployee = async () => {
  if(!name.value || !password.value || !salary.value) {
    alert('必須項目を入力してください')
    return
  }

  try {
    await axios.post('http://localhost:3000/api/employees/', {
      name: name.value,
      password: password.value,
      salary: salary.value,
      location_name: location_name.value,
      image_path: image_path.value
    })
    alert('登録しました')
    router.push('/employees')
  } catch (err) {
    alert('登録に失敗しました')
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2>新規社員登録</h2>
    <form @submit.prevent="submitEmployee">
      <div class="mb-3">
        <label>氏名</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="mb-3">
        <label>パスワード</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="mb-3">
        <label>給与</label>
        <input type="number" class="form-control" v-model="salary">
      </div>
      <div class="mb-3">
        <label>勤務地</label>
        <input type="text" class="form-control" v-model="location_name">
      </div>
      <!-- 画像パス入力欄を追加 -->
      <div class="mb-3">
        <label>写真パス (例: /images/1001.png)</label>
        <input type="text" class="form-control" v-model="image_path">
        <div class="form-text">※public/imagesフォルダ内のファイル名を指定してください</div>
      </div>
      <button class="btn btn-primary">登録</button>
    </form>
  </div>
</template>