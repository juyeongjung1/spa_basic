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
// ➄ HTTPのPOSTメソッドで「/api/v34/products」にアクセスされた時に実行する処理を定義してください。
app.xxx('______', (req, res) => {
    // ➅ リクエストボディから商品名と価格を取得してください。
    const name = req.body.xxx;
    const price = req.body.xxx;

    // ➆ productsテーブルへ商品名・価格・カテゴリを登録するSQL文を設定してください。
    const sql = '______';

    // ➇ db.runを使い、INSERT文を実行してください。
    //    カテゴリは今回は固定で「未分類」を登録します。
    db.xxx(sql, [name, price, '未分類'], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ➈ 登録後の一覧を取得し直してください。
        db.xxx('SELECT * FROM products', [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            // ➉ 登録後の商品一覧をJSON形式で返してください。
            res.xxx(rows);
        });
    });
});

// ポート番号 3005 でサーバーを起動
app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
