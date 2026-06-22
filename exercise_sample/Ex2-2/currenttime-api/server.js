const express = require('express');
const cors = require('cors');
const app = express();
// Live Serverなど別のオリジンから呼び出せるようCORSを許可します。
app.use(cors());
// 現在時刻をJSON形式で返します。フロントエンドはdata.timeで利用します。
app.get('/currenttime', (req, res) => {
    res.json({
        time: new Date().toLocaleString('ja-JP')
    });
});
app.listen(3002, () => console.log('currenttime API: http://localhost:3002'));
