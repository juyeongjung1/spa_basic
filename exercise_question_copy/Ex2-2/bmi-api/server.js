const express = require('express');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// このAPIは演習の核心ではないため、完成済みです。POSTされた身長(cm)と体重(kg)からBMIと判定をJSONで返します。
app.post('/bmi', (req, res) => {
    const height = Number(req.body.height);
    const weight = Number(req.body.weight);
    const heightMeter = height / 100;
    const bmi = Math.round((weight / (heightMeter * heightMeter)) * 10) / 10;
    let category = '普通体重';

    if (bmi < 18.5) {
        category = '低体重';
    } else if (bmi >= 25) {
        category = '肥満';
    }

    res.json({
        height: height,
        weight: weight,
        bmi: bmi,
        category: category,
    });
});

app.listen(port, () => console.log(`BMI API: http://localhost:${port}`));
