/*
 * app.jsは、このSPA全体の画面遷移を管理するファイルです。
 * 各画面を表示する処理はcomponentsフォルダから読み込みます。
 */

/*
 * importは、別のJavaScriptファイルでexportされた関数を読み込む書き方です。
 * { 関数名 }には、読み込みたい関数の名前を記述します。
 * fromの後ろには、その関数が書かれているファイルの場所を記述します。
 */
import { showHome } from './components/home.js';
import { showProductList } from './components/product-list.js';
import { showProductDetail } from './components/product-detail.js';
import { showProductRegister } from './components/product-register.js';

// 最初にページを開いた時、現在のURLに対応する画面を表示します。
document.addEventListener('DOMContentLoaded', function() {
    showPage(window.location.pathname);
});

// リンク、戻る、進むによるページ移動をNavigation APIで受け取ります。
navigation.addEventListener('navigate', function(event) {
    /*
     * event.destination.urlには、これから移動しようとしているURLが入っています。
     * new URL()を使うと、そのURLをpathnameやoriginに分けて利用できます。
     */
    let url = new URL(event.destination.url);

    // このWebサイト内の、処理を置き換えられるページ移動だけを対象にします。
    if (!event.canIntercept || url.origin !== window.location.origin) {
        return;
    }

    // タブレット用メニューが開いている場合は閉じます。
    /*
     * getInstance()は、すでに作成されているBootstrapのメニューを取得するメソッドです。
     * メニューが一度も開かれていない場合は取得できないため、menuにはnullが入ります。
     */
    let menu = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenu'));
    if (menu) {
        menu.hide();
    }

    /*
     * intercept()は、ブラウザの通常のページ移動をNavigation APIの処理へ置き換えます。
     * handlerに指定した関数の中で、移動先URLに対応する画面を表示します。
     */
    event.intercept({
        handler: function() {
            showPage(url.pathname);
        }
    });
});

/*
 * URLと表示するコンポーネントを対応させる関数です。
 * 4.3では同じファイルにあった関数を、4.4では別ファイルから呼び出します。
 */
function showPage(path) {
    // 画面を移動した時は、以前のModalを挿入した場所を空にします。
    document.getElementById('modal-area').innerHTML = '';

    if (path === '/' || path === '/index.html') {
        showHome();
        return;
    }

    if (path === '/products' || path === '/products/') {
        showProductList();
        return;
    }

    if (path === '/register' || path === '/register/') {
        showProductRegister();
        return;
    }

    // /products/3の「3」に当たる商品番号を取り出します。
    let result = path.match(/^\/products\/(\d+)$/);

    if (result) {
        showProductDetail(result[1]);
        return;
    }

    // どのURLにも当てはまらない場合は、エラー画面を表示します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">ページが見つかりません</h1>
        <a href="/" class="btn btn-primary">ホームへ戻る</a>`;
}
