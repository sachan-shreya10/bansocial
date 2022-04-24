const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.dsr = (req, res) => {
    const {diid,reportbtn ,deletebtn } = req.body;
    if (reportbtn) {
        db.query('UPDATE postssenior SET reports = reports + 1 WHERE id=?',[diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtsenior');
        })
    }
    else if(deletebtn){
        db.query('DELETE FROM postssenior WHERE id=?',[diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtsenior');
        })
    }
    else{
        db.query('UPDATE postssenior SET reports = ? WHERE id=?',[0,diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtsenior');
        })
    }
}