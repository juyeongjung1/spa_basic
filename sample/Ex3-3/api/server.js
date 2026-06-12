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




// 【3.3.1 全件検索】商品一覧取得API（GET /api/products）
app.get('/api/v331/products', (req, res) => {
    const sql = 'SELECT * FROM products';

    // db.all は、複数行の結果を配列で取得するメソッド
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            // サーバー側でエラーが発生した場合は、500番エラーを返す
            res.status(500).json({ error: 'Database error' });
            return;
        }
        // 正常に取得できた場合は、JSON配列として返す
        res.json(rows);
    });
});

// 3-3-2 商品一覧・キーワード検索
app.get('/api/v332/products', (req, res) => {
    // URLの「?keyword=値」から検索キーワードを取得します。
    // 例: /api/v332/products?keyword=ノート
    const keyword = req.query.keyword;

    // keywordがない場合は、商品を全件取得します。
    let sql = 'SELECT * FROM products';
    let params = [];

    // keywordがある場合は、商品名にkeywordを含むデータだけを検索します。
    if (keyword) {
        sql = 'SELECT * FROM products WHERE name LIKE ?';
        // LIKE検索では、%を前後につけることで部分一致検索になります。
        // SQL文と値を分けることで、SQLインジェクション対策にもなります。
        params = [`%${keyword}%`];
    }

    // sqlとparamsを使ってSQLiteに問い合わせます。
    // db.allは、複数行の検索結果を配列として受け取るメソッドです。
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // 検索結果をJSON形式でブラウザ側へ返します。
        res.json(rows);
    });
});

// 3-3-3 商品一覧
app.get('/api/v333/products', (req, res) => {
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

// 3-3-3 商品名検索
app.get('/api/v333/products/:name', (req, res) => {
    const name = req.params.name;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';

    db.all(sql, [`%${name}%`], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        res.json(rows);
    });
});

// 3-3-3 商品登録
app.post('/api/v333/products', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;

    if (!name || !price) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    const sql = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';

    db.run(sql, [name, price, '未分類'], (err) => {
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

// 3-3-4 商品一覧
app.get('/api/v334/products', (req, res) => {
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

// 3-3-4 商品名検索
app.get('/api/v334/products/:name', (req, res) => {
    const name = req.params.name;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';

    db.all(sql, [`%${name}%`], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        res.json(rows);
    });
});

// 3-3-4 商品登録
app.post('/api/v334/products', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;

    if (!name || !price) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    const sql = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';

    db.run(sql, [name, price, '未分類'], (err) => {
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

// 3-3-4 商品削除
app.delete('/api/v334/products/:id', (req, res) => {
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

// 3-3-5 商品一覧
app.get('/api/v335/products', (req, res) => {
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

// 3-3-5 商品更新
app.put('/api/v335/products/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;

    if (!name || !price) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';

    db.run(sql, [name, price, id], (err) => {
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

// 3-3-5 商品削除
app.delete('/api/v335/products/:id', (req, res) => {
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

// ポート番号 3005 でサーバーを起動
app.listen(3005, () => {
    console.log('localhost:3005 でAPIサーバーが起動しました');
});
