import {
    navigation
} from '../app.js';
// 【手順1】削除確認モーダルを開く関数を外部へ公開してください。
_____
function openDeleteModal(employee) {
    document.querySelector('#modal-area').innerHTML = `
    <div class="modal fade" id="delete-modal" tabindex="-1">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">社員情報の削除</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">${employee.name}さんの社員情報を削除しますか。</div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button><button id="delete-submit" class="btn btn-danger">削除</button></div>
      </div></div>
    </div>`;
    const modal = new bootstrap.Modal(document.querySelector('#delete-modal'));
    modal.show();
    document.querySelector('#delete-submit').addEventListener('click', async () => {
        // 【手順2】選択した社員を削除するAPIを呼び出してください。
        await fetch(`http://localhost:3005/api/employees/${employee.id}`, {
            method: _____
        });
        // 【手順3】削除後に社員一覧へ画面遷移してください。
        modal.hide();
        navigation._____('/employees');
    });
}
