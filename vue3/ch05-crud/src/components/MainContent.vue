<script setup lang="ts">
// 商品配列の型定義
type Product = {
    id: number;
    name: string;
    price: number;
    category: string
}

// 親から受け取るpropsを定義
const props = defineProps<{ products: Product[] }>()

//////////////【ここから、3.3のサンプル】///////////////
// 親へ通知するイベントを定義
const emit = defineEmits(['select'])

// ボタンが押されたときにemitで親にIDを通知
const selectRow = (id: number) => {
    emit('select', id)
}
//////////////【ここまで、3.3のサンプル】///////////////
</script>

<template>
    <main>
        <div class="card ">
            <div class="card-body">
                <h2 class="mb-3">商品一覧</h2>

                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>商品番号</th>
                            <th>商品名</th>
                            <th>価格</th>
                            <th>カテゴリ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in props.products" :key="p.id">
                            <td>{{ p.id }}</td>
                            <td>
                                <!-- 商品名をリンク風にして選択可能に -->
                                <button class="btn btn-link" @click="selectRow(p.id)">{{ p.name }}</button>
                            </td>
                            <td>{{ p.price }} 円</td>
                            <td>{{ p.category }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>
