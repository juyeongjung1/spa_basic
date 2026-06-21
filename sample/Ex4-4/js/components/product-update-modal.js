/* 商品更新フォームと更新処理をまとめたModalコンポーネントです。 */
export function openUpdateModal(product) {
    /*
     * index.htmlのmodal-areaへ、更新ModalのHTMLを挿入します。
     * 商品詳細APIで取得済みのproductを使い、現在の値をvalueへ設定します。
     */
    document.getElementById('modal-area').innerHTML = `
        <div class="modal fade" id="updateModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">商品更新</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <div class="form-item">
                            <label for="updateName">商品名</label>
                            <input type="text" id="updateName" value="${product.name}">
                        </div>

                        <div class="form-item">
                            <label for="updatePrice">価格</label>
                            <input type="number" id="updatePrice" value="${product.price}">
                        </div>

                        <div class="form-item">
                            <label for="updateCategory">カテゴリ</label>
                            <select id="updateCategory">
                                <option value="電子機器">電子機器</option>
                                <option value="家具">家具</option>
                                <option value="文房具">文房具</option>
                                <option value="食品">食品</option>
                                <option value="未分類">未分類</option>
                            </select>
                        </div>

                        <p id="updateMessage" class="error-message"></p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="updateBtn">更新</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
                    </div>
                </div>
            </div>
        </div>`;

    /*
     * select要素の選択状態を、現在の商品カテゴリに変更します。
     * 例えばproduct.categoryが「家具」の場合は、「家具」が選択された状態になります。
     */
    document.getElementById('updateCategory').value = product.category;

    /*
     * innerHTMLで挿入した更新ModalのHTML要素を取得します。
     * この時点ではModalのHTMLが作られただけで、まだ画面には開いていません。
     */
    let modalElement = document.getElementById('updateModal');

    /*
     * new bootstrap.Modal(HTML要素)は、HTML要素をBootstrapのModalとして
     * 操作できる状態にするための定型文です。
     * 作成したModalを変数updateModalへ代入すると、show()やhide()を使用できます。
     */
    let updateModal = new bootstrap.Modal(modalElement);

    // show()は、作成したBootstrapのModalを画面に表示するメソッドです。
    updateModal.show();

    // Modal内の更新ボタンにクリックイベントを登録します。
    document.getElementById('updateBtn').addEventListener('click', function() {
        let name = document.getElementById('updateName').value;
        let price = document.getElementById('updatePrice').value;
        let category = document.getElementById('updateCategory').value;
        let updateMessage = document.getElementById('updateMessage');

        updateMessage.innerHTML = '';

        if (!name || !price || !category) {
            updateMessage.innerHTML = 'データを入力してください。';
            return;
        }

        // 現在の商品番号をURLへ付け、PUT方式で更新APIを呼び出します。
        axios.put(`http://localhost:3005/api/v44/products/${product.id}`, {
            name: name,
            price: price,
            category: category
        })
        .then(response => {
            alert('商品が更新されました');

            /*
             * addEventListenerは、指定した出来事が発生した時に実行する処理を登録します。
             * ここではclickではなく、Bootstrapが用意しているhidden.bs.modalを指定しています。
             * hidden.bs.modalは、Modalが完全に閉じ終わった時に発生するイベントです。
             *
             * Modalが閉じ終わる前にHTMLを消すと、閉じる動きが途中で止まることがあります。
             * そのため、Modalが閉じ終わるのを待ってから、ModalのHTMLを消して画面を更新します。
             * 第3引数の{ once: true }は、このイベントを1回だけ実行するための指定です。
             * 実行後はイベントが自動で解除されるため、同じ処理が重複して登録されません。
             */
            modalElement.addEventListener('hidden.bs.modal', function() {
                // 使用済みの更新Modalをmodal-areaから削除します。
                document.getElementById('modal-area').innerHTML = '';

                /*
                 * navigation.reload()は、現在のURLのままNavigation APIの画面表示を
                 * もう一度実行します。更新後の商品情報をAPIから取得し直すために使います。
                 */
                navigation.reload();
            }, { once: true });

            /*
             * hide()はModalを閉じ始めるメソッドです。
             * Modalが完全に閉じ終わると、上で登録したhidden.bs.modalの処理が実行されます。
             */
            updateModal.hide();
        })
        .catch(error => console.error('商品更新に失敗しました:', error));
    });
}
