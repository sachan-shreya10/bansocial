const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload = require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.sorttsenior = (req, res) => {
    const { tag } = req.body;
    // console.log("hello1")
    // console.log(req.body);
    // const {tag}=req.body;
    // // console.log(pidd)
    // db.query('SELECT * from postssenior WHERE tag = ? ORDER BY id DESC',[tag], (er, result) => {
    //     if (er) console.log(er);
    //     return res.render('sortsenior', {
    //         result,userName
    //     });
    // })
    tagsS=tag;
    res.redirect('/doubtsenior');
}