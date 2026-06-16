// 必要なモジュールの読み込み
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// ➃ 【list.htmlの➂から移動】expressの機能を利用するため、appを初期化してください。
const app = ______;

// JSONデータを扱うための設定
app.use(express.json());

// CORS（他のサーバーからの通信を許可）
app.use(cors());

// ➄ SQLiteデータベースファイル(products.db)を開いてください。
//    dbフォルダはapiフォルダの1つ外側にあります。
const db = new sqlite3.Database('______');

// 動作確認用のAPI
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// ➅ HTTPのGETメソッドで「/api/v331/products」にアクセスされた時に実行する処理を定義してください。
//    list.htmlのaxios.get('http://localhost:3005/api/v331/products')から呼び出されます。
app.xxx('______', (req, res) => {
    // ➆ 全件検索をするため、WHERE句がないSQL文を設定してください。
    const sql = '______';

    // ➇ db.allを使い、複数行の検索結果を配列として受け取ってください。
    //    第1引数はSQL文、第2引数はSQLに渡す値、第3引数はcallback関数です。
    db.xxx(sql, [], (err, rows) => {
        // ➈ errには、エラーが発生した時の情報が入ります。
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ➉ rowsには、検索結果が配列の形で入ります。
        //    rowsをJSON形式で呼び出し元(list.html)へ返してください。
        //    ここまで確認したら、list.htmlの⑪へ戻ってください。
        res.xxx(rows);
    });
});

// ここから下は、別画面で利用するAPIです。
// 今回のlist.htmlの流れでは、まず➀〜⑰を優先して確認してください。

//【ここから、3.3.2の内容】

// 【作業手順④】キーワード検索と一覧表示を同じAPIで処理します。
// ➇ HTTPのGETメソッドで「/api/v332/products」にアクセスされた時に実行する処理を定義してください。
app.xxx('______', (req, res) => {
    // ➈ クエリパラメータkeywordを取得してください。
    //    search_keyword.htmlのaxios.get(`...?keyword=${name}`)から送られてきます。
    const keyword = req.query.xxx;

    // keywordがない場合は、全件検索を行います。
    let sql = 'SELECT * FROM products';
    let params = [];

    // ➉ keywordがある場合だけ、商品名の部分一致検索を行うSQLに変更してください。
    if (keyword) {
        sql = '______';
        // ⑪ 前後に%を付けたキーワードをparamsに設定してください。
        params = [______];
    }

    // ⑫ db.allを使い、sqlとparamsで検索結果を取得してください。
    db.xxx(sql, params, (err, rows) => {
        // errには、エラーが発生した時の情報が入ります。
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // ⑬ rowsをJSON形式で呼び出し元(search_keyword.html)へ返してください。
        res.xxx(rows);
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
