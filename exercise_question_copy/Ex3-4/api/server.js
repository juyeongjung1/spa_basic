const express = require('express'),
    cors = require('cors'),
    sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('../db/employees.db');
// 初期表示用に、社員一覧を取得するAPIも定義します。
app.get('/api/employees', (req, res) => {
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
// 【手順1】POST /api/employeesを定義してください。
app.post('/api/employees', (req, res) => {
    // 【手順2】req.bodyから5項目を取得してください。
    const password = req.body.password;
    const name = req.body.name;
    const salary = req.body.salary;
    const locationName = req.body.location_name;
    const imagePath = req.body.image_path;

    // 【手順3】必須3項目がなければ400を返してください。
    if (!password || !name || !salary){
                   res.status(400).json({
                    error:'データに誤りがあります'
                   });
                   return;
                };
    // 【手順4】employeeテーブルへ登録するSQLとparamsを作成してください。
    const sql = `
        INSERT INTO employee (password, name, salary, location_name, image_path)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [password, name, salary, locationName, imagePath];
    // 【手順5】db.runでINSERTし、成功後に全件を取得して返してください。
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
