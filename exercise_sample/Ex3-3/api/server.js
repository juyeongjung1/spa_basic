const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('../db/employees.db');

// 一覧と検索は同じURLを使い、keywordの有無でSQLを切り替えます。
app.get('/api/employees', (req, res) => {
    let sql = 'SELECT * FROM employee';
    let params = [];
    const keyword = req.query.keyword;
    if (keyword) {
        // LIKE ?とプレースホルダーを使い、入力値をSQL文字列へ直接連結しません。
        sql = 'SELECT * FROM employee WHERE name LIKE ?';
        params = [`%${keyword}%`];
    }
    // db.allは複数行の検索結果を配列rowsで返します。
    db.all(sql, params, (err, rows) => {
        if (err) { res.status(500).json({ error: 'Database error' }); return; }
        res.json(rows);
    });
});

app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
