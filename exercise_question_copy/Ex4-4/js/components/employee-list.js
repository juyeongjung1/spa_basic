// 【手順5】showEmployeeList関数をexportしてください。
_____ function showEmployeeList() {
    axios.get('http://localhost:3005/api/employees').then((response) => {
        let rows = '';
        response.data.forEach(
            (e) =>
                (rows += `
            <tr>
                <td>${e.image_path ? '<img src="' + e.image_path + '" alt="' + e.name + 'の顔写真" width="48" height="48" style="object-fit: cover" />' : ''}</td>
                <td>${e.id}</td>
                <td><a href="/employees/${e.id}">${e.name}</a></td>
                <td>${e.salary}</td>
                <td>${e.location_name}</td>
            </tr>
        `),
        );
        document.getElementById('app').innerHTML = `
            <h2>社員一覧</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>顔写真</th>
                        <th>ID</th>
                        <th>氏名</th>
                        <th>給与</th>
                        <th>勤務地</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    });
}
