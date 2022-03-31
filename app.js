const express = require("express");
const mysql = require("mysql");
const app = express();
const path=require("path");
const fileUpload=require('express-fileupload');
var session= require("express-session");
app.set('view engine','hbs');
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
app.use(fileUpload());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
const publicDirectory1 = path.join(__dirname, './pro_pic_uploads');
app.use(express.static(publicDirectory1));
const publicDirectory2 = path.join(__dirname, './ann_uploads');
app.use(express.static(publicDirectory2));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
db.connect( (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("mysql connected");
    }
})
global.userName="";
global.userEmail="";
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.listen(3002, ()=>{
    console.log("started")
});
