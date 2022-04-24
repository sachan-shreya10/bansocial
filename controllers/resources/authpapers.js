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
    branch=req.body.branch;
    year=req.body.year;
    res.redirect("/viewpapers");
}
exports.viewpapers = (req, res) => {
    let doc;
    let upPath;
    var imn;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("no files uploaded");
    }
    const {branch,year,fname} = req.body;
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
        db.query('INSERT INTO papers SET ?', { bname: branch, yname: year, fname: fname, link: imn, email:userEmail}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect("/viewpapers");
            }
        });
    }
}

exports.papers_reports = (req, res) => {
    const {id,reportbtn,deletebtn} = req.body;
    if (reportbtn) {
        db.query('UPDATE papers SET reports = reports + 1 WHERE pid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                res.redirect("/viewpapers");
        }
        })
    }
    else if(deletebtn){
        db.query('DELETE FROM papers WHERE pid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                res.redirect("/viewpapers");
            }
        })
    }
    else{
        db.query('UPDATE papers SET reports = ? WHERE pid=?',[0,id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/viewpapers');
        })
    }
}
exports.showp = (req, res) => {
    flagp=req.body.option;
    res.redirect('/viewpapers');
}

