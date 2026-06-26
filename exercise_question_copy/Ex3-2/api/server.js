const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
// 【確認1】Expressアプリが作成され、変数appへ代入されていることを確認してください。
const app = express();
// 【確認2】JSON形式のリクエストボディを利用できる設定を確認してください。
app.use(express.json());
// 【確認3】別オリジンからの通信を許可する設定を確認してください。
app.use(cors());
// 【確認4】apiフォルダの1つ外側にあるdb/employees.dbへ接続していることを確認してください。
const db = new sqlite3.Database('../db/employees.db');
// 動作確認APIは完成済みです。
app.get('/api/test', (req, res) => {
    res.json({
        status: 'ok',
        message: '人事管理API稼働中',
    });
});
// 【確認5】ポート3005でサーバーを起動していることを確認してください。
app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
