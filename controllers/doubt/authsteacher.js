const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload = require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.sorttteacher = (req, res) => {
    const { tag } = req.body;
    // console.log("hello1")
    // console.log(req.body);
    // const {tag}=req.body;
    // // console.log(pidd)
    // db.query('SELECT * from poststeacher WHERE tag = ? ORDER BY id DESC',[tag], (er, result) => {
    //     if (er) console.log(er);
    //     return res.render('sortteacher', {
    //         result,userName
    //     });
    // })
    tagsT=tag;
    res.redirect('/doubtteacher');
}