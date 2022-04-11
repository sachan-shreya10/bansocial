const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.papers = (req,res) => {
    console.log(req.body);
    const {branch,year } = req.body;
    db.query('SELECT * from papers WHERE bname =? and yname=? ORDER BY pid DESC',[branch,year], (er, resul) => {
        if (er) console.log(er);
        return res.render('viewpapers', {
            resul, branch,year
        });
    })
}
exports.viewpapers = (req, res) => {
    let doc;
    let upPath;
    var imn;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("no files uploaded");
    }
    const {branch,year } = req.body;
    doc = req.files.doc;
    console.log(doc);
    upPath = './resources_uploads/' + doc.name;
    imn = doc.name;
    doc.mv(upPath, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("File Uploaded");
        }
    });
    console.log(req.files.doc);
    console.log(imn);
    const { name, } = req.files.doc;
    if (name != "") {
        db.query('INSERT INTO papers SET ?', { bname: branch, yname: year, fname: name, link: imn }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                db.query('SELECT * from papers WHERE bname =? and yname=? ORDER BY pid DESC',[branch,year], (er, resul) => {
                    if (er)
                        console.log(er);
                    return res.render('viewpapers', {
                        resul,branch,year
                    });
                });
            }
        });
    }
}