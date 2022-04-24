
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const async = require("hbs/lib/async");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.login = (req, res) => {
    const { email, password } = req.body;
    if (email == "demo.shreya10@gmail.com") {
        db.query('SELECT password FROM admin WHERE email = ?', [email], (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                if(result[0].password== password)
                {
                    role = "admin";
                    userEmail="demo.shreya10@gmail.com";
                    userName = "Admin";
                    req.session.userId = "Admin";
                    res.redirect('/home');
                }
                else {
                    return res.render('login', {
                        message: 'Incorrect Password'
                    });
                }
            }
        });
    }
    else {
        db.query('SELECT * from student WHERE email = ?', [email], (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0 && result[0].isVerified == 1) {
                console.log(result[0].password);
                bcrypt.compare(password, result[0].password, function (err, resul) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(resul);
                    if (resul) {
                        userName = result[0].name;
                        userEmail = result[0].email;
                        role = "student";
                        req.session.userId = userName;
                        res.redirect('/home');
                    } else {
                        return res.render('login', {
                            message: 'Incorrect Password'
                        });
                    }
                });
            }
            else {
                db.query('SELECT * from teacher WHERE email = ?', [email], (err, resul) => {
                    if (err) {
                        console.log(err);
                    }
                    if (resul.length > 0 && resul[0].isVerified == 1) {
                        bcrypt.compare(password, resul[0].password, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(result);
                            if (result) {
                                userName = resul[0].name;
                                userEmail = resul[0].email;
                                role = "teacher";
                                req.session.userId = userName;
                                res.redirect('/home');
                            } else {
                                return res.render('login', {
                                    message: 'Incorrect Password'
                                });
                            }
                        });
                    }
                    else {
                        return res.render('login', {
                            message: 'Incorrect email address'
                        });
                    }
                });
            }
        });
    }
}