/* 商品登録画面と登録処理をまとめたコンポーネントです。 */
export function showProductRegister() {
    // 最初に商品登録フォームをapp要素へ表示します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">商品登録</h1>
        <div class="content-box">
            <div class="form-item">
                <label for="inputName">商品名</label>
                <input type="text" id="inputName">
            </div>

            <div class="form-item">
                <label for="inputPrice">価格</label>
                <input type="number" id="inputPrice">
            </div>

            <div class="form-item">
                <label for="inputCategory">カテゴリ</label>
                <select id="inputCategory">
                    <option value="電子機器">電子機器</option>
                    <option value="家具">家具</option>
                    <option value="文房具">文房具</option>
                    <option value="食品">食品</option>
                    <option value="未分類">未分類</option>
                </select>
            </div>

            <p id="registerMessage" class="error-message"></p>
            <button type="button" class="btn btn-primary" id="registerBtn">登録</button>
        </div>`;

    // フォームを表示した後で、登録ボタンにクリックイベントを登録します。
    document.getElementById('registerBtn').addEventListener('click', function() {
        let name = document.getElementById('inputName').value;
        let price = document.getElementById('inputPrice').value;
        let category = document.getElementById('inputCategory').value;
        let registerMessage = document.getElementById('registerMessage');

        registerMessage.innerHTML = '';

        // どれか1つでも入力されていない場合は、APIを呼び出しません。
        if (!name || !price || !category) {
            registerMessage.innerHTML = 'データを入力してください。';
            return;
        }

        // 入力された商品情報を、POST方式で登録APIへ送信します。
        axios.post('http://localhost:3005/api/v44/products', {
            name: name,
            price: price,
            category: category
        })
        .then(response => {
            alert('商品が登録されました');

            /*
             * navigation.navigate(移動先)は、Navigation APIでURLと画面を変更するメソッドです。
             * 通常のページ移動と違い、index.html全体を読み込み直さず商品一覧へ移動します。
             */
            navigation.navigate('/products');
        })
        .catch(error => console.error('商品登録に失敗しました:', error));
    });
}
