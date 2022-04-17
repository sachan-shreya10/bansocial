const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload = require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})


exports.commrsenior = (req, res) => {
    //     const {pidd}=req.body;
    //     db.query('SELECT * from commentsenior where did=? and pid is NULL ORDER BY id DESC', [pidd],(er, result) => {
    //         if (er) console.log(er);
    //         db.query('SELECT * from commentsenior where did=? and pid ORDER BY id DESC', [pidd],(er, resul) => {
    //             if (er) console.log(er);
    //         return res.render('repliessenior', {
    //             result,resul
    //         });
    //     })
    // });
    pidd=req.body.pidd;
    res.redirect("/repliessenior")
}