<script setup lang="ts">
// このコンポーネントはヘッダーメニューを表示します
// 現時点では特別なロジックは不要なため、script部分は空です
</script>

<template>
  <!-- ヘッダー部分: 背景色を暗く、文字色を白に、パディングを3単位に設定 -->
  <header class="bg-dark text-white p-3">
    <!-- Bootstrapのグリッドシステムを使用して3カラムレイアウトを作成 -->
    <div class="row">
      <!-- 左側（4/12幅）: サイトタイトル -->
      <div class="col-md-4">
        <!-- h5サイズで余白なしのタイトル -->
        <h1 class="h5 m-0">商品管理システム</h1>
      </div>

      <!-- 中央（6/12幅）: ナビゲーションメニュー -->
      <div class="col-md-6">
        <nav>
          <!-- 横方向のリストを構成し、下線を引く -->
          <ul class="nav nav-underline">
            <!-- ホームへのリンク -->
            <li class="nav-item">
              <RouterLink to="/" class="nav-link text-white" exact-active-class="active">
                ホーム
              </RouterLink>
            </li>
            <!-- 商品一覧へのリンク -->
            <li class="nav-item">
              <RouterLink to="/products" class="nav-link text-white" exact-active-class="active">
                商品一覧
              </RouterLink>
            </li>
            <!-- 新規登録へのリンク -->
            <li class="nav-item">
              <RouterLink to="/products/new" class="nav-link text-white" exact-active-class="active">
                新規登録
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- 右側（2/12幅）: ユーザー情報 -->
      <div class="col-md-2 text-end">
        <!-- 小さいサイズの文字でユーザー名を表示 -->
        <span class="small">ようこそ、○○さん</span>
      </div>
    </div>
  </header>
</template>

<!-- 
補足説明：
1. Bootstrapのグリッドシステムを使用して、12分割のレイアウトを実現
2. RouterLinkコンポーネントで、SPAの画面遷移を実現
3. exact-active-classで現在のページを強調表示
4. スタイルはBootstrapのユーティリティクラスを活用
-->

<style scoped>
/* 現時点では特別なスタイルは不要です */
</style>
