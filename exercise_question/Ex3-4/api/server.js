const express=require('express'),cors=require('cors'),sqlite3=require('sqlite3').verbose();
const app=express(); app.use(express.json()); app.use(cors());
const db=new sqlite3.Database('../db/employees.db');

// 【手順1】POST /api/employeesを定義してください。
app._____(_____, (req,res)=>{
    // 【手順2】req.bodyから5項目を取得してください。
    const { _____ } = req.body;
    // 【手順3】必須3項目がなければ400を返してください。
    _____
    // 【手順4】employeeテーブルへ登録するSQLとparamsを作成してください。
    const sql=_____;
    const params=_____;
    // 【手順5】db.runでINSERTし、成功後に全件を取得して返してください。
    db._____(sql,params,(err)=>{
        if(err){res.status(500).json({error:'Database error'});return;}
        db._____('SELECT * FROM employee',[],(err,rows)=>{
            if(err){res.status(500).json({error:'Database error'});return;}
            _____
        });
    });
});
app.listen(3005,()=>console.log('http://localhost:3005 で起動しました'));
