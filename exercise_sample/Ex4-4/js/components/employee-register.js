import { navigation } from '../app.js';
// export を付けると、ほかのJavaScriptファイルからこのオブジェクトをimportできます。
export const employeeRegister = {
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
          <span>※ 例: ../images/1001.png</span>
        </div>
        <div>
          <button class="btn btn-primary">登録</button>
        </div>
      </form>`;
    },
    init() {
        document.querySelector('#register-form').addEventListener('submit', async (event) => {
            // formの標準送信を止め、Fetch APIでJSONを送信します。
            event.preventDefault();
            const employee = {
                id: document.querySelector('#id').value,
                password: document.querySelector('#password').value,
                name: document.querySelector('#name').value,
                salary: Number(document.querySelector('#salary').value),
                location_name: document.querySelector('#location_name').value,
                image_path: document.querySelector('#image_path').value,
            };
            // POSTメソッドを使い、入力値をJSON文字列へ変換してAPIへ渡します。
            await fetch('http://localhost:3005/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });
            // 登録が完了したら、社員一覧コンポーネントへ切り替えます。
            navigation.navigate('/employees');
        });
    },
};

export function showEmployeeRegister() {
    document.getElementById('app').innerHTML = employeeRegister.render();
    employeeRegister.init();
}
