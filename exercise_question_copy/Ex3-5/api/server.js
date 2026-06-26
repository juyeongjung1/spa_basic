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
// 【手順1】DELETE /api/employees/:idを定義してください。
app.delete('/api/employees/:id', (req, res) => {
    // 【手順2】URLパラメータから社員番号を取得してください。
    const id = req.params.id;
    // 【手順3】社員番号が一致する行を削除するSQLを指定してください。
    const sql = 'DELETE FROM employee WHERE id = ?';
    // 【手順4】db.runで削除し、成功後に最新一覧を返してください。
    db.run(sql, [id], (err) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        db.all('SELECT * FROM employee', [], (err, rows) => {
            if (err) {
                res.status(500).json({
                    error: 'Database error',
                });
                return;
            }
            res.json(rows);
        });
    });
});
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
