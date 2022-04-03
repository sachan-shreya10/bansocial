const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.comm1 = (req, res) => {
    console.log(req.body);
    // const name="Tanu";
    const {pid,contentr} = req.body;
    console.log(pid)
        db.query('INSERT INTO commentpeer SET ?', { content:contentr,did:pid, name: userName,email:userEmail}, (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/doubtpeer');
        });
}