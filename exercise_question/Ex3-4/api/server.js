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
app._____(_____, (req, res) => {
    // 【手順2】req.bodyから5項目を1つずつ取得してください。
    // locationNameにはreq.body.location_name、imagePathにはreq.body.image_pathを代入する点に注意してください。
    const password = req.body._____;
    const name = req.body._____;
    const salary = req.body._____;
    const locationName = req.body._____;
    const imagePath = req.body._____;
    // 【手順3】必須3項目（password、name、salary）がなければ400を返してください。
    _____;
    // 【手順4】employeeテーブルへ登録するSQLとparamsを作成してください。
    // idは自動採番のため、INSERT対象の列名を明示してください。
    const sql = _____;
    const params = _____;
    // 【手順5】db.runでINSERTし、成功後に全件を取得して返してください。
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
