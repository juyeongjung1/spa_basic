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

    // 挿入したModalをBootstrapから取得し、画面へ表示します。
    let modalElement = document.getElementById('deleteModal');
    let deleteModal = new bootstrap.Modal(modalElement);
    deleteModal.show();

    document.getElementById('deleteBtn').addEventListener('click', function() {
        // 現在の商品番号をURLへ付け、DELETE方式で削除APIを呼び出します。
        axios.delete(`http://localhost:3005/api/v44/products/${product.id}`)
        .then(response => {
            alert('商品が削除されました');

            // Modalを閉じた後で、商品一覧画面へ移動します。
            modalElement.addEventListener('hidden.bs.modal', function() {
                document.getElementById('modal-area').innerHTML = '';
                navigation.navigate('/products');
            }, { once: true });

            deleteModal.hide();
        })
        .catch(error => console.error('商品削除に失敗しました:', error));
    });
}
