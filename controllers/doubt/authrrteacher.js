const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload = require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.rrteacher = (req, res) => {
    console.log(req.body);
    // const name="Tanu2";
    const {did, pid,contentr} = req.body;
    console.log(pid)
        db.query('INSERT INTO commentteacher SET ?', { did:did,content:contentr,pid:pid, name: userName,email:userEmail}, (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
            //     db.query('SELECT * from commentteacher where did=? and pid is NULL ORDER BY id DESC', [did],(er, result) => {
            //         if (er) console.log(er);
            //         db.query('SELECT * from commentteacher where pid and did=? ORDER BY id DESC', [did],(er, resul) => {
            //         return res.render('repliesteacher', {
            //             result,resul
            //         });
            //     })
            // });
            pidd=did;
            res.redirect('/repliesteacher');
            }
        });
}