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
    console.log(req.body);
    const {expname,company } = req.body;
    db.query('SELECT * from exp WHERE ename =? and cname=? ORDER BY eid DESC',[expname,company], (er, resul) => {
        if (er) console.log(er);
        return res.render('viewexp', {
            resul, expname,company,userName,userEmail
        });
    })
}
exports.viewexp = (req, res) => {
    let doc;
    let upPath;
    var imn;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("no files uploaded");
    }
    const { expname,company } = req.body;
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
        db.query('INSERT INTO exp SET ?', { ename: expname, cname: company, fname: name, link: imn, email:userEmail }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                db.query('SELECT * from exp WHERE ename =? and cname=? ORDER BY eid DESC',[expname,company], (er, resul) => {
                    if (er)
                        console.log(er);
                    return res.render('viewexp', {
                        resul,expname,company,userName,userEmail
                    });
                });
            }
        });
    }
}


exports.exp_reports = (req, res) => {
    const {id,reportbtn,deletebtn,expname,company} = req.body;
    if (reportbtn) {
        db.query('UPDATE exp SET reports = reports + 1 WHERE eid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                db.query('SELECT * from exp WHERE ename =? and cname=? AND reports=? ORDER BY eid DESC', [expname, company,0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('viewexp', {
                        resul, expname, company, userName,userEmail
                    });
                });
        }
        })
    }
    else if(deletebtn){
        db.query('DELETE FROM exp WHERE eid=?',[id], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else{
                db.query('SELECT * from exp WHERE ename =? and cname=? AND reports=? ORDER BY eid DESC', [expname, company,0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('viewexp', {
                        resul, expname, company, userName,userEmail
                    });
                });
            }
        })
    }
}

