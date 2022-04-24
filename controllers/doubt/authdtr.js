const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.dtr= (req, res) => {
    const {diid,reportbtn ,deletebtn } = req.body;
    if (reportbtn) {
        db.query('UPDATE poststeacher SET reports = reports + 1 WHERE id=?',[diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtteacher');
        })
    }
    else if(deletebtn){
        db.query('DELETE FROM poststeacher WHERE id=?',[diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtteacher');
        })
    }
    else{
        db.query('UPDATE poststeacher SET reports = ? WHERE id=?',[0,diid], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtteacher');
        })
    }
}