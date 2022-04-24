const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})

exports.sortt = (req, res) => {
    const { tag } = req.body;
    if (tag == 0 || tag == 1) {
        console.log("hello"+tag);
        flagdp = tag;
    }
    else {
        tags = tag;
    }
    res.redirect('/doubtpeer');
}