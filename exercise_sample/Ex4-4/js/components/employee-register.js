import {
    navigation
} from '../app.js';
// export を付けると、ほかのJavaScriptファイルからこのオブジェクトをimportできます。
export const employeeRegister = {
    render() {
        return `
      <h2>社員登録</h2>
      <form id="register-form" class="row g-3">
        <div class="col-md-6"><label class="form-label">社員ID</label><input id="id" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">パスワード</label><input id="password" type="password" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">氏名</label><input id="name" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">給与</label><input id="salary" type="number" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">勤務地</label><input id="location_name" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">画像パス</label><input id="image_path" class="form-control"></div>
        <div class="col-12"><button class="btn btn-primary">登録</button></div>
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
                image_path: document.querySelector('#image_path').value
            };
            // POSTメソッドを使い、入力値をJSON文字列へ変換してAPIへ渡します。
            await fetch('http://localhost:3005/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });
            // 登録が完了したら、社員一覧コンポーネントへ切り替えます。
            navigation.navigate('/employees');
        });
    }
};
