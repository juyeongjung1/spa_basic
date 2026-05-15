// 必要なモジュールの読み込み
const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

// Expressアプリの作成
const app = express()

// JSONデータを扱うためのミドルウェア
app.use(express.json())

// CORS（他のサーバーとの通信を許可する仕組み）
app.use(cors())

// SQLiteデータベースへの接続
const db = new sqlite3.Database('./db/products.db')

// 動作確認用のAPI（GET /api/test）
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
})

// ポート番号3000でサーバーを起動
app.listen(3000, () => {
  console.log('localhost:3000 のサーバーが起動しました')
})

// 【5.3.1 全件検索】商品一覧取得API（GET /api/products）
app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products'

  // db.all は、複数行の結果を配列で取得するメソッド
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      // サーバー側でエラーが発生した場合は、500番エラーを返す
      res.status(500).json({ error: 'Database error' })
      return
    }
    // 正常に取得できた場合は、JSON配列として返す
    res.json(rows)
  })
})

// 【5.4 キーワード検索】商品名で部分一致検索するAPI（GET /api/products2?keyword=値）
app.get('/api/products2', (req, res) => {
  // 1. URLパラメータからキーワードを取得
  const keyword = req.query.keyword

  // 2. WHERE句で部分一致検索（nameにキーワードを含む商品を検索）
  const sql = 'SELECT * FROM products WHERE name LIKE ?'
  const params = [`%${keyword}%`]

  // 3. SQLiteに対してSQLを実行
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: 'Database error' })
      return
    }

    // 4. 結果をJSON形式で返却
    res.json(rows)
  })
})

// 【5.3.3】商品詳細取得 API（GET /api/products/:id）
// :id の部分はパスパラメータとして動的に受け取ります
app.get('/api/products/:id', (req, res) => {
  // 1. URLパラメータから id を取得
  const id = req.params.id;

  // 2. SQLの準備（1件だけ取得するので WHERE id = ?）
  const sql = 'SELECT * FROM products WHERE id = ?';

  // 3. SQL実行
  // db.get は「1行だけ」取得するメソッドです（検索結果が1件または0件の場合に使用）
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    // 4. 結果をJSONで返却（配列ではなく、単一のオブジェクトが返ります）
    res.json(row);
  });
});

// 【5.4】新規商品登録 API（POST /api/products）
app.post('/api/products', (req, res) => {
  // 1. リクエストボディからデータを取り出す
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;

  // 2. サーバー側でのバリデーション（必須チェック）
  if (!name || !price || !category) {
    // 400 Bad Request: クライアント側のリクエストミス
    res.status(400).json({ error: 'データに誤りがあります' });
    return;
  }

  // 3. SQLの準備
  const sql = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';
  const params = [name, price, category];

  // 4. SQL実行
// ここではアロー関数 (err) => {} ではなく function(err) {} を使います
  db.run(sql, params, function (err) {
    if (err) {
      console.error('登録エラー:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    // 5. 登録成功レスポンス(新しく発番されたIDを返却)
    res.status(201).json({id: this.lastID });
  });
});

// 【5.5】商品情報更新 API（PUT /api/products/:id）
// :id で更新対象を指定し、body で変更内容を受け取ります
app.put('/api/products/:id', (req, res) => {
  // 1. URLパラメータから id を取得（詳細検索と同じ）
  // これで「どの商品を更新するか」を特定します
  const id = req.params.id;

  // 2. リクエストボディから変更後のデータを取り出す（新規登録と同じ）
  // これが「新しい商品の情報」になります
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;

  // 3. サーバー側でのバリデーション
  if (!name || !price || !category) {
    res.status(400).json({ error: 'データに誤りがあります' });
    return;
  }

  // 4. SQLの準備
  // UPDATE文を使用し、WHERE句でidを指定して特定の行だけを書き換えます
  const sql = 'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?';
  const params = [name, price, category, id];

  // 5. SQL実行
  // 更新処理なので db.run を使用します（function(err)構文で実行結果を取得）
  db.run(sql, params, function (err) {
    if (err) {
      console.error('更新エラー:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    // 6. 成功レスポンス
    res.json({id: id }); // 更新した商品のIDを返す
  });
});

// 【5.6】商品削除 API（DELETE /api/products/:id）
app.delete('/api/products/:id', (req, res) => {
  // 1. URLパラメータから id を取得
  const id = req.params.id;

  // 2. SQLの準備
  // 特定のIDの行を物理削除します
  const sql = 'DELETE FROM products WHERE id = ?';
  
  // 3. SQL実行
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('削除エラー:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    // 4. 成功レスポンス
    res.json({ message: '削除成功' });
  });
});