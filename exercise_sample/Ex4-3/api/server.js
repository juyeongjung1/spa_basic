const express = require('express'),
    cors = require('cors'),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path');
const app = express();
app.use(cors());
// URLを直接入力してもSPAを表示できるよう、1つ上のindex.htmlを配信します。
app.use(express.static(path.join(__dirname, '..')));
const db = new sqlite3.Database('../db/employees.db');
// SPAから利用する一覧APIと詳細APIです。ルーティング演習に集中できるよう完成済みです。
app.get('/api/employees', (req, res) =>
    db.all('SELECT * FROM employee', [], (e, rows) =>
        e
            ? res.status(500).json({
                  error: 'Database error',
              })
            : res.json(rows),
    ),
);
app.get('/api/employees/:id', (req, res) =>
    db.get('SELECT * FROM employee WHERE id=?', [req.params.id], (e, row) =>
        e
            ? res.status(500).json({
                  error: 'Database error',
              })
            : res.json(row),
    ),
);
// /employees/new のようなSPA用URLは、実ファイルではなくindex.htmlへ戻します。
app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
