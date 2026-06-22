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
app.get('/api/employees/:id', (req, res) =>
    db.get('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        res.json(row);
    }),
);
// PUTは更新値をbody、社員番号をURLから受け取ります。
app.put('/api/employees/:id', (req, res) => {
    const { password, name, salary, location_name, image_path } = req.body;
    db.run(
        'UPDATE employee SET password=?,name=?,salary=?,location_name=?,image_path=? WHERE id=?',
        [password, name, salary, location_name, image_path, req.params.id],
        (err) => {
            if (err) {
                res.status(500).json({
                    error: 'Database error',
                });
                return;
            }
            db.all('SELECT * FROM employee', [], (e, rows) => res.json(rows));
        },
    );
});
// DELETE後も最新一覧を返し、Modalを閉じた直後の一覧更新に使います。
app.delete('/api/employees/:id', (req, res) =>
    db.run('DELETE FROM employee WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        db.all('SELECT * FROM employee', [], (e, rows) => res.json(rows));
    }),
);
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
