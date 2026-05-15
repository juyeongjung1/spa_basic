<script setup lang="ts">
</script>

<template>
  <div class="list-group">
    <RouterLink to="/"              class="list-group-item list-group-item-action" exact-active-class="active">ダッシュボード</RouterLink>
    <RouterLink to="/products"      class="list-group-item list-group-item-action" exact-active-class="active">商品一覧</RouterLink>
    <RouterLink to="/products/new"  class="list-group-item list-group-item-action" exact-active-class="active">新規登録</RouterLink>
    <RouterLink to="/products2"  class="list-group-item list-group-item-action" exact-active-class="active">商品一覧(検索機能付き)</RouterLink>
  </div>
</template>
<!-- 
補足説明：
1. RouterLinkを使うことで、ページ遷移時にブラウザの更新が発生しません（SPA動作）
2. exact-active-classは現在のパスと完全一致する場合のみ適用されます
3. list-group-itemとlist-group-item-actionは、Bootstrapでよく使われるスタイルです
-->
