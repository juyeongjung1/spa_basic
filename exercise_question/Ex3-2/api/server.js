const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// 【手順1】Expressアプリを作成し、変数appへ代入してください。
const app = _____;
// 【手順2】JSON形式のリクエストボディを利用できるようにしてください。
_____
// 【手順3】別オリジンからの通信を許可してください。
_____
// 【手順4】apiフォルダの1つ外側にあるdb/employees.dbへ接続してください。
const db = new sqlite3.Database(_____);

// 動作確認APIは完成済みです。
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: '人事管理API稼働中' });
});

// 【手順5】ポート3005でサーバーを起動してください。
app.listen(_____, () => console.log('http://localhost:3005 で起動しました'));
