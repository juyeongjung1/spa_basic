const express = require('express');
const cors = require('cors');

const app = express(); //Expressアプリケーションの作成
const port = 3003; //サーバーがリッスンするポート番号

app.use(cors()); //CORSを有効にして、フロントエンドからのリクエストを許可する

// 「/calculate/数値1/数値2」がリクエストされたときの処理
app.get('/calculate/:number1/:number2', (req, res) => {
  const number1 = Number(req.params.number1); //URLから1つ目の数値を取得
  const number2 = Number(req.params.number2); //URLから2つ目の数値を取得

  res.json({ //計算結果をJSON形式で返す
    multiply: number1 * number2,
    sum: number1 + number2
  });
});

app.listen(port, () => {
  console.log(`Calculate API is running at http://localhost:${port}`);
});
