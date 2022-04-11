const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var session = require("express-session");
const { redirect } = require("express/lib/response");

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
                                userName, result, resul, resul2, resul3, topic: "Doubts", student: "student"
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
        db.query('SELECT * from announcement where reports =? ORDER BY id DESC', [0], (er, resul) => {
            if (er) console.log(er);
            return res.render('ann', {
                resul, userName, userEmail
            });
        })
    }
    else {
        res.redirect("/");
    }
});
/*************************************JOURNEY PAGE********************************** */
router.get('/journey', (req, res) => {
    if (req.session.userId) {
        db.query('SELECT * from journey where reports =? ORDER BY id DESC', [0], (er, resul) => {
            if (er) console.log(er);
            return res.render('journey', {
                resul, userName, userEmail
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
    if (req.session.userId) {
        res.render('doubtini', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});
router.get('/doubtpeer', (req, res) => {
    if (req.session.userId) {
        if (role == "teacher") {
            res.render('msg');
        }
        else {
            if (tags == "ALL") {
                db.query('SELECT * from postspeer WHERE reports=? ORDER BY id DESC', [0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtpeer', {
                        resul, userName, userEmail
                    });
                })
            }
            else {
                db.query('SELECT * from postspeer WHERE tag = ? AND reports=?  ORDER BY id DESC', [tags, 0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtpeer', {
                        resul, userName, userEmail
                    });
                })
            }
        }
    }
    else {
        res.redirect("/");
    }
});
router.get('/repliespeer', (req, res) => {
    if (req.session.userId) {
        res.render('repliespeer');
    }
    else {
        res.redirect("/");
    }
});
router.get('/sortpeer', (req, res) => {
    if (req.session.userId) {
        res.render('sortpeer', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});



router.get('/doubtsenior', (req, res) => {
    if (req.session.userId) {
        if (role == "teacher") {
            res.render('msg');
        }
        else {
            if (tagsS == "ALL") {
                db.query('SELECT * from postssenior WHERE reports =? ORDER BY id DESC', [0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtsenior', {
                        resul, userName, userEmail
                    });
                })
            }
            else {
                db.query('SELECT * from postssenior WHERE tag = ? AND reports=? ORDER BY id DESC', [tagsS, 0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtsenior', {
                        resul, userName, userEmail
                    });
                })
            }
        }
    }
    else {
        res.redirect('/');
    }
});
router.get('/repliessenior', (req, res) => {
    if (req.session.userId) {
        res.render('repliessenior');
    }
    else {
        res.redirect("/");
    }
});
router.get('/sortsenior', (req, res) => {
    if (req.session.userId) {
        res.render('sortsenior', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});



router.get('/doubtteacher', (req, res) => {
    if (req.session.userId) {
        if (tagsT == "ALL") {
            db.query('SELECT * from poststeacher WHERE reports=? ORDER BY id DESC', [0], (er, resul) => {
                if (er) console.log(er);
                return res.render('doubtteacher', {
                    resul, userName, userEmail
                });
            })
        }
        else {
            db.query('SELECT * from poststeacher WHERE tag = ? AND reports=? ORDER BY id DESC', [tagsT, 0], (er, resul) => {
                if (er) console.log(er);
                return res.render('doubtteacher', {
                    resul, userName, userEmail
                });
            })
        }
    }
    else {
        res.redirect("/");
    }
})
router.get('/repliesteacher', (req, res) => {
    if (req.session.userId) {
        res.render('repliesteacher');
    }
    else {
        res.redirect("/");
    }
});
router.get('/sortteacher', (req, res) => {
    if (req.session.userId) {
        res.render('sortteacher', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});

router.get('/msg', (req, res) => {
    if (req.session.userId) {
        res.render('msg');
    }
    else {
        res.redirect("/");
    }
});

router.get('/verify-email', (req, res) => {
    const token = req.query.token;
    db.query('SELECT email FROM teacher WHERE emailToken=?', [token], (error, results) => {
        if (error) {
            console.log(error);
            console.log("Email is not verified");
        }
        else if (results.length > 0) {
            const email = results[0].email;
            console.log(email);
            console.log(email);
            db.query('UPDATE teacher SET emailToken=? , isVerified=? where email=?', [null, 1, email], (err, ress) => {
                if (err) {
                    console.log(err);
                }
                return res.render('login', {
                    message: 'successfully registered'
                });

            }
            )
        }
        else {
            db.query('SELECT email FROM student WHERE emailToken=?', [token], (error, resultss) => {
                if (error) {
                    console.log(error);
                    console.log("Email is not verified");
                }
                else {
                    const email = resultss[0].email;
                    console.log(email);
                    db.query('UPDATE student SET emailToken=? , isVerified=? where email=?', [null, 1, email], (err, ress) => {
                        if (err) {
                            console.log(err);
                        }
                        return res.render('login', {
                            message: 'successfully registered'
                        });

                    })
                }
            })
        }
    })
})

/********************************RESOURCE PAGE****************************************** */

router.get('/resources', (req, res) => {
    if (req.session.userId) {
        res.render('resources', {
            userName
        });
    }
    else {
        res.redirect('/');
    }
});

router.get('/notes', (req, res) => {
    if (req.session.userId) {
        res.render('notes', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});

router.get('/experiences', (req, res) => {
    if (req.session.userId) {
        res.render('experiences', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});

router.get('/papers', (req, res) => {
    if (req.session.userId) {
        res.render('papers', {
            userName
        });
    }
    else {
        res.redirect("/");
    }
});

//*****************************************FOR NOTES****************************** */
router.get('/viewnotes', (req, res) => {
    if (req.session.userId) {
        const { subject } = req.body;
        db.query('SELECT * from notes WHERE subname =? ORDER BY nid DESC', [subject], (er, resul) => {
            if (er) console.log(er);
            return res.render('viewnotes', {
                resul, subject, userName
            });
        });
    }
    else {
        res.redirect("/");
    }
});
//*****************************************FOR EXPERIENCES****************************** */
router.get('/viewexp', (req, res) => {
    if (req.session.userId) {
        const { expname, company } = req.body;
        db.query('SELECT * from exp WHERE ename =? and cname=? ORDER BY eid DESC', [expname, company], (er, resul) => {
            if (er) console.log(er);
            return res.render('viewexp', {
                resul, expname, company, userName
            });
        });
    }
    else {
        res.redirect("/");
    }
});

//*****************************************PAPERS****************************** */
router.get('/viewpapers', (req, res) => {
    if (req.session.userId) {
        const { expname, company } = req.body;
        db.query('SELECT * from papers WHERE bname =? and yname=? ORDER BY pid DESC', [branch, year], (er, resul) => {
            if (er) console.log(er);
            return res.render('viewexp', {
                resul, branch, year, userName
            });
        });
    }
    else {
        res.redirect("/");
    }
});

module.exports = router;