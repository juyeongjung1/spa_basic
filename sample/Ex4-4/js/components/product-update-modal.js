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

    // select要素はvalue属性だけでは選択できないため、JavaScriptで現在値を設定します。
    document.getElementById('updateCategory').value = product.category;

    // 挿入したModalをBootstrapから取得し、画面へ表示します。
    let modalElement = document.getElementById('updateModal');
    let updateModal = new bootstrap.Modal(modalElement);
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
             * Modalを閉じる動作が完了してから、現在の商品詳細を再表示します。
             * hidden.bs.modalは、BootstrapのModalが閉じた後に発生するイベントです。
             */
            modalElement.addEventListener('hidden.bs.modal', function() {
                document.getElementById('modal-area').innerHTML = '';
                navigation.reload();
            }, { once: true });

            updateModal.hide();
        })
        .catch(error => console.error('商品更新に失敗しました:', error));
    });
}
