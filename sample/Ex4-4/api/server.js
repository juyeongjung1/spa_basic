const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3005;
const indexPath = path.join(__dirname, '..', 'index.html');
const dbPath = path.join(__dirname, '..', 'db', 'products.db');
const db = new sqlite3.Database(dbPath);

app.use(express.json());

// index.html、jsフォルダなどのフロント側ファイルを配信します。
app.use(express.static(path.join(__dirname, '..')));

// 商品一覧API
app.get('/api/v44/products', (req, res) => {
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
app.get('/api/v44/products/:id', (req, res) => {
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

// 商品登録API
app.post('/api/v44/products', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    if (!name || !price || !category) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    const sql = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';
    const params = [name, price, category];

    db.run(sql, params, function(err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // 登録した商品の商品番号を返します。
        res.json({ id: this.lastID });
    });
});

// 商品更新API
app.put('/api/v44/products/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    if (!id || !name || !price || !category) {
        res.status(400).json({ error: 'データに誤りがあります' });
        return;
    }

    const sql = 'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?';
    const params = [name, price, category, id];

    db.run(sql, params, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        res.json({ message: '商品を更新しました' });
    });
});

// 商品削除API
app.delete('/api/v44/products/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';

    db.run(sql, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        res.json({ message: '商品を削除しました' });
    });
});

/*
 * SPAの各URLを直接開いた場合も、同じindex.htmlを返します。
 * 表示するコンポーネントは、app.jsがURLを確認して決めます。
 */
app.get('/products', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/register', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/products/:id', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`http://localhost:${port} でサーバーが起動しました`);
});
