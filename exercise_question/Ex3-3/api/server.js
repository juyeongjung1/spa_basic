const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('../db/employees.db');
// 【演習3.3.1 手順1】GET /api/employeesを定義してください。
app._____(_____, (req, res) => {
    // 【手順2】employeeテーブルを全件検索するSQLを指定してください。
    let sql = _____;
    let params = [];
    // 【演習3.3.2 手順3】コメントアウトを外し、クエリパラメータkeywordを取得してください。
    // const keyword = _____;
    // 【手順4】コメントアウトを外し、keywordがある場合、氏名の部分一致検索へSQLとparamsを変更してください。
    // if (keyword) {
    //     sql = _____;
    //     params = [_____];
    // }
    // 【手順5】db.allで複数行を取得してください。
    db._____(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({
                error: 'Database error',
            });
            return;
        }
        // 【手順6】rowsをJSON形式で返してください。
        _____;
    });
});
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
