const express = require("express");
const app= express();
const  mysql = require('mysql');
const cors = require('cors');
app.use(express.json())
app.use(cors());


// app.use(bodyParser.json());


app.get('/',(req,res)=>{
    return res.json("From BE")
})
app.listen(8081,()=>{
    console.log('listeing')
})
const db = mysql.createPool({
    user            : 'admin',
    host            : 'crunch-time.crmeuqwsiwsg.eu-north-1.rds.amazonaws.com',
    password        : 'crunch-time-admin',
    database        : 'crunch-time-db',
  
  });
  app.get("/tasks",(req,res)=>{
    db.query("SELECT * FROM `crunch-time-report`",(err,result)=>{
        if(err){
            
            return result.json(err);
        } else {
            res.send(result);
          }
    })
})
  app.post('/add',
  (req,res)=>{
const values = [req.body.Date, req.body.ProdPatching, req.body.DiskAlerts, req.body.SiteJVMreloadsrestarts, req.body.UATPatching, req.body.DevOSPatching,req.body.ServerReboot,req.body.iserverservicerestart];
console.log("Values",values)
const sql='INSERT INTO `crunch-time-report` (`Date`, `prodpatching`, `diskalerts`, `sitejvmreloadsrestarts`, `uatpatching`, `devospatching`, `serverreboot`, `iserverservicerestart`) VALUES(?)';

    db.query(sql,
    [values],(err,data)=>{
        if(err)
        {
        console.log(err.message)
            return res.json(req.body);
            
        }
    else return res.json(data)
    })

})

app.get('/filterdata/:date', (req, res) => {
    

    const date = req.params.date; // Extract the date parameter
    const sql = "select * from `crunch-time-report` where `Date` >= date(DATE_SUB(?, INTERVAL WEEKDAY(?) DAY)) and `Date` <= DATE_ADD(?, INTERVAL 6 - WEEKDAY(?) DAY);";
 
    db.query(sql, 
     [date, date, date, date],
         (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

app.get('/filterdata/:month/:year', (req, res) => {
  
    const month = req.params.month;
    const year = req.params.year // Extract the date parameter
    const sql = "select * from `crunch-time-report` where MONTH(date) = ? and YEAR(Date)=?";
 
    db.query(sql, 
     [month,year],
         (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});