const mysql = require("mysql");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.register = (req, res) => {
    console.log(req.body);

    const { role, name, email, bid,password, cpassword, year, dept } = req.body;
    console.log(role);
    console.log(name);
    if (role == "teacher") {
        db.query('SELECT email FROM teacher WHERE email = ?', [email], (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                return res.render('register', {
                    message: 'Already registered'
                });
            }
            if (cpassword != password) {
                return res.render('register', {
                    message: 'passwords do not match'
                });
            }
            db.query('INSERT INTO teacher SET ?', { name: name, email: email, password: password, department: dept }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.render('register', {
                        message: "registration successful"
                    });

                }
            });
        });
    }
    else {
        db.query('SELECT email FROM student WHERE email = ? or bid = ?', [email,bid], (err,result) => {
            if(err){
                console.log(err);
            }
            if(result.length > 0){
                return res.render('register',{
                    message: 'Already registered'
                });
            }
            console.log(cpassword)
            console.log(password)

            if(cpassword!=password){
                return res.render('register',{
                    message: 'passwords do not match'
                });
            }
        });
        db.query('INSERT INTO student SET ?', { name: name, email: email, bid: bid, password: password, year: year, department: dept }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.render('login', {
                    message: "registration successful"
                });

            }
        });
    }
};