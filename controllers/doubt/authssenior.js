const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload = require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.sorttsenior = (req, res) => {
    const { tag } = req.body;
    if (tag == 0 || tag == 1) {
        console.log("hello"+tag);
        flagds = tag;
    }
    else {
        tagsS = tag;
    }
    res.redirect('/doubtsenior');
}