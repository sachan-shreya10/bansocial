const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const fileUpload=require('express-fileupload');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.hangout = (req, res) => {
    console.log(req.body);
    let pics;
    let upPath;
    var imn;
    if(!req.files || Object.keys(req.files).length===0){
        console.log("no files uploaded");
    }
    else{
    pics= req.files.pic;
    console.log(pics)
    upPath = './hangout_uploads/'+pics.name;
    imn=pics.name;
    pics.mv(upPath, function(err){
        if(err){
            console.log(err)
        }
    })
}
    
    const { des } = req.body;
    // const { name }="random user";
    const name = userName;
    const email = userEmail;

    db.query('INSERT into hangout SET ?', { des: des, username: name,img:imn,email:email}, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            // db.query('SELECT * FROM hangout WHERE pid is NULL AND reports = 0 ORDER BY cid DESC', (error, comm) => {
            //     if (error) {
            //         console.log(error);
            //     }
            //     console.log(results);
            //     return res.render('hangout', {
            //        comm,userName,userEmail
            //     })

            // });
            res.redirect('/hangout');
        }
    })

}
exports.showh = (req, res) => {
    flagh=req.body.option;
    res.redirect('/hangout');
}