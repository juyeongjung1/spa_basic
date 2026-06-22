// 【手順6】2つのModal関数をimportし、showEmployeeDetailをexportしてください。
import { _____ } from './employee-update-modal.js';
import { _____ } from './employee-delete-modal.js';
_____ function showEmployeeDetail(id) {
    axios.get(`http://localhost:3005/api/employees/${id}`).then((response) => {
        let e = response.data;
        document.getElementById('app').innerHTML = `
            <h2>社員詳細</h2>
            <p>${e.id} ${e.name} ${e.salary}円 ${e.location_name}</p>
            <button id="editBtn">編集</button>
            <button id="deleteBtn">削除</button>
        `;
        document.getElementById('editBtn').addEventListener('click', () => openUpdateModal(e));
        document.getElementById('deleteBtn').addEventListener('click', () => openDeleteModal(e));
    });
}
