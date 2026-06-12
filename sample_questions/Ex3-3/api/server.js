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

// 【穴埋め】7行目でexpressの機能を使うために app を初期化しています。
// 【穴埋め】HTTPのGETメソッドで「/api/v331/products」にアクセスされた時、この中の関数が実行されます。
// 【穴埋め】app.get の第1引数にはURL、第2引数には実行する処理を書きます。

// 【3.3.1 全件検索】商品一覧取得API
app.get('/api/v331/products', (req, res) => {
    const sql = 'SELECT * FROM products';

    // 【穴埋め】全件検索なので、WHERE句がないSQL文を実行します。
    // 【穴埋め】db.allは、複数行の検索結果を配列で受け取るsqlite3専用メソッドです。
    // 【穴埋め】第1引数 sql、第2引数 [] は実行前に渡す値です。
    // 【穴埋め】第3引数の (err, rows) はcallback関数で、実行後の戻り値を受け取ります。
    db.all(sql, [], (err, rows) => {
        // 【穴埋め】errには、エラーが発生した時の情報が入ります。
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // 【穴埋め】rowsには、検索結果が配列の形で入ります。
        // 【穴埋め】rowsをJSON形式で呼び出し元のJavaScriptへ返します。
        res.json(rows);
    });
});

// 3-3-2 商品一覧
app.get('/api/v332/products', (req, res) => {
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

// 3-3-2 商品名検索
app.get('/api/v332/products/:name', (req, res) => {
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

// ポート番号 8080 でサーバーを起動
app.listen(8080, () => {
    console.log('localhost:8080 でAPIサーバーが起動しました');
});
