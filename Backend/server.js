const express = require ("express");
const app= express();
const  mysql = require('mysql');
const cors = require('cors');

app.use(cors());

app.use(express.json())
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

  app.post('/add',
  (req,res)=>{
    
    // const sql = "INSERT INTO crunch-time-report(`Date`,`Prod Patching`,`Disk Alerts`,`Site-JVM/reloads & restarts`,`UAT Patching`,`Dev OS Patching`,`Server Reboot`,`iserver-service restart`) VALUES(?)";
const values = [req?.body?.Date, req?.body?.ProdPatching, req?.body?.DiskAlerts, req?.body?.Site-JVM/reloads&restarts, req?.body?.UATPatching, req?.body?.DevOSPatching,req?.body?.ServerReboot,req?.body?.iserver-servicerestart];
 //const values= ['10-2-2023','12',"13",13,13,13,1,1]

 console.log("Testingggg",values)
  const sql='INSERT INTO `crunch-time-report` (`Date`, `Prod Patching`, `Disk Alerts`, `Site-JVM/reloads & restarts`, `UAT Patching`, `Dev OS Patching`, `Server Reboot`, `iserver-service restart`) VALUES(?)';

    // db.query(sql,(err,data)=>{
    //     if(err)
    //     return res.json(err);
    // else return res.json("Inserted")
    // })


    
    db.query(sql,
    [values],(err,data)=>{
        if(err)
        {console.log("body",req.body)
            return res.json(req.body);
            
        }
    else return res.json("Inserted")
    })

})