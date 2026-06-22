const express=require('express'),cors=require('cors'),sqlite3=require('sqlite3').verbose();const app=express();app.use(express.json());app.use(cors());const db=new sqlite3.Database('../db/employees.db');
app.get('/api/employees',(req,res)=>db.all('SELECT * FROM employee',[],(err,rows)=>{if(err){res.status(500).json({error:'Database error'});return;}res.json(rows);}));
app.get('/api/employees/:id',(req,res)=>{
    const id=req.params.id;
    // db.getは1行だけをrowとして取得する場合に使います。
    db.get('SELECT * FROM employee WHERE id = ?',[id],(err,row)=>{
        if(err){res.status(500).json({error:'Database error'});return;}
        if(!row){res.status(404).json({error:'社員が見つかりません'});return;}
        res.json(row);
    });
});
app.listen(3005,()=>console.log('http://localhost:3005 で起動しました'));
