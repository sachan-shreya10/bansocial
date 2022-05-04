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

exports.register = (req, res) => {
    console.log(req.body);

    const { role, name, email, bid, password, cpassword, year, dept } = req.body;
    const cp = crypto.randomBytes(64).toString('hex');
    console.log(role);
    console.log(name);
    if (role == "teacher") {

        db.query('SELECT email FROM teacher WHERE email = ?', [email],async (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                message= 'Already registered';
                res.redirect("/login");
            }
            if (cpassword != password) {
                message= 'passwords do not match';
                res.redirect("/register");

            }
            var mailOptions = {
                from: ' "bansocial" <demo.shreya10@gmail.com>',
                to: email,
                subject: 'verify your email',
                html: `<h2> ${req.body.name}! Thanks for registering on our site </h2>
                <h4>Please verify your email to continue...</h4>
                <a href="http://${req.headers.host}/verify-email?token=${cp}">Verify your email</a>`
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Verification email is sent to your email account");
                }
            })
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query('INSERT INTO teacher SET ?', { name: name, email: email, password: hashedPassword, department: dept, emailToken: cp }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("check email2");
                    console.log(email);
                    message= "Verification code sent to your account";
                    res.redirect("/login");

                }
            });
        });
    }
    else {

        db.query('SELECT email FROM student WHERE email = ? or bid = ?', [email, bid],async (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                message= 'Already registered';
                res.redirect("/login");
            }
            console.log(cpassword)
            console.log(password)

            if (cpassword != password) {
                // return res.render('register', {
                //     message: 'passwords do not match'
                // });
                message= 'passwords do not match';
                res.redirect("/register");

            }

            var mailOptions = {
                from: ' "Verify your email" <demo.shreya10@gmail.com>',
                to: email,
                subject: 'bansocial',
                html: `<h2> ${req.body.name}! Thanks for registering on our site BanSocial</h2>
            <h4>Please verify your email to continue...</h4>
            <a href="http://${req.headers.host}/verify-email?token=${cp}">Verify your email</a>`
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Verification email is sent to your gmail account");
                }
            })

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
            
            db.query('INSERT INTO student SET ?', { name: name, email: email, bid: bid, password: hashedPassword, year: year, department: dept, emailToken: cp }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // return res.render('register', {
                    //     message: "verification email is sent to your account"
                    // });
                    message= "verification email is sent to your account";
                    res.redirect('/login');

                }
            });
        });
    }
};