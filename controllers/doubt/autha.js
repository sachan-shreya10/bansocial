const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.annpeer = (req, res) => {
    let pics;
    let upPath;
    var imn;
    if(!req.files || Object.keys(req.files).length===0){
        console.log("no files uploaded")
    }
    else{
    pics= req.files.pic;
    console.log(pics);
    upPath= "C:/Users/Shivangi/Desktop/webD/log_reg/bansocial/doubt_uploads/"+pics.name;
    imn=pics.name;
    pics.mv(upPath, function(err){
        if(err){
            console.log(err)
        }
    })
}
    // console.log(req.body);
    // console.log(imn)
    const name = "shreya";
    const { title,tag,textt} = req.body;
    if (textt != "") {
        db.query('INSERT INTO postspeer SET ?', { name: name, title: title ,tag:tag,des: textt, img:imn}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                db.query('SELECT * from postspeer ORDER BY id DESC', (er, resul) => {
                    if (er) console.log(er);
                    return res.render('doubtpeer', {
                        resul
                    });
                })
            }
        });
    }
}