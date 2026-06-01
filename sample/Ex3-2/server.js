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
  res.json({ status: 'ok' })
})

// ポート番号3004でサーバーを起動
app.listen(3004, () => {
  console.log('localhost:3004 のサーバーが起動しました')
})
