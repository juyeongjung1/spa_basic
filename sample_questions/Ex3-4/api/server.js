// 必要なモジュールの読み込み
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Expressアプリの作成
const app = express();

// JSONデータを扱うための設定
app.use(express.json());

// CORS（他のサーバーからの通信を許可）
app.use(cors());

// SQLiteデータベースへの接続
const db = new sqlite3.Database('../db/products.db');

// 動作確認用のAPI
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// v332までに学習した商品一覧・キーワード検索API
app.get('/api/v34/products', (req, res) => {
    const keyword = req.query.keyword;
    let sql = 'SELECT * FROM products';
    let params = [];

    if (keyword) {
        sql = 'SELECT * FROM products WHERE name LIKE ?';
        params = [`%${keyword}%`];
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        res.json(rows);
    });
});

// 【作業手順③】商品登録APIを作ります。
// ➇ HTTPのPOSTメソッドで「/api/v34/products」にアクセスされた時に実行する処理を定義してください。
app.xxx('______', (req, res) => {
    // ➈ req.bodyから商品名・価格・カテゴリを取得してください。
    const name = req.body.xxx;
    const price = req.body.xxx;
    const category = req.body.xxx;

    // ➉ サーバー側で必須チェックを行います。
    //    不足がある場合は400 Bad Requestを返し、returnで処理を終了します。
    if (!name || !price || !category) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    // ⑪ productsテーブルへ商品名・価格・カテゴリを登録するSQL文を設定してください。
    const sql = '______';

    // ⑫ db.runを使い、INSERT文を実行してください。
    //    第2引数には、SQL文の「?」に入れる値を配列で指定します。
    db.xxx(sql, [name, price, category], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ⑬ 登録後の一覧を取得し直してください。
        db.xxx('SELECT * FROM products', [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            // ⑭ 登録後の商品一覧をJSON形式で返してください。
            res.xxx(rows);
        });
    });
});

// ポート番号 3005 でサーバーを起動
app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
