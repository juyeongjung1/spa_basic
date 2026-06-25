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
    // 分割代入でリクエストボディから必要な項目を取り出します。
    const { password, name, salary, location_name, image_path } = req.body;
    if (!password || !name || !salary) {
        res.status(400).json({
            error: '必須項目が不足しています',
        });
        return;
    }
    // ?はparamsの値へ順番に置き換わります。
    const sql =
        'INSERT INTO employee (password,name,salary,location_name,image_path) VALUES (?,?,?,?,?)';
    const params = [password, name, salary, location_name, image_path];
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
