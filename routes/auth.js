const express = require("express");
const authController = require('../controllers/LogReg/authr');
const authController2 = require('../controllers/LogReg/authl');
const authController3 = require('../controllers/profile/authp');
const authController4 = require('../controllers/announcement/autha');
const authController20 = require('../controllers/announcement/autha2');
const authController24 = require('../controllers/journey/journey');
const authController25 = require('../controllers/journey/authjj');
const router = express.Router();


/****************************************DOUBT PAGE CONTROLLERS************************************** */
//peer
const authController5 = require('../controllers/doubt/autha');
const authController6 = require('../controllers/doubt/authc1');
const authController7 = require('../controllers/doubt/authr');
const authController8 = require('../controllers/doubt/auths');
const authController9 = require('../controllers/doubt/authrr');
const authController21 = require('../controllers/doubt/authdpr');



//senior
const authController10 = require('../controllers/doubt/authasenior');
const authController11 = require('../controllers/doubt/authc1senior');
const authController12 = require('../controllers/doubt/authrsenior');
const authController13= require('../controllers/doubt/authssenior');
const authController14 = require('../controllers/doubt/authrrsenior');
const authController22 = require('../controllers/doubt/authdsr');


//teacher
const authController15 = require('../controllers/doubt/authateacher');
const authController16= require('../controllers/doubt/authc1teacher');
const authController17 = require('../controllers/doubt/authrteacher');
const authController18 = require('../controllers/doubt/authsteacher');
const authController19 = require('../controllers/doubt/authrrteacher');
const authController23 = require('../controllers/doubt/authdtr');

/************************************RESOURCE PAGE CONTROLLERS******************************************************* */
const authController26 = require('../controllers/resources/authnotes');
const authController27 = require('../controllers/resources/authexp');
const authController28 = require('../controllers/resources/authpapers');


/************************************LOGIN AND SIGNUP******************************************************* */
router.post('/register',authController.register);
router.post('/login',authController2.login);
router.post('/editpro',authController3.editpro);
router.post('/ann',authController4.ann);
router.post('/autha2',authController20.autha2);
router.post('/journey',authController24.journey);
router.post('/authjj',authController25.authjj);


/******************************************DOUBT PAGE************************************ */

//peer
router.post('/annpeer',authController5.annpeer);
router.post('/comm1',authController6.comm1);
router.post('/commr',authController7.commr);
router.post('/sort',authController8.sortt);
router.post('/rr',authController9.rr);
router.post('/dpr',authController21.dpr);


//senior
router.post('/annsenior',authController10.annsenior);
router.post('/comm1senior',authController11.comm1senior);
router.post('/commrsenior',authController12.commrsenior);
router.post('/sortsenior',authController13.sorttsenior);
router.post('/rrsenior',authController14.rrsenior);
router.post('/dsr',authController22.dsr);


//teacher
router.post('/annteacher',authController15.annteacher);
router.post('/comm1teacher',authController16.comm1teacher);
router.post('/commrteacher',authController17.commrteacher);
router.post('/sortteacher',authController18.sorttteacher);
router.post('/rrteacher',authController19.rrteacher);
router.post('/dtr',authController23.dtr);

/******************************************RESOURCES PAGE************************************ */

router.post('/notes',authController26.notes);
router.post('/viewnotes',authController26.viewnotes);
router.post('/notes_reports',authController26.notes_reports);
router.post('/experiences',authController27.experiences);
router.post('/viewexp',authController27.viewexp);
router.post('/exp_reports',authController27.exp_reports);
router.post('/papers',authController28.papers);
router.post('/viewpapers',authController28.viewpapers);
router.post('/papers_reports',authController28.papers_reports);

/******************************************HANGOUT PAGE************************************ */

const authController101 = require('../controllers/hangout/com');
const authController102 = require('../controllers/hangout/reply');
const authController103 = require('../controllers/hangout/authlikes');
// const router = express.Router();
router.post('/hangout',authController101.hangout);
router.post('/reply',authController102.reply);
router.post('/likes',authController103.likes);


module.exports = router;