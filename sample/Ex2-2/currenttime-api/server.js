const express = require('express');
const cors = require('cors');

const app = express(); //Expressアプリケーションの作成
const port = 3002; //サーバーがリッスンするポート番号

app.use(cors()); //CORSを有効にして、フロントエンドからのリクエストを許可する

app.get('/currenttime', (req, res) => {
  const now = new Date(); //日付オブジェクトを作成

  res.json({ //現在の日時を日本語形式で返す
    //例: "2024/6/1 12:34:56"
    time: now.toLocaleString('ja-JP')
  });
});

app.listen(port, () => {
  console.log(`Current time API is running at http://localhost:${port}`);
});
