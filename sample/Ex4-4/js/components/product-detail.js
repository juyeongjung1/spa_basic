/*
 * 商品詳細画面を表示するコンポーネントです。
 * 商品詳細の中で使用する更新Modalと削除Modalも読み込みます。
 */
import { openUpdateModal } from './product-update-modal.js';
import { openDeleteModal } from './product-delete-modal.js';

export function showProductDetail(id) {
    // URLから受け取った商品番号を使い、商品詳細APIを呼び出します。
    axios.get(`http://localhost:3005/api/v44/products/${id}`)
    .then(response => {
        let product = response.data;

        // 取得した商品情報と、更新・削除ボタンを表示します。
        document.getElementById('app').innerHTML = `
            <h1 class="page-title">商品詳細</h1>
            <table class="product-table">
                <tr><th>商品番号</th><td>${product.id}</td></tr>
                <tr><th>商品名</th><td>${product.name}</td></tr>
                <tr><th>価格</th><td>${product.price}</td></tr>
                <tr><th>カテゴリ</th><td>${product.category}</td></tr>
            </table>

            <div class="button-area">
                <button type="button" class="btn btn-primary" id="openUpdateBtn">更新</button>
                <button type="button" class="btn btn-danger" id="openDeleteBtn">削除</button>
                <a href="/products" class="btn btn-secondary">商品一覧へ戻る</a>
            </div>`;

        /*
         * 更新ボタンがクリックされたら、更新Modalコンポーネントを開きます。
         * APIから取得したproductを渡すため、現在の商品情報をフォームへ設定できます。
         */
        document.getElementById('openUpdateBtn').addEventListener('click', function() {
            openUpdateModal(product);
        });

        // 削除ボタンがクリックされたら、削除Modalコンポーネントを開きます。
        document.getElementById('openDeleteBtn').addEventListener('click', function() {
            openDeleteModal(product);
        });
    })
    .catch(error => {
        document.getElementById('app').innerHTML = `
            <p>商品情報を取得できませんでした。</p>
            <a href="/products" class="btn btn-primary">商品一覧へ戻る</a>`;
        console.error('商品詳細の取得に失敗しました:', error);
    });
}
