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
    const dt = new Date();
    let month= dt.getMonth()+1;
    
    if(month<10)
    {
        month='0'+month;
    }
    let pix= dt.getDate()+'-'+month+'-'+dt.getFullYear()+'_'+dt.getHours()+'-'+dt.getMinutes()+'-'+dt.getSeconds()+'-'+dt.getMilliseconds();

    upPath = './doubt_uploads/'+pics.name+'-'+pix;
    imn= pics.name+'-'+pix;
    
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
        db.query('INSERT INTO postspeer SET ?', { name: userName, title: title ,tag:tag,des: textt, img:imn, email:userEmail}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                tags="ALL";
                res.redirect('/doubtpeer');
            }
        });
    }
}
// exports.showdp = (req, res) => {
//     flagdp=req.body.option;

//     res.redirect('/ann');
// }