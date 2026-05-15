<template>
  <div class="list-group">
    <div class="list-group-item disabled fw-bold">メニュー</div>
    <RouterLink 
      to="/employees" 
      class="list-group-item list-group-item-action" 
      active-class="active"
    >
      社員一覧
    </RouterLink>
    <RouterLink 
      to="/employees/new" 
      class="list-group-item list-group-item-action" 
      active-class="active"
    >
      新規社員登録
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
