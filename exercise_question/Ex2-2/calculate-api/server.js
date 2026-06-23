const express = require('express');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());

// このAPIは演習の核心ではないため、完成済みです。2つの数値を受け取り、積と和をJSONで返します。
app.get('/calculate/:number1/:number2', (req, res) => {
    const number1 = Number(req.params.number1);
    const number2 = Number(req.params.number2);

    res.json({
        multiply: number1 * number2,
        sum: number1 + number2,
    });
});

app.listen(port, () => console.log(`calculate API: http://localhost:${port}`));
