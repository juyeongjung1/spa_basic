import { navigation } from '../app.js';
// exportした関数を詳細画面からimportし、更新ボタンのクリック時に呼び出します。
export function openUpdateModal(employee) {
    document.querySelector('#modal-area').innerHTML = `
    <div class="modal fade" id="update-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">社員情報の更新</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center gap-2 mb-2">
            <label for="update-name" style="width: 90px">氏名</label>
            <input id="update-name" class="form-control" value="${employee.name}">
          </div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <label for="update-salary" style="width: 90px">給与</label>
            <input
              id="update-salary"
              type="number"
              class="form-control"
              value="${employee.salary}"
            >
          </div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <label for="update-location" style="width: 90px">勤務地</label>
            <input
              id="update-location"
              class="form-control"
              value="${employee.location_name}"
            >
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
          <button id="update-submit" class="btn btn-primary">更新</button>
        </div>
        </div>
      </div>
    </div>`;
    // Bootstrap.Modalのインスタンスを生成して、画面へ表示します。
    const modalElement = document.querySelector('#update-modal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    document.querySelector('#update-submit').addEventListener('click', async () => {
        const changedEmployee = {
            name: document.querySelector('#update-name').value,
            salary: Number(document.querySelector('#update-salary').value),
            location_name: document.querySelector('#update-location').value,
        };
        // PUTメソッドと社員IDを指定し、対象となる1件を更新します。
        await fetch(`http://localhost:3005/api/employees/${employee.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changedEmployee),
        });
        // 更新後はモーダルを閉じ、詳細画面のデータをAPIから読み直します。
        modal.hide();
        navigation.reload();
    });
}
