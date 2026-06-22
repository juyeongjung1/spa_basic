const express = require('express'),
    cors = require('cors'),
    sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('../db/employees.db');
app.get('/api/employees', (req, res) => db.all('SELECT * FROM employee', [], (err, rows) => {
    if (err) {
        res.status(500).json({
            error: 'Database error'
        });
        return;
    }
    res.json(rows);
}));
// 【手順1】GET /api/employees/:idを定義してください。
app._____(_____, (req, res) => {
    // 【手順2】URLからidを取得し、WHERE id = ?で1件検索してください。
    const id = _____;
    const sql = _____;
    db._____(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({
                error: 'Database error'
            });
            return;
        }
        if (!row) {
            res.status(404).json({
                error: '社員が見つかりません'
            });
            return;
        }
        _____
    });
});
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
