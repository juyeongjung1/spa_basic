import { navigation } from '../app.js';
// 【手順1】employeeRegister を外部から読み込めるようにしてください。
_____ const employeeRegister = {
    render() {
        return `
      <h2>社員登録</h2>
      <form id="register-form">
        <div class="d-flex align-items-center gap-2 mb-2">
          <label for="id" style="width: 90px">社員ID</label>
          <input id="id" class="form-control" required>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <label for="password" style="width: 90px">パスワード</label>
          <input id="password" type="password" class="form-control" required>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <label for="name" style="width: 90px">氏名</label>
          <input id="name" class="form-control" required>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <label for="salary" style="width: 90px">給与</label>
          <input id="salary" type="number" class="form-control" required>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <label for="location_name" style="width: 90px">勤務地</label>
          <input id="location_name" class="form-control" required>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <label for="image_path" style="width: 90px">画像パス</label>
          <input id="image_path" class="form-control">
        </div>
        <div>
          <button class="btn btn-primary">登録</button>
        </div>
      </form>`;
    },
    init() {
        document.querySelector('#register-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const employee = {
                id: document.querySelector('#id').value,
                password: document.querySelector('#password').value,
                name: document.querySelector('#name').value,
                salary: Number(document.querySelector('#salary').value),
                location_name: document.querySelector('#location_name').value,
                image_path: document.querySelector('#image_path').value,
            };
            // 【手順2】入力した社員情報をAPIへ送信してください。
            await fetch('http://localhost:3005/api/employees', {
                method: _____,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });
            // 【手順3】登録後に社員一覧へ画面遷移してください。
            navigation._____('/employees');
        });
    },
};

export function showEmployeeRegister() {
    document.getElementById('app').innerHTML = employeeRegister.render();
    employeeRegister.init();
}
