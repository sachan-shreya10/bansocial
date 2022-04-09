
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * from student WHERE email = ? and password = ?  ', [email,password], (err, result) => {
        if (err) {
            console.log(err);
        }
        db.query('SELECT * from teacher WHERE email = ? and password = ? ', [email,password], (err, resul) => {
            if (err) {
                console.log(err);
            }
            else {

                if (resul.length > 0 && resul[0].isVerified==1) {
                    userName=resul[0].name;
                    userEmail=resul[0].email;
                    role="teacher";
                    req.session.userId=userName;
                    res.redirect('/home');
                }
                else if (result.length > 0  && result[0].isVerified==1) {
                    userName=result[0].name;
                    userEmail=result[0].email;
                    role="student";
                    req.session.userId=userName;
                    res.redirect('/home');
                }
                
                else {
                    return res.render('login', {
                        message: "incorrect details"
                    });
                }
            }
        });
    });
}