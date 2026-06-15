// 必要なモジュールの読み込み
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Expressアプリの作成
const app = express();

// JSONデータを扱うための設定
app.use(express.json());

// CORS（他のサーバーからの通信を許可）
app.use(cors());

// SQLiteデータベースへの接続
const db = new sqlite3.Database(path.join(__dirname, '../db/products.db'));

// 動作確認用のAPI
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// 3-4 商品一覧・キーワード検索
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

// 3-4 商品登録
app.post('/api/v34/products', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const sql = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';

    db.run(sql, [name, price, category], (err) => {
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

// ポート番号 3005 でサーバーを起動
app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
