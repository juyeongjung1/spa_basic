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
// 【手順1】第3章の社員登録APIを参考にPOST /api/employeesを完成させてください。
app._____(_____, (req, res) => {
    const password = req.body._____;
    const name = req.body._____;
    const salary = req.body._____;
    const locationName = req.body._____;
    const imagePath = req.body._____;
    const sql = _____;
    const params = _____;
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
