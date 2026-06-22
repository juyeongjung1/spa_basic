const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// このAPIは演習の核心ではないため完成済みです。控除率は20%とします。
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
