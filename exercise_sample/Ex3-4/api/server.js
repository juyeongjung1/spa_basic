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
app.post('/api/employees', (req, res) => {
    // req.bodyから必要な項目を1つずつ取り出します。
    // locationNameにはreq.body.location_name、imagePathにはreq.body.image_pathを代入します。
    const password = req.body.password;
    const name = req.body.name;
    const salary = req.body.salary;
    const locationName = req.body.location_name;
    const imagePath = req.body.image_path;
    if (!password || !name || !salary) {
        res.status(400).json({
            error: '必須項目が不足しています',
        });
        return;
    }
    // ?はparamsの値へ順番に置き換わります。
    const sql =
        'INSERT INTO employee (password,name,salary,location_name,image_path) VALUES (?,?,?,?,?)';
    const params = [password, name, salary, locationName, imagePath];
    db.run(sql, params, (err) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        // 登録後の最新一覧を返すことで、フロントエンドはすぐに再描画できます。
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
