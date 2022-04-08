const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.autha2 = (req, res) => {
    const {aid,reportbtn ,deletebtn } = req.body;
    if (reportbtn) {
        db.query('UPDATE announcement SET reports = reports + 1 WHERE id=?',[aid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/ann');
        })
    }
    else{
        db.query('DELETE FROM announcement WHERE id=?',[aid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/ann');
        })
    }
}