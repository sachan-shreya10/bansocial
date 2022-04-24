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
    subject=req.body.subject;
    res.redirect('/viewnotes');
}
exports.viewnotes = (req, res) => {
    let doc;
    let upPath;
    var imn;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("no files uploaded");
    }
    const { subject,fname } = req.body;
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
    if (doc != "") {
        db.query('INSERT INTO notes SET ?', { subname: subject, name: fname, link: imn, email:userEmail }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/viewnotes');
            }
        });
    }
}

exports.notes_reports = (req, res) => {
    const {id,reportbtn,deletebtn} = req.body;
    console.log(subject);
    if (reportbtn) {
        db.query('UPDATE notes SET reports = reports + 1 WHERE nid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                res.redirect('/viewnotes');
        }
        })
    }
    else if(deletebtn){
        db.query('DELETE FROM notes WHERE nid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                    res.redirect('/viewnotes');
            }
        })
    }
    else{
        db.query('UPDATE notes SET reports = ? WHERE nid=?',[0,id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/viewnotes');
        })
    }
}
exports.shown = (req, res) => {
    flagn=req.body.option;
    res.redirect('/viewnotes');
}
