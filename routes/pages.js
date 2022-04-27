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
    res.render('login', {
        message
    });
});

/*************************************LOGOUT ********************************** */
router.get('/logout', function (req, res) {

    if (req.session.userId) {
        req.session.userId = "";
        message="";
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

router.get('/reset-password', (req, res) => {
    const email = req.query.email;
    userEmail = email;
    db.query('SELECT emailToken FROM student WHERE email=?', [email], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            if (results[0].emailToken) {
                res.redirect('/reset');
            }
            else {
                message = 'verification link expired';
                res.redirect("/");
            }

        }
        else {
            db.query('SELECT emailToken FROM teacher WHERE email', [email], (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length > 0) {
                    if (results[0].emailToken) {
                        res.redirect('/reset');
                    }
                    else {
                        message = 'verification link expired';
                        res.redirect("/");
                    }

                }
                else {
                    message = 'verification link expired';
                    res.redirect("/");
                }
            });
        }
    })
})
router.get('/reset', (req, res) => {
    // if (userEmail=="") {
    //     message = "verification link expired";
    //     res.redirect("/");
    // }
    // else {
    res.render('reset');
    //}
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
        console.log(flag);
        db.query('SELECT * from announcement where reports =? ORDER BY id DESC', [flag], (er, resul) => {
            if (er) console.log(er);
            // flag=0;
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
        if (role == "teacher") {
            res.render('msg');
        }
        else {
            db.query('SELECT * from journey where reports =? ORDER BY id DESC', [flagj], (er, resul) => {
                if (er) console.log(er);
                return res.render('journey', {
                    resul, userName, userEmail
                });
            })
        }
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
            if (role == "admin") {
                db.query('SELECT * from postspeer WHERE reports=? ORDER BY id DESC', [flagdp], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtpeer', {
                        resul, userName, userEmail
                    });
                })
            }
            else {
                console.log(tags);
                if (tags != 'ALL') {
                    db.query('SELECT * from postspeer WHERE tag = ? AND reports=?  ORDER BY id DESC', [tags, 0], (er, resul) => {
                        if (er) console.log(er);
                        return res.render('doubtpeer', {
                            resul, userName, userEmail
                        });
                    })
                }
                else {
                    db.query('SELECT * from postspeer WHERE reports=?  ORDER BY id DESC', [0], (er, resul) => {
                        if (er) console.log(er);
                        return res.render('doubtpeer', {
                            resul, userName, userEmail
                        });
                    })
                }
            }
        }
    }
    else {
        res.redirect("/");
    }
});
router.get('/repliespeer', (req, res) => {
    if (req.session.userId) {
        // res.render('repliespeer');
        db.query('SELECT * from commentpeer where did=? and pid is NULL ORDER BY id DESC', [pidd], (er, result) => {
            if (er) console.log(er);
            db.query('SELECT * from commentpeer where did=? and pid ORDER BY id DESC', [pidd], (er, resul) => {
                if (er) console.log(er);
                return res.render('repliespeer', {
                    result, resul
                });
            })
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
            if (role == "admin") {
                db.query('SELECT * from postssenior WHERE reports =? ORDER BY id DESC', [flagds], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtsenior', {
                        resul, userName, userEmail
                    });
                })
            }
            else {
                if (tagsS != 'ALL') {
                    db.query('SELECT * from postssenior WHERE tag = ? AND reports=? ORDER BY id DESC', [tagsS, 0], (er, resul) => {
                        if (er) console.log(er);
                        return res.render('doubtsenior', {
                            resul, userName, userEmail
                        });
                    })
                }
                else {
                    db.query('SELECT * from postssenior WHERE reports=?  ORDER BY id DESC', [0], (er, resul) => {
                        if (er) console.log(er);
                        return res.render('doubtsenior', {
                            resul, userName, userEmail
                        });
                    })
                }
            }
        }
    }
    else {
        res.redirect('/');
    }
});
router.get('/repliessenior', (req, res) => {
    if (req.session.userId) {
        // res.render('repliessenior');
        db.query('SELECT * from commentsenior where did=? and pid is NULL ORDER BY id DESC', [pidd], (er, result) => {
            if (er) console.log(er);
            db.query('SELECT * from commentsenior where did=? and pid ORDER BY id DESC', [pidd], (er, resul) => {
                if (er) console.log(er);
                return res.render('repliessenior', {
                    result, resul
                });
            })
        });
    }
    else {
        res.redirect("/");
    }
});


