// 必要なモジュールの読み込み
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// ➃ 【list.htmlの➂から移動】expressの機能を利用するため、appを初期化してください。
const app = ______;

// JSONデータを扱うための設定
app.use(express.json());

// CORS（他のサーバーからの通信を許可）
app.use(cors());

// ➄ SQLiteデータベースファイル(products.db)を開いてください。
//    dbフォルダはapiフォルダの1つ外側にあります。
const db = new sqlite3.Database('______');

// 動作確認用のAPI
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// ➅ HTTPのGETメソッドで「/api/v331/products」にアクセスされた時に実行する処理を定義してください。
//    list.htmlのaxios.get('http://localhost:3005/api/v331/products')から呼び出されます。
app.xxx('______', (req, res) => {
    // ➆ 全件検索をするため、WHERE句がないSQL文を設定してください。
    const sql = '______';

    // ➇ db.allを使い、複数行の検索結果を配列として受け取ってください。
    //    第1引数はSQL文、第2引数はSQLに渡す値、第3引数はcallback関数です。
    db.xxx(sql, [], (err, rows) => {
        // ➈ errには、エラーが発生した時の情報が入ります。
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ➉ rowsには、検索結果が配列の形で入ります。
        //    rowsをJSON形式で呼び出し元(list.html)へ返してください。
        //    ここまで確認したら、list.htmlの⑪へ戻ってください。
        res.xxx(rows);
    });
});

// 【作業手順④】キーワード検索と一覧表示を同じAPIで処理します。
// ➇ HTTPのGETメソッドで「/api/v332/products」にアクセスされた時に実行する処理を定義してください。
app.xxx('______', (req, res) => {
    // ➈ クエリパラメータkeywordを取得してください。
    //    search_keyword.htmlのaxios.get(`...?keyword=${name}`)から送られてきます。
    const keyword = req.query.xxx;

    // keywordがない場合は、全件検索を行います。
    let sql = 'SELECT * FROM products';
    let params = [];

    // ➉ keywordがある場合だけ、商品名の部分一致検索を行うSQLに変更してください。
    if (keyword) {
        sql = '______';
        // ⑪ 前後に%を付けたキーワードをparamsに設定してください。
        params = [______];
    }

    // ⑫ db.allを使い、sqlとparamsで検索結果を取得してください。
    db.xxx(sql, params, (err, rows) => {
        // errには、エラーが発生した時の情報が入ります。
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ⑬ rowsをJSON形式で呼び出し元(search_keyword.html)へ返してください。
        res.xxx(rows);
    });
});

// ポート番号 3005 でサーバーを起動
app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
