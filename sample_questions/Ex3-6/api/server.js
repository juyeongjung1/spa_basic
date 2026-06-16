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

// 【作業手順④】商品更新APIを作ります。
// ➈ HTTPのPUTメソッドで「/api/v36/products/:id」にアクセスされた時に実行する処理を定義してください。
app.xxx('______', (req, res) => {
    // ➉ URLパラメータから更新対象の商品番号idを取得してください。
    const id = req.params.xxx;

    // ⑪ リクエストボディから商品名・価格・カテゴリを取得してください。
    const name = req.body.xxx;
    const price = req.body.xxx;
    const category = req.body.xxx;

    // ⑫ サーバー側で必須チェックを行います。
    if (!id || !name || !price || !category) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    // ⑬ productsテーブルの商品名・価格・カテゴリを更新するSQL文を設定してください。
    const sql = '______';
    const params = [name, price, category, id];

    // ⑭ db.runを使い、UPDATE文を実行してください。
    db.xxx(sql, params, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ⑮ 更新後の一覧を取得し直してください。
        db.xxx('SELECT * FROM products', [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            // ⑯ 更新後の商品一覧をJSON形式で返してください。
            res.xxx(rows);
        });
    });
});

// 3-5までに学習した商品削除API
app.delete('/api/v36/products/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';

    db.run(sql, [id], (err) => {
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

// 3-4までに学習した商品登録API
app.post('/api/v36/products', (req, res) => {
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
app.get('/api/v36/products', (req, res) => {
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
