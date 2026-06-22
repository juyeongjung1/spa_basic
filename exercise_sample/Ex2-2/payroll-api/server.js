const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// :salaryで受け取った文字列をNumberで数値へ変換します。
// 控除率20%を計算し、給与・控除額・手取り見込額をJSONで返します。
app.get('/payroll/:salary', (req, res) => {
    const salary = Number(req.params.salary);
    const tax = Math.floor(salary * 0.2);
    res.json({
        salary: salary,
        tax: tax,
        net_salary: salary - tax
    });
});

app.listen(3003, () => console.log('payroll API: http://localhost:3003'));
