const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload = require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})


exports.commrteacher = (req, res) => {
    // console.log("hello1")
    // console.log(req.body);
    const {pidd}=req.body;
    // console.log(pidd)
    db.query('SELECT * from commentteacher where did=? and pid is NULL ORDER BY id DESC', [pidd],(er, result) => {
        if (er) console.log(er);
        db.query('SELECT * from commentteacher where did=? and pid ORDER BY id DESC', [pidd],(er, resul) => {
            if (er) console.log(er);
        return res.render('repliesteacher', {
            result,resul
        });
    })
});
}