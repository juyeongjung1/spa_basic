// 詳細画面で利用するModal関数を、それぞれのファイルから読み込みます。
import { openUpdateModal } from './employee-update-modal.js';
import { openDeleteModal } from './employee-delete-modal.js';
export function showEmployeeDetail(id) {
    axios.get(`http://localhost:3005/api/employees/${id}`).then((response) => {
        let e = response.data;
        document.getElementById('app').innerHTML = `
            <h2>社員詳細</h2>
            ${e.image_path ? '<p><img src="' + e.image_path + '" alt="' + e.name + 'の顔写真" width="120" style="object-fit: cover" /></p>' : ''}
            <p>${e.id} ${e.name} ${e.salary}円 ${e.location_name}</p>
            <button id="editBtn">編集</button>
            <button id="deleteBtn">削除</button>
        `;
        document.getElementById('editBtn').addEventListener('click', () => openUpdateModal(e));
        document.getElementById('deleteBtn').addEventListener('click', () => openDeleteModal(e));
    });
}
