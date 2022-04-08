const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.dpr = (req, res) => {
    const {diid,reportbtn ,deletebtn } = req.body;
    if (reportbtn) {
        db.query('UPDATE postspeer SET reports = reports + 1 WHERE id=?',[diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtpeer');
        })
    }
    else{
        db.query('DELETE FROM postspeer WHERE id=?',[diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtpeer');
        })
    }
}