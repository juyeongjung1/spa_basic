// ExpressはAPIルート、corsは別オリジン通信、sqlite3はDB操作に使用します。
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// express()でAPIアプリケーションを作成します。
const app = express();
// express.json()を登録すると、JSONのリクエストボディをreq.bodyで利用できます。
app.use(express.json());
// Live Serverなど別ポートのフロントエンドからの通信を許可します。
app.use(cors());
// server.jsはapiフォルダ内で起動するため、../dbで1つ上のdbを参照します。
const db = new sqlite3.Database('../db/employees.db');

app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: '人事管理API稼働中' });
});

app.listen(3005, () => console.log('http://localhost:3005 で起動しました'));
