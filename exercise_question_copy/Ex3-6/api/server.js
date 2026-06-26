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
// 【手順1】GET /api/employees/:idを定義し、対象社員の詳細情報を取得してください。
app.get('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM employee WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        if (!row) {
            res.status(404).json({
                error: '社員が見つかりません',
            });
            return;
        }
        res.json(row);
    });
});
// 【手順4】PUT /api/employees/:idを定義してください。
app.put('/api/employees/:id', (req, res) => {
    // 【手順5】URLパラメータから社員番号を取得してください。
    const id = req.params.id;
    // 【手順6】req.bodyから5項目を1つずつ取得してください。
    const password = req.body.password;
    const name = req.body.name;
    const salary = req.body.salary;
    const locationName = req.body.location_name;
    const imagePath = req.body.image_path;
    // 【手順7】UPDATE文とparamsを作成してください。
    const sql = 'UPDATE employee SET password = ?, name = ?, salary = ?, location_name = ?, image_path = ? WHERE id = ?';
    const params = [password, name, salary, locationName, imagePath, id];
    // 【手順8】db.runで更新し、成功後に最新一覧を返してください。
    db.run(sql, params, (err) => {
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
