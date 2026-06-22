import { navigation } from '../app.js';

// 【手順1】更新用モーダルを開く関数を外部へ公開してください。
_____ function openUpdateModal(employee) {
  document.querySelector('#modal-area').innerHTML = `
    <div class="modal fade" id="update-modal" tabindex="-1">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">社員情報の更新</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <label class="form-label">氏名</label><input id="update-name" class="form-control mb-2" value="${employee.name}">
          <label class="form-label">給与</label><input id="update-salary" type="number" class="form-control mb-2" value="${employee.salary}">
          <label class="form-label">勤務地</label><input id="update-location" class="form-control" value="${employee.location_name}">
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button><button id="update-submit" class="btn btn-primary">更新</button></div>
      </div></div>
    </div>`;

  const modalElement = document.querySelector('#update-modal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  document.querySelector('#update-submit').addEventListener('click', async () => {
    const changedEmployee = {
      name: document.querySelector('#update-name').value,
      salary: Number(document.querySelector('#update-salary').value),
      location_name: document.querySelector('#update-location').value
    };

    // 【手順2】変更した社員情報を更新APIへ送信してください。
    await fetch(`http://localhost:3005/api/employees/${employee.id}`, {
      method: _____,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changedEmployee)
    });

    // 【手順3】モーダルを閉じた後、現在の画面を再表示してください。
    modal._____();
    navigation._____();
  });
}
