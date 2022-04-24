const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const async = require("hbs/lib/async");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'demo.shreya10@gmail.com',
        pass: '12@#qw45'
    },
    tls: {
        rejectUnauthorized: false
    }
})

exports.for = (req, res) => {
    const { email } = req.body;
    console.log(email);
    const cp = crypto.randomBytes(64).toString('hex');
    db.query('SELECT email FROM student WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            db.query('UPDATE student set emailToken=?  WHERE email = ?', [cp,email], async (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
            var mailOptions = {
                from: ' "bansocial" <demo.shreya10@gmail.com>',
                to: email,
                subject: 'Reset Password',
                html: ` <h4>Please click this link to continue</h4>
                    <a href="http://${req.headers.host}/reset-password?email=${email}">Reset Password</a>`
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                // else {
                //     console.log("Check the email sent to the registered mail id");
                // }
            })

            // return res.render('login', {
            //     message: "Verification code sent to your account"
            // });
            message = "Verification code sent to your account";
            res.redirect("/");
        }
        else {
            db.query('SELECT email FROM teacher WHERE email = ?', [email], async (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length > 0) {
                    var mailOptions = {
                        from: ' "bansocial" <demo.shreya10@gmail.com>',
                        to: email,
                        subject: 'Reset Password',
                        html: ` <h4>Please click this link to continue</h4>
                            <a href="http://${req.headers.host}/reset-password?email=${email}">Reset Password</a>`
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        // else {
                        //     console.log("Check the email sent to the registered mail id");
                        // }
                    })
                    message = "Verification code sent to your account";
                    res.redirect("/");

                }
                else {
                    message = "Incorrect email address";
                    res.redirect("/");
                }

            });
        }
    });
}
    exports.editpass = async (req, res) => {
        const { password } = req.body;
        var hp;
        hp = await bcrypt.hash(password, 8);
        db.query('UPDATE student SET password = ? , emailToken =? WHERE email = ?', [hp,null, userEmail], (err, resul) => {
            if (err) {
                console.log(err);
            }
            userEmail="";
            message = 'password successfully changed';
            res.redirect('/');
        })
    }