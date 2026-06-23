const express = require('express'),
    cors = require('cors'),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path');
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));
const db = new sqlite3.Database('../db/employees.db');
app.get('/api/employees', (req, res) =>
    db.all('SELECT * FROM employee', [], (e, rows) =>
        e
            ? res.status(500).json({
                  error: 'Database error',
              })
            : res.json(rows),
    ),
);
app.get('/api/employees/:id', (req, res) =>
    db.get('SELECT * FROM employee WHERE id=?', [req.params.id], (e, row) =>
        e
            ? res.status(500).json({
                  error: 'Database error',
              })
            : res.json(row),
    ),
);
app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
