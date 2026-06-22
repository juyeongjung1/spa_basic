// 【手順2】各コンポーネントから表示関数をimportしてください。
import {
    _____
} from './components/home.js';
import {
    _____
} from './components/employee-list.js';
import {
    _____
} from './components/employee-detail.js';
import {
    _____
} from './components/employee-register.js';
document.addEventListener('DOMContentLoaded', () => showPage(window.location.pathname));
navigation.addEventListener('navigate', event => {
    let url = new URL(event.destination.url);
    if (!event.canIntercept || url.origin !== window.location.origin) {
        return;
    }
    event.intercept({
        handler: () => showPage(url.pathname)
    });
});

function showPage(path) {
    document.getElementById('modal-area').innerHTML = '';
    // 【手順3】各URLに対応するimport済み関数を呼び出してください。
    if (path === '/' || path === '/index.html') {
        _____;
        return;
    }
    if (path === '/employees' || path === '/employees/') {
        _____;
        return;
    }
    if (path === '/employees/new' || path === '/employees/new/') {
        _____;
        return;
    }
    let result = path.match(/^\/employees\/(\d+)$/);
    if (result) {
        _____;
        return;
    }
    document.getElementById('app').innerHTML = '<h2>ページが見つかりません</h2>';
}
