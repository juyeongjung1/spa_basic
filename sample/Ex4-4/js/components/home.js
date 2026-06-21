/*
 * ホーム画面を表示するコンポーネントです。
 * exportは、この関数を別のJavaScriptファイルから読み込めるようにする指定です。
 * app.jsでimportすると、app.jsからshowHome()を呼び出せるようになります。
 */
export function showHome() {
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">ホーム</h1>
        <div class="content-box">
            <h2>商品管理システムへようこそ</h2>
            <p>商品の一覧、登録、更新、削除を行うことができます。</p>
            <a href="/products" class="btn btn-primary">商品一覧を見る</a>
        </div>`;
}
