const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// このAPIは演習の核心ではないため完成済みです。
app.get('/currenttime', (req, res) => {
    res.json({ time: new Date().toLocaleString('ja-JP') });
});

app.listen(3002, () => console.log('currenttime API: http://localhost:3002'));
