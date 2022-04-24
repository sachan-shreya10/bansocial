const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bansocial'
})
exports.reply = (req, res) => {
    console.log(req.body);
   
    const { pid,des } = req.body;

    db.query('INSERT into hangout SET ?', { des: des, pid:pid, username: userName }, (error, results) => {
        if (error) {
            console.log(error);
        } 
        
        else {
        //     db.query('SELECT * FROM hangout WHERE pid is NULL',(error,comm)=>{
        //         if (error) {
        //             console.log(error);
        //         } 
            
        //     db.query('SELECT * FROM hangout WHERE pid=?',[pid], (error,replyy) => {
        //         if (error) {
        //             console.log(error);
        //         }
        //         console.log(replyy);
        //         return res.render('hangout', {
        //            comm,replyy,userName
        //         })

        //     });
        // });
        res.redirect('/hangout');
    }

    })
}