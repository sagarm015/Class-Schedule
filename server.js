const express = require('express');
const bodyParser= require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const db = mysql.createConnection({
  host : 'bckyqiee58uvgowyk9au-mysql.services.clever-cloud.com',
  user : 'ul6rj1zmtrzsua0y',
  password: 'hAxY70thgYmVnrE2fpd5',
  port: 3306,
  database: "bckyqiee58uvgowyk9au"
});

db.connect((err) => {
  if(err){
    throw err;
  }
  else{
    console.log("connected with my sql");
  }
});

app.get("/",function(req,res){
   let sql = "select * from classes";
     db.query(sql,(err,result) =>{

       if(!result.length){
         console.log(result);
         res.send("error");
       }
       else{
           console.log(result);
           res.render("home" , {record: result});
       }
     });

});
app.post("/add",function(req,res){
  let post = {teacher: req.body.teacher , dat:req.body.classdate, timing:req.body.timeofclass};
  let sql = "insert into classes set ?";
  db.query(sql,post, (err,result) =>{
    if(err){
      res.send("error");
    }
    else{
    //  alert("marks submited");
      res.redirect("/");
    }

  });
});
// app.get("/",function(req,res){
//   let sql  = "select * from students;";
//   db.query(sql,(err,result) =>{
//
//     if(!result.length){
//       console.log(result);
//       res.send("error");
//     }
//     else{
//         console.log(result);
//         res.render("show" , {record: result});
//     }
//   });
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("server started at port 3000");
});
