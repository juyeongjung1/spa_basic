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

function getAllProducts(res) {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(rows);
    });
}

function searchProducts(req, res) {
    const name = req.params.name;

    db.all('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(rows);
    });
}

function insertProduct(req, res) {
    const name = req.body.name;
    const price = req.body.price;

    if (!name || !price) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    db.run('INSERT INTO products (name, price, category) VALUES (?, ?, ?)', [name, price, '未分類'], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        getAllProducts(res);
    });
}

function deleteProduct(req, res) {
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        getAllProducts(res);
    });
}

// 動作確認用のAPI
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// 3-3-1 商品一覧
app.get('/api/v331/products', (req, res) => {
    getAllProducts(res);
});

// 3-3-2 商品一覧・商品名検索
app.get('/api/v332/products', (req, res) => {
    getAllProducts(res);
});

app.get('/api/v332/products/:name', searchProducts);

// 3-3-3 商品一覧・商品名検索・登録
app.get('/api/v333/products', (req, res) => {
    getAllProducts(res);
});

app.get('/api/v333/products/:name', searchProducts);

app.post('/api/v333/products', insertProduct);

// 3-3-4 商品一覧・商品名検索・登録・削除
app.get('/api/v334/products', (req, res) => {
    getAllProducts(res);
});

app.get('/api/v334/products/:name', searchProducts);

app.post('/api/v334/products', insertProduct);

app.delete('/api/v334/products/:id', deleteProduct);

// 3-3-5 商品一覧・更新・削除
app.get('/api/v335/products', (req, res) => {
    getAllProducts(res);
});

app.put('/api/v335/products/:id', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;

    if (!name || !price) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    db.run('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, req.params.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        getAllProducts(res);
    });
});

app.delete('/api/v335/products/:id', deleteProduct);

// ポート番号 8080 でサーバーを起動
app.listen(8080, () => {
    console.log('localhost:8080 でAPIサーバーが起動しました');
});
