const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//UTIL
const fs = require('fs');
const path = require('path');
const ip = require('./util/interfaceNetWork');

//CONFIG
let file = path.join(__dirname,'files/info.json');
let PORT=8000;
let HOST=`http://${ip.myIp()}`;

app.get('/',( req,res) =>{
    fs.readFile(file, {encoding:'utf-8'},(err, data) =>{
      if(!err){
        res.send(data);
      }else{
        console.log(err);
      }    
    });
    
});

app.post('/info',(req,res) =>{
    let writeFile = JSON.stringify(req.body);
    console.log(writeFile);

    fs.appendFile(file, writeFile+'\n', (erro) =>{
        if(erro){
            return res.send(erro);
        }
    })
    
    res.send(writeFile);
});

app.listen(PORT);
console.log("Start server",`${HOST}:${PORT}`);
