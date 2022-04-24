const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.journey = (req, res) => {
    let pics;
    let upPath;
    var imn;
    if(!req.files || Object.keys(req.files).length===0){
        console.log("no files uploaded")
    }
    else{
    pics= req.files.pic;
    console.log(pics);
    upPath = './journey_uploads/'+pics.name;
    imn=pics.name;
    pics.mv(upPath, function(err){
        if(err){
            console.log(err)
        }
    })
}
    // console.log(req.body);
    // console.log(imn)
    const email = userEmail;
    const name = userName;
    const {textt} = req.body;
    if (textt != "") {
        db.query('INSERT INTO journey SET ?', { name: name,descpp: textt, imgg:imn,email:email}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                // db.query('SELECT * from journey ORDER BY id DESC', (er, resul) => {
                //     if (er) console.log(er);
                //     return res.render('journey', {
                //         resul,userName,userEmail
                //     });
                // })
                res.redirect('/journey');
            }
        });
    }
}
exports.showj = (req, res) => {
    flagj=req.body.option;
    res.redirect('/journey');
}
