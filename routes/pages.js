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
/*************************************LOGIN PAGE********************************** */
router.get('/', (req, res) => {
    res.render('login');
});

/*************************************LOGOUT ********************************** */
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
/*************************************REGISTER PAGE********************************** */

router.get('/register', (req, res) => {
    res.render('register');
});
/*************************************HOME PAGE********************************** */
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
/*************************************PROFILE PAGE********************************** */
router.get('/profile', (req, res) => {
    if (req.session.userId) {
        db.query('SELECT * FROM student WHERE email = ? ', [userEmail], (er, result) => {
            if (er) console.log(er);
            if (result.length > 0) {
                db.query('SELECT * FROM postspeer WHERE email = ? ORDER BY id DESC', [userEmail], (er, resul) => {
                    if (er) console.log(er);
                    db.query('SELECT * FROM postssenior WHERE email = ? ORDER BY id DESC', [userEmail], (er, resul2) => {
                        if (er) console.log(er);
                        db.query('SELECT * FROM poststeacher WHERE email = ? ORDER BY id DESC', [userEmail], (er, resul3) => {
                            if (er) console.log(er);
                            return res.render('profile', {
                                userName, result, resul,resul2,resul3, topic: "Doubts",student:"student"
                            });
                        });
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
/*************************************EDIT PROFILE PAGE********************************** */
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
/*************************************ANNOUNCEMENT PAGE********************************** */
router.get('/ann', (req, res) => {
    if (req.session.userId) {
        db.query('SELECT * from announcement ORDER BY id DESC', (er, resul) => {
            if (er) console.log(er);
            return res.render('ann', {
                resul, userName
            });
        })
    }
    else {
        res.redirect("/");
    }
});
/*************************************ABOUT US PAGE********************************** */
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

/*************************************DOUBT PAGE********************************** */
router.get('/doubtini', (req, res) => {
    res.render('doubtini');
});
router.get('/doubtpeer', (req, res) => {
    //  res.render('ann');
    if (role == "teacher") {
        res.render('msg');
    }
    else {
        db.query('SELECT * from postspeer ORDER BY id DESC', (er, resul) => {
            if (er) console.log(er);
            return res.render('doubtpeer', {
                resul, userName
            });
        })
    }
});
router.get('/repliespeer', (req, res) => {
    res.render('repliespeer');
});
router.get('/sortpeer', (req, res) => {
    res.render('sortpeer');
});



router.get('/doubtsenior', (req, res) => {
    //  res.render('ann');
    if (role == "teacher") {
        res.render('msg');
    }
    else {
        db.query('SELECT * from postssenior ORDER BY id DESC', (er, resul) => {
            if (er) console.log(er);
            return res.render('doubtsenior', {
                resul, userName
            });
        })
    }
});
router.get('/repliessenior', (req, res) => {
    res.render('repliessenior');
});
router.get('/sortsenior', (req, res) => {
    res.render('sortsenior');
});



router.get('/doubtteacher', (req, res) => {
    db.query('SELECT * from poststeacher ORDER BY id DESC', (er, resul) => {
        if (er) console.log(er);
        return res.render('doubtteacher', {
            resul, userName
        });
    })
});
router.get('/repliesteacher', (req, res) => {
    res.render('repliesteacher');
});
router.get('/sortteacher', (req, res) => {
    res.render('sortteacher');
});

router.get('/msg', (req, res) => {
    res.render('msg');
});
module.exports = router;