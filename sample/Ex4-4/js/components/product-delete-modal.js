/* 商品削除の確認画面と削除処理をまとめたModalコンポーネントです。 */
export function openDeleteModal(product) {
    // index.htmlのmodal-areaへ、削除確認Modalを挿入します。
    document.getElementById('modal-area').innerHTML = `
        <div class="modal fade" id="deleteModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">商品削除</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <p>「${product.name}」を削除してもよろしいですか？</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="deleteBtn">削除</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
                    </div>
                </div>
            </div>
        </div>`;

    // innerHTMLで挿入した削除ModalのHTML要素を取得します。
    let modalElement = document.getElementById('deleteModal');

    /*
     * new bootstrap.Modal(HTML要素)は、HTML要素をBootstrapのModalとして
     * 操作できる状態にするための定型文です。
     */
    let deleteModal = new bootstrap.Modal(modalElement);

    // show()を実行すると、削除Modalが画面に表示されます。
    deleteModal.show();

    document.getElementById('deleteBtn').addEventListener('click', function() {
        // 現在の商品番号をURLへ付け、DELETE方式で削除APIを呼び出します。
        axios.delete(`http://localhost:3005/api/v44/products/${product.id}`)
        .then(response => {
            alert('商品が削除されました');

            /*
             * hidden.bs.modalは、BootstrapのModalが完全に閉じた後に発生するイベントです。
             * Modalが閉じ終わってから、使用済みのHTMLを消して商品一覧へ移動します。
             * 第3引数の{ once: true }により、このイベントは1回実行された後に自動で解除されます。
             */
            modalElement.addEventListener('hidden.bs.modal', function() {
                // 使用済みの削除Modalをmodal-areaから削除します。
                document.getElementById('modal-area').innerHTML = '';

                // navigation.navigate()を使い、ページ全体を再読込せず商品一覧へ移動します。
                navigation.navigate('/products');
            }, { once: true });

            // hide()でModalを閉じ始めます。閉じ終わるとhidden.bs.modalが発生します。
            deleteModal.hide();
        })
        .catch(error => console.error('商品削除に失敗しました:', error));
    });
}
