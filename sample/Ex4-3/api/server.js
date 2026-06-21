const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3005;
const indexPath = path.join(__dirname, '..', 'index.html');
const dbPath = path.join(__dirname, '..', 'db', 'products.db');
const db = new sqlite3.Database(dbPath);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// 商品一覧API
app.get('/api/v43/products', (req, res) => {
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

// 商品詳細API
app.get('/api/v43/products/:id', (req, res) => {
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

// 商品一覧のURLへ直接アクセスした時も、同じindex.htmlを返します。
app.get('/products', (req, res) => {
    res.sendFile(indexPath);
});

// 商品登録のURLへ直接アクセスした時も、同じindex.htmlを返します。
app.get('/register', (req, res) => {
    res.sendFile(indexPath);
});

// 商品詳細のURLへ直接アクセスした時も、同じindex.htmlを返します。
app.get('/products/:id', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`http://localhost:${port} でサーバーが起動しました`);
});