router.get('/doubtteacher', (req, res) => {
    if (req.session.userId) {
        if (role == "admin") {
            db.query('SELECT * from poststeacher WHERE reports=? ORDER BY id DESC', [flagdt], (er, resul) => {
                if (er) console.log(er);
                return res.render('doubtteacher', {
                    resul, userName, userEmail
                });
            })
        }
        else {
            if (tagsT != 'ALL') {
                db.query('SELECT * from poststeacher WHERE tag = ? AND reports=? ORDER BY id DESC', [tagsT, 0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtteacher', {
                        resul, userName, userEmail
                    });
                })
            }
            else {
                db.query('SELECT * from poststeacher WHERE reports=?  ORDER BY id DESC', [0], (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtteacher', {
                        resul, userName, userEmail
                    });
                })
            }
        }
    }
    else {
        res.redirect("/");
    }
})
router.get('/repliesteacher', (req, res) => {
    if (req.session.userId) {
        // res.render('repliesteacher');
        db.query('SELECT * from commentteacher where did=? and pid is NULL ORDER BY id DESC', [pidd], (er, result) => {
            if (er) console.log(er);
            db.query('SELECT * from commentteacher where did=? and pid ORDER BY id DESC', [pidd], (er, resul) => {
                if (er) console.log(er);
                return res.render('repliesteacher', {
                    result, resul
                });
            })
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
        // const { subject } = req.body;
        db.query('SELECT * from notes WHERE subname =? AND reports=? ORDER BY nid DESC', [subject, flagn], (er, resul) => {
            if (er) console.log(er);
            return res.render('viewnotes', {
                resul, subject, userName, userEmail
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
        db.query('SELECT * from exp WHERE ename =? AND cname=? AND reports=? ORDER BY eid DESC', [expname, company, flage], (er, resul) => {
            if (er) console.log(er);
            return res.render('viewexp', {
                resul, expname, company, userName, userEmail
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
        // const { expname, company } = req.body;
        db.query('SELECT * from papers WHERE bname =? AND yname=? AND reports=? ORDER BY pid DESC', [branch, year, flagp], (er, resul) => {
            if (er) console.log(er);
            return res.render('viewpapers', {
                resul, branch, year, userName, userEmail
            });
        });
    }
    else {
        res.redirect("/");
    }
});

/*************************************HANGOUT PAGE********************************** */

router.get('/hangout', (req, res) => {
    if (req.session.userId) {
        if (role == "teacher") {
            res.render('msg');
        }
        else {
            db.query('SELECT * from hangout WHERE pid is NULL AND reports = ? ORDER BY cid DESC', [flagh], (er, comm) => {
                db.query('SELECT * from hangout WHERE pid ORDER BY cid DESC', (er, replyy) => {
                    if (er) console.log(er);
                    // console.log(result)
                    return res.render('hangout', {
                        comm, replyy, userName, userEmail
                    });

                });
            });
        }
    }
    else {
        res.redirect("/");
    }
});

/*************************************Dashboard********************************** */

router.get('/dashboard', (req, res) => {
    if (req.session.userId) {
        user = 0;
        like = 0;
        postt = 0;
        report = 0;
        comment = 0;
        db.query('SELECT COUNT(*) as cs  FROM student; ', (er, result) => {
            if (er) console.log(er);
            user = user + result[0].cs;
        });
        db.query('SELECT COUNT(*) as ct  FROM teacher; ', (er, result) => {
            if (er) console.log(er);
            user = user + result[0].ct;
        });
        db.query('select sum(post.posts) as postt from(select count(*) as posts from postspeer UNION ALL select count(*)  as posts from postssenior UNION ALL select count(*)  as posts from poststeacher UNION ALL select count(*)  as posts from hangout UNION ALL select count(*)  as posts from journey UNION ALL select count(*)  as posts from announcement UNION ALL select count(*)  as posts from exp UNION ALL select count(*)  as posts from notes UNION ALL select count(*)  as posts from papers)post;', (er, result) => {
            if (er) console.log(er);
            postt = result[0].postt;
        });
        db.query('select sum(comm.c) as commen from(select count(*) as c from commentpeer UNION ALL select count(*)  as c from commentsenior UNION ALL select count(*)  as c from commentteacher UNION ALL select count(*)  as c from hangout WHERE pid)comm;', (er, result) => {
            if (er) console.log(er);
            comment = result[0].commen;
        });
        db.query('select sum(rep.repo) as report from(select sum(reports) as repo from postspeer UNION ALL select  sum(reports) as repo from postssenior UNION ALL select sum(reports) as repo from poststeacher UNION ALL select  sum(reports) as repo from hangout UNION ALL select  sum(reports) as repo from journey UNION ALL select  sum(reports) as repo from announcement UNION ALL select  sum(reports) as repo from exp UNION ALL select  sum(reports) as repo from notes UNION ALL select  sum(reports) as repo from papers)rep;', (er, result) => {
            if (er) console.log(er);
            report = result[0].report;
        });
        db.query('SELECT SUM(likes) as liket FROM hangout; ', (er, result) => {
            if (er) console.log(er);
            like = result[0].liket;
            res.render('dashboard', {
                user, postt, comment, like, report
            });
        });
    }
    else {
        res.redirect("/");
    }
});

module.exports = router;