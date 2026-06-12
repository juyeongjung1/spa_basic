// 必要なモジュールの読み込み
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// ➄ expressの機能を利用するため、appを初期化してください。
const app = ______;

// JSONデータを扱うための設定
app.use(express.json());

// CORS（他のサーバーからの通信を許可）
app.use(cors());

// ➅ SQLiteデータベースファイル(products.db)を開いてください。
//    dbフォルダはapiフォルダの1つ外側にあります。
const db = new sqlite3.Database('______');

// 動作確認用のAPI
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// 既存の商品一覧表示API
app.get('/api/v341/products', (req, res) => {
    const sql = 'SELECT * FROM products';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        res.json(rows);
    });
});

// 【作業手順③】商品登録APIを作ります。
// ➆ HTTPのPOSTメソッドで「/api/v341/products」にアクセスされた時に実行する処理を定義してください。
app.xxx('______', (req, res) => {
    // ➇ リクエストボディから商品名と価格を取得してください。
    const name = req.body.xxx;
    const price = req.body.xxx;

    // ➈ productsテーブルへ商品名・価格・カテゴリを登録するSQL文を設定してください。
    const sql = '______';

    // ➉ db.runを使い、INSERT文を実行してください。
    //    カテゴリは今回は固定で「未分類」を登録します。
    db.xxx(sql, [name, price, '未分類'], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ⑪ 登録後の一覧を取得し直してください。
        db.xxx('SELECT * FROM products', [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            // ⑫ 登録後の商品一覧をJSON形式で返してください。
            res.xxx(rows);
        });
    });
});

// ポート番号 3005 でサーバーを起動
app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
