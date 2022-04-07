const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.sortt = (req, res) => {
    console.log("hello1")
    console.log(req.body);
    const { tag } = req.body;
    // if (tag == "ALL") {
    //     // db.query('SELECT * from postspeer ORDER BY id DESC', (er, resul) => {
    //     //     if (er) console.log(er);
    //     //     return res.render('doubtpeer', {
    //     //         resul, userName
    //     //     });
    //     // })
    //     res.redirect('/doubtpeer');
    // }
    // else {

    //     db.query('SELECT * from postspeer WHERE tag = ? ORDER BY id DESC', [tag], (er, resul) => {
    //         if (er) console.log(er);
    //         return res.render('doubtpeer', {
    //             resul, userName
    //         });
    //     })
    // }
    tags=tag;
    res.redirect('/doubtpeer');
}