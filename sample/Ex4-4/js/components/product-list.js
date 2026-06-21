/* 商品一覧画面を表示するコンポーネントです。 */
export function showProductList() {
    // これまでと同じ商品一覧APIを呼び出します。
    axios.get('http://localhost:3005/api/v44/products')
    .then(response => {
        let rows = '';

        // 取得した商品を1件ずつテーブルの行へ変換します。
        response.data.forEach(product => {
            rows += `
                <tr>
                    <td>${product.id}</td>
                    <td>
                        <a href="/products/${product.id}" class="product-detail-link">
                            ${product.name}
                        </a>
                    </td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                </tr>`;
        });

        // 作成したテーブルを、共通レイアウトのapp要素へ表示します。
        document.getElementById('app').innerHTML = `
            <h1 class="page-title">商品一覧</h1>
            <p>商品名をクリックすると、商品詳細画面へ移動します。</p>
            <table class="product-table">
                <thead>
                    <tr>
                        <th>商品番号</th>
                        <th>商品名</th>
                        <th>価格</th>
                        <th>カテゴリ</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>`;

        /*
         * 商品名のリンクは、API通信の後にinnerHTMLで作成されます。
         * そのため、HTMLを表示した後でクリックイベントを登録します。
         */
        let detailLinks = document.querySelectorAll('.product-detail-link');

        detailLinks.forEach(detailLink => {
            detailLink.addEventListener('click', function(event) {
                // 通常のリンク移動を止め、Navigation APIで移動します。
                event.preventDefault();
                navigation.navigate(detailLink.getAttribute('href'));
            });
        });
    })
    .catch(error => console.error('商品一覧の取得に失敗しました:', error));
}
