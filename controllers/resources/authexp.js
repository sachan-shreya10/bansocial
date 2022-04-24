const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.experiences = (req,res) => {
    expname=req.body.expname;
    company=req.body.company;
    res.redirect("/viewexp");
}
exports.viewexp = (req, res) => {
    let doc;
    let upPath;
    var imn;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("no files uploaded");
    }
    const { expname,company,fname } = req.body;
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
        db.query('INSERT INTO exp SET ?', { ename: expname, cname: company, fname: fname, link: imn, email:userEmail }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect("/viewexp");
            }
        });
    }
}


exports.exp_reports = (req, res) => {
    const {id,reportbtn,deletebtn} = req.body;
    if (reportbtn) {
        db.query('UPDATE exp SET reports = reports + 1 WHERE eid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                res.redirect("/viewexp");
        }
        })
    }
    else if(deletebtn){
        db.query('DELETE FROM exp WHERE eid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                res.redirect("/viewexp");
            }
        })
    }
    else{
        db.query('UPDATE exp SET reports = ? WHERE eid=?',[0,id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/viewexp');
        })
    }
}

exports.showe = (req, res) => {
    flage=req.body.option;
    res.redirect('/viewexp');
}