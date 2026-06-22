import {
    navigation
} from '../app.js';
// 削除処理を独立したモジュールにすると、詳細画面側の役割を小さく保てます。
export function openDeleteModal(employee) {
    document.querySelector('#modal-area').innerHTML = `
    <div class="modal fade" id="delete-modal" tabindex="-1">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">社員情報の削除</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">${employee.name}さんの社員情報を削除しますか。</div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button><button id="delete-submit" class="btn btn-danger">削除</button></div>
      </div></div>
    </div>`;
    // 動的に挿入した要素を指定して、Bootstrapのモーダルを表示します。
    const modal = new bootstrap.Modal(document.querySelector('#delete-modal'));
    modal.show();
    document.querySelector('#delete-submit').addEventListener('click', async () => {
        // DELETEメソッドと社員IDをAPIへ渡し、対象となる1件を削除します。
        await fetch(`http://localhost:3005/api/employees/${employee.id}`, {
            method: 'DELETE'
        });
        // 削除した社員の詳細画面には戻れないため、社員一覧へ遷移します。
        modal.hide();
        navigation.navigate('/employees');
    });
}
