const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.repo = (req, res) => {
    const {id,reportbtn,deletebtn } = req.body;
    if (reportbtn) {
        db.query('UPDATE hangout SET reports = reports + 1 WHERE cid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/hangout');
        })
    }
    else{
        db.query('DELETE FROM hangout WHERE cid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/hangout');
        })
    }
}