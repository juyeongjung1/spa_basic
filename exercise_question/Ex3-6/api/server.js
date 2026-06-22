const express = require('express'),
    cors = require('cors'),
    sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('../db/employees.db');
app.get('/api/employees', (req, res) =>
    db.all('SELECT * FROM employee', [], (err, rows) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        res.json(rows);
    }),
);
// 【手順1】PUT /api/employees/:idを定義してください。
app._____(_____, (req, res) => {
    // 【手順2】URLからid、bodyから5項目を取得してください。
    const id = _____;
    const { _____ } = req.body;
    // 【手順3】UPDATE文とparamsを作成してください。
    const sql = _____;
    const params = _____;
    // 【手順4】db.runで更新し、成功後に最新一覧を返してください。
    db._____(sql, params, (err) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        db._____('SELECT * FROM employee', [], (err, rows) => {
            if (err) {
                res.status(500).json({
                    error: 'Database error',
                });
                return;
            }
            _____;
        });
    });
});
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
