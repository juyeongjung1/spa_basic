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
app.put('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    const name = req.body.name;
    const salary = req.body.salary;
    const locationName = req.body.location_name;
    const imagePath = req.body.image_path;
    // WHERE id = ?を付け、指定した社員だけを更新します。
    const sql =
        'UPDATE employee SET password = ?, name = ?, salary = ?, location_name = ?, image_path = ? WHERE id = ?';
    const params = [password, name, salary, locationName, imagePath, id];
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
