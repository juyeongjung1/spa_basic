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

// 【作業手順③】データを削除するREST APIの作成
// ➃ HTTPのDELETEメソッドで「/api/v35/products/:id」にアクセスされた時に実行する処理を定義してください。
app.xxxxxx('______', (req, res) => {
    // ➄ URLパラメータから削除対象の商品番号idを取得してください。
    const id = req.params.xxx;

    // ➅ productsテーブルから、指定されたidの商品を削除するSQL文を設定してください。
    const sql = '______';

    // ➆ db.runを使い、DELETE文を実行してください。
    db.xxx(sql, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ➇ 削除後の一覧を取得し直してください。
        db.xxx('SELECT * FROM products', [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            // ➈ 削除後の商品一覧をJSON形式で返してください。
            res.xxx(rows);
        });
    });
});

// 3-4までに学習した商品登録API
app.post('/api/v35/products', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    if (!name || !price || !category) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    const sql = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';
    const params = [name, price, category];

    db.run(sql, params, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        db.all('SELECT * FROM products', [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            res.json(rows);
        });
    });
});

// 3-4までに学習した商品一覧・キーワード検索API
app.get('/api/v35/products', (req, res) => {
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

// ポート番号 3005 でサーバーを起動
app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
