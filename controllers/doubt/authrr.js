const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload = require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.rr = (req, res) => {
    console.log(req.body);
    const name="Tanu2";
    const {did, pid,contentr} = req.body;
    console.log(pid)
    if (name != "") {
        db.query('INSERT INTO commentpeer SET ?', { did:did,content:contentr,pid:pid, name: name}, (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                db.query('SELECT * from commentpeer where did=? and pid is NULL ORDER BY id DESC', [did],(er, result) => {
                    if (er) console.log(er);
                    db.query('SELECT * from commentpeer where pid and did=? ORDER BY id DESC', [did],(er, resul) => {
                    return res.render('repliespeer', {
                        result,resul
                    });
                })
            });
            }
        });
    }
}