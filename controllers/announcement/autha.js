const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.ann = (req, res) => {
    let pics;
    let upPath;
    var imn;
    if(!req.files || Object.keys(req.files).length===0){
        console.log("no files uploaded")
    }
    else{
    pics= req.files.pic;
    console.log(pics)
    upPath = './ann_uploads/'+pics.name;
    imn=pics.name;
    pics.mv(upPath, function(err){
        if(err){
            console.log(err)
        }
    })
}
    console.log(req.body);
    console.log(imn)
    const email = userEmail;
    const name = userName;
    const { title,textt} = req.body;
    if (textt != "") {
        db.query('INSERT INTO announcement SET ?', { email: email, name:name, title: title ,des: textt, img:imn}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                res.redirect('/ann');
            }
        });
    }
}