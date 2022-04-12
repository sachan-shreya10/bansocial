const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.likes = (req, res) => {
    console.log(req.body);
    const { cid } = req.body;
        db.query('UPDATE hangout SET likes = likes + 1 WHERE cid=?',[cid], (err, comm) => {
            if (err) {
                console.log(err);
            }
            // res.redirect('/');
        });
}