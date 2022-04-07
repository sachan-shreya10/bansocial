const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.editpro = (req, res) => {
    console.log(req.body);
    let pics;
    let upPath;
    var imn="";
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("no files uploaded")
    }
    else {
        pics = req.files.pic;
        console.log(pics)
        upPath = "C:/Users/tsach/Desktop/log_reg/pro_pic_uploads/" + pics.name;
        imn = pics.name;
        pics.mv(upPath, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    const { nam, password, pic } = req.body;
    db.query('SELECT name FROM student WHERE email = ?', [userEmail], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(imn);
        console.log(password);
        console.log(userEmail);
        if (result.length > 0) {
            if (imn!="" && password!="") {
                db.query('UPDATE student SET pro_pic = ? , password = ? WHERE email = ?', [imn, password, userEmail], (err, resul) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/profile');
                })
            }
            else if (password!="") {
                db.query('UPDATE student SET password = ? WHERE email = ?', [password, userEmail], (err, resul) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/profile');
                })
            }
            else {
                db.query('UPDATE student SET pro_pic = ?  WHERE email = ?', [imn, userEmail], (err, resul) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/profile');
                })
            }

        }
        else {
            if (pic && password) {
                db.query('UPDATE teacher SET pro_pic = ? , password = ? WHERE name = ?', [imn, password, nam], (err, resul) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/profile');
                })
            }
            else if (password) {
                db.query('UPDATE teacher SET password = ? WHERE name = ?', [password, nam], (err, resul) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/profile');
                })
            }
            else {
                db.query('UPDATE teacher SET pro_pic = ?  WHERE name = ?', [imn, nam], (err, resul) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/profile');
                })
            }

        }
    })
}
