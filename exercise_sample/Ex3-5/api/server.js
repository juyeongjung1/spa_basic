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
app.delete('/api/employees/:id', (req, res) => {
    // :idの値はreq.params.idで取得します。
    const id = req.params.id;
    const sql = 'DELETE FROM employee WHERE id = ?';
    db.run(sql, [id], err => {
        if (err) {
            res.status(500).json({
                error: 'Database error'
            });
            return;
        }
        // 削除後の一覧を返し、画面を最新状態へ更新できるようにします。
        db.all('SELECT * FROM employee', [], (err, rows) => {
            if (err) {
                res.status(500).json({
                    error: 'Database error'
                });
                return;
            }
            res.json(rows);
        });
    });
});
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
