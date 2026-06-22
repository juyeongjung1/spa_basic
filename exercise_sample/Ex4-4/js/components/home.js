// exportを付けた関数は、他のmoduleからimportできます。
export function showHome() {
    // app要素だけを書き換えるため、ページ全体を再読み込みせずに表示を切り替えられます。
    document.getElementById('app').innerHTML = '<h2>ホーム</h2><p>社員情報を管理できます。</p>';
}
