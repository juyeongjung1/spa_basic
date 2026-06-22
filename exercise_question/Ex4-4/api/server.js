const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(cors());
app.use(express.json());
const db = new sqlite3.Database('../db/employees.db');
// この演習の中心は、画面側のJavaScriptをモジュールに分割することです。
// APIは完成済みです。そのまま利用してください。
app.get('/api/employees', (req, res) => {
    db.all('SELECT * FROM employee ORDER BY id', [], (error, rows) => {
        if (error) return res.status(500).json({
            error: error.message
        });
        res.json(rows);
    });
});
app.get('/api/employees/:id', (req, res) => {
    db.get('SELECT * FROM employee WHERE id = ?', [req.params.id], (error, row) => {
        if (error) return res.status(500).json({
            error: error.message
        });
        if (!row) return res.status(404).json({
            error: '社員情報が見つかりません。'
        });
        res.json(row);
    });
});
app.post('/api/employees', (req, res) => {
    const employee = req.body;
    db.run('INSERT INTO employee (id, password, name, salary, location_name, image_path) VALUES (?, ?, ?, ?, ?, ?)',
        [employee.id, employee.password, employee.name, employee.salary, employee
            .location_name, employee.image_path
        ],
        (error) => error ? res.status(500).json({
            error: error.message
        }) : res.status(201).json(employee));
});
app.put('/api/employees/:id', (req, res) => {
    const employee = req.body;
    db.run('UPDATE employee SET name = ?, salary = ?, location_name = ? WHERE id = ?',
        [employee.name, employee.salary, employee.location_name, req.params.id],
        (error) => error ? res.status(500).json({
            error: error.message
        }) : res.json({
            id: req.params.id,
            ...employee
        }));
});
app.delete('/api/employees/:id', (req, res) => {
    db.run('DELETE FROM employee WHERE id = ?', [req.params.id], (error) => {
        if (error) return res.status(500).json({
            error: error.message
        });
        res.status(204).end();
    });
});
app.listen(3005, () => console.log('API server: http://localhost:3005'));
