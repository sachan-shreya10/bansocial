const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.notes = (req,res) => {
    console.log(req.body);
    const { subject } = req.body;
    db.query('SELECT * from notes WHERE subname=? AND reports=? ORDER BY nid DESC',[subject,0], (er, resul) => {
        if (er) console.log(er);
        return res.render('viewnotes', {
            resul, subject,userName,userEmail
        });
    })
}
exports.viewnotes = (req, res) => {
    let doc;
    let upPath;
    var imn;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("no files uploaded");
    }
    const { subject } = req.body;
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
    const { name } = req.files.doc;
    if (name != "") {
        db.query('INSERT INTO notes SET ?', { subname: subject, name: name, link: imn, email:userEmail }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                db.query('SELECT * from notes WHERE subname = ? AND reports=? ORDER BY nid DESC',[subject,0], (er, resul) => {
                    if (er)
                        console.log(er);
                    return res.render('viewnotes', {
                        resul,subject,userName,userEmail
                    });
                });
            }
        });
    }
}

exports.notes_reports = (req, res) => {
    const {id,reportbtn,deletebtn,subject } = req.body;
    console.log(subject);
    if (reportbtn) {
        db.query('UPDATE notes SET reports = reports + 1 WHERE nid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/viewnotes',{
                subject,userName,userEmail
            });
        })
    }
    else if(deletebtn){
        db.query('DELETE FROM notes WHERE nid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                    db.query('SELECT * from notes WHERE subname = ? AND reports=? ORDER BY nid DESC',[subject,0], (er, resul) => {
                        if (er)
                            console.log(er);
                        return res.render('viewnotes', {
                            resul,subject,userName,userEmail
                        });
                    });
            }
        })
    }
}

