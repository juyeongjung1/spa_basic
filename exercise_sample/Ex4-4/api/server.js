const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
// 別のポートで開くHTMLからAPIを呼び出せるようにします。
app.use(cors());
// POSTやPUTで送信されたJSONをreq.bodyから取得できるようにします。
app.use(express.json());
// URLを直接入力してもSPAを表示できるよう、1つ上のindex.htmlとjsフォルダを配信します。
app.use(express.static(path.join(__dirname, '..')));
const db = new sqlite3.Database('../db/employees.db');
// 社員一覧をID順で返します。
app.get('/api/employees', (req, res) => {
    db.all('SELECT * FROM employee ORDER BY id', [], (error, rows) => {
        if (error)
            return res.status(500).json({
                error: error.message,
            });
        res.json(rows);
    });
});
// URLの:id部分を検索条件として、社員1件を返します。
app.get('/api/employees/:id', (req, res) => {
    db.get('SELECT * FROM employee WHERE id = ?', [req.params.id], (error, row) => {
        if (error)
            return res.status(500).json({
                error: error.message,
            });
        if (!row)
            return res.status(404).json({
                error: '社員情報が見つかりません。',
            });
        res.json(row);
    });
});
// リクエスト本文の社員情報をemployeeテーブルへ追加します。
app.post('/api/employees', (req, res) => {
    const employee = req.body;
    db.run(
        'INSERT INTO employee (id, password, name, salary, location_name, image_path) VALUES (?, ?, ?, ?, ?, ?)',
        [
            employee.id,
            employee.password,
            employee.name,
            employee.salary,
            employee.location_name,
            employee.image_path,
        ],
        (error) =>
            error
                ? res.status(500).json({
                      error: error.message,
                  })
                : res.status(201).json(employee),
    );
});
// URLで指定された社員の氏名、給与、勤務地を更新します。
app.put('/api/employees/:id', (req, res) => {
    const employee = req.body;
    db.run(
        'UPDATE employee SET name = ?, salary = ?, location_name = ?, image_path = ? WHERE id = ?',
        [employee.name, employee.salary, employee.location_name, employee.image_path, req.params.id],
        (error) =>
            error
                ? res.status(500).json({
                      error: error.message,
                  })
                : res.json({
                      id: req.params.id,
                      ...employee,
                  }),
    );
});
// URLで指定された社員を1件削除します。
app.delete('/api/employees/:id', (req, res) => {
    db.run('DELETE FROM employee WHERE id = ?', [req.params.id], (error) => {
        if (error)
            return res.status(500).json({
                error: error.message,
            });
        res.status(204).end();
    });
});
// /employees/new のようなSPA用URLは、実ファイルではなくindex.htmlへ戻します。
app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));
app.listen(3005, () => console.log('API server: http://localhost:3005'));
