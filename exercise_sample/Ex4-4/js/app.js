// 各画面の表示責務を別ファイルへ分け、app.jsは画面遷移だけを管理します。
import { showHome } from './components/home.js';
import { showEmployeeList } from './components/employee-list.js';
import { showEmployeeDetail } from './components/employee-detail.js';
import { showEmployeeRegister } from './components/employee-register.js';
export const navigation = window.navigation;
document.addEventListener('DOMContentLoaded', () => showPage(window.location.pathname));
navigation.addEventListener('navigate', (event) => {
    let url = new URL(event.destination.url);
    if (!event.canIntercept || url.origin !== window.location.origin) {
        return;
    }
    event.intercept({
        handler: () => showPage(url.pathname),
    });
});

function showPage(path) {
    // 画面移動時に、前画面が作成したModalを残さないよう空にします。
    document.getElementById('modal-area').innerHTML = '';
    if (path === '/' || path === '/index.html') {
        showHome();
        return;
    }
    if (path === '/employees' || path === '/employees/') {
        showEmployeeList();
        return;
    }
    if (path === '/employees/new' || path === '/employees/new/') {
        showEmployeeRegister();
        return;
    }
    let result = path.match(/^\/employees\/(\w+)$/);
    if (result) {
        showEmployeeDetail(result[1]);
        return;
    }
    document.getElementById('app').innerHTML = '<h2>ページが見つかりません</h2>';
}
