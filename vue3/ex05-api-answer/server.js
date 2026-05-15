const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express()

// JSONデータとCORSの許可
app.use(express.json())
app.use(cors())

// データベース接続
const db = new sqlite3.Database('./db/employees.db')

// 1. 社員一覧取得・検索 API

// A. 検索 API (GET)
// 【演習 5.1 e で使用】
app.get(['/api/employees/search', '/api/employees/search/'], (req, res) => {
  const keyword = req.query.keyword
  const sql = 'SELECT * FROM employees WHERE name LIKE ?'
  const params = [`%${keyword}%`]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' })
      return
    }
    res.json(rows)
  })
})

// B. 全件取得 API (GET)
// 【演習 5.1 b で使用】
app.get(['/api/employees', '/api/employees/'], (req, res) => {
  const sql = 'SELECT * FROM employees'

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' })
      return
    }
    res.json(rows)
  })
})

// 2. 社員詳細取得 API (GET)
// 【演習 5.2 b, 5.3 a で使用】
app.get(['/api/employees/:id', '/api/employees/:id/'], (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM employees WHERE id = ?'

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Database error' })
      return
    }
    res.json(row)
  })
})

// 3. 社員登録 API (POST)
// 【演習 5.4 a で使用】
app.post(['/api/employees', '/api/employees/'], (req, res) => {
  // image_path を受け取るように追加
  const { password, name, salary, location_name, image_path } = req.body

  if (!password || !name || !salary) {
    res.status(400).json({ error: 'データに誤りがあります' })
    return
  }

  // SQL文とパラメータを修正
  const sql = 'INSERT INTO employees (password, name, salary, location_name, image_path) VALUES (?, ?, ?, ?, ?)'
  const params = [password, name, salary, location_name, image_path]

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: 'Database error' })
      return
    }
    res.status(201).json({ id: this.lastID })
  })
})

// 4. 社員更新 API (PUT)
// 【演習 5.3 b で使用】
app.put(['/api/employees/:id', '/api/employees/:id/'], (req, res) => {
  const id = req.params.id
  // image_path を受け取るように追加
  const { password, name, salary, location_name, image_path } = req.body

  // SQL文とパラメータを修正
  const sql = 'UPDATE employees SET password = ?, name = ?, salary = ?, location_name = ?, image_path = ? WHERE id = ?'
  const params = [password, name, salary, location_name, image_path, id]

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: 'Database error' })
      return
    }
    res.json({ id: id })
  })
})

// 5. 社員削除 API (DELETE)
// 【演習 5.2 c で使用】
app.delete(['/api/employees/:id', '/api/employees/:id/'], (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM employees WHERE id = ?'

  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Database error' })
      return
    }
    res.json({ message: '削除成功' })
  })
})

// サーバー起動
app.listen(3000, () => {
  console.log('Server running on port 3000')
})
