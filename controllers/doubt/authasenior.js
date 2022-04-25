const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.annsenior = (req, res) => {
    let pics;
    let upPath;
    var imn;
    if(!req.files || Object.keys(req.files).length===0){
        console.log("no files uploaded")
    }
    else{
    pics= req.files.pic;
    console.log(pics)
    upPath = './doubt_uploads/'+pics.name;
    imn=pics.name;
    pics.mv(upPath, function(err){
        if(err){
            console.log(err)
        }
    })
}
    // console.log(req.body);
    // console.log(imn)
    // const name = "shreya";
    const { title,tag,textt} = req.body;
    if (textt != "") {
        db.query('INSERT INTO postssenior SET ?', { name: userName, title: title ,tag:tag,des: textt, img:imn, email:userEmail}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                tagsS="ALL";
                res.redirect('/doubtsenior');
            }
        });
    }
}