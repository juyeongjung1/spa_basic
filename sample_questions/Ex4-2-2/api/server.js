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
app.get('/api/v422/products', (req, res) => {
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

// 商品詳細
app.get('/api/v422/products/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (!row) {
            res.status(404).json({ error: '商品が見つかりません' });
            return;
        }

        res.json(row);
    });
});

// 【作業手順➄】商品登録APIを作成する
// ④ sample/Ex3-4/api/server.jsの商品登録APIをここへコピーし、APIのパスを
// 「/api/v422/products」に変更してください。

app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
