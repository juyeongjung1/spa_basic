const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('../db/products.db');

app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// 商品一覧・キーワード検索
app.get('/api/v421/products', (req, res) => {
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

// index.htmlの作業手順③を実装したら、次にこの処理を作成してください。
// 【作業手順➃】主キーで商品詳細を検索するAPIを作る
// ⑥ GET方式で、URLの最後に商品IDを受け取る商品詳細APIを定義してください。
app.xxx('/api/v421/products/:xx', (req, res) => {
    // ⑦ URLパラメータから商品IDを取得してください。
    const id = req.params.xxx;
    // ⑧ productsテーブルから、商品IDが一致する1件を検索するSQL文を設定してください。
    const sql = 'xxxxxxxx';

    // ⑨ 一覧検索のdb.allではなく、1件を取得するメソッドを使用してください。
    db.xxx(sql, [id], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (!row) {
            res.status(404).json({ error: '商品が見つかりません' });
            return;
        }

        // ⑩ 検索した1件分の商品情報をJSON形式で返してください。
        res.xxx(row);
    });
});

app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
