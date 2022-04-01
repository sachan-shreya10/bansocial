const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var session = require("express-session");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
router.get('/', (req, res) => {
    res.render('login');
});


router.get('/logout', function (req, res) {

    if (req.session.userId) {
        req.session.userId = "";
        req.session.destroy(function (err) {
            if (err) return console.log(err);
            return res.redirect('/');
        });
    }
    else {
        res.redirect('/');
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/home', (req, res) => {
    if (req.session.userId) {
        res.render('home', {
            userName
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/profile', (req, res) => {
    if (req.session.userId) {
        db.query('SELECT * FROM student WHERE email = ? ', [userEmail], (er, result) => {
            if (er) console.log(er);
            if (result.length > 0) {
                db.query('SELECT * FROM announcement WHERE email = ? ORDER BY id DESC', [userEmail], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('profile', {
                        userName, result, resul, topic: "Doubts"
                    });
                });

            }
            else {
                db.query('SELECT * FROM teacher WHERE email = ? ', [userEmail], (er, result) => {
                    if (er) console.log(er);
                    db.query('SELECT * FROM announcement WHERE email = ? ORDER BY id DESC', [userEmail], (er, resul) => {
                        if (er) console.log(er);
                        return res.render('profile', {
                            userName, result, resul, topic: "Announcements"
                        });
                    });
                })
            }
        });
    }
    else {
        res.redirect("/");
    }
});
router.get('/editpro', (req, res) => {
    if (req.session.userId) {
        res.render('editpro', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});

router.get('/ann', (req, res) => {
    if (req.session.userId) {
        db.query('SELECT * from announcement ORDER BY id DESC', (er, resul) => {
            if (er) console.log(er);
            return res.render('ann', {
                resul
            });
        })
    }
    else {
        res.redirect("/");
    }
});

router.get('/aboutus', (req, res) => {
    if (req.session.userId) {
        res.render('aboutus', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});
module.exports = router;