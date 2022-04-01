const express = require("express");
const authController = require('../controllers/LogReg/authr');
const authController2 = require('../controllers/LogReg/authl');
const authController3 = require('../controllers/profile/authp');
const authController4 = require('../controllers/announcement/autha');

const router = express.Router();


/****************************************DOUBT PAGE CONTROLLERS************************************** */
//peer
const authController5 = require('../controllers/doubt/autha');
const authController6 = require('../controllers/doubt/authc1');
const authController7 = require('../controllers/doubt/authr');
const authController8 = require('../controllers/doubt/auths');
const authController9 = require('../controllers/doubt/authrr');


//senior
const authController10 = require('../controllers/doubt/authasenior');
const authController11 = require('../controllers/doubt/authc1senior');
const authController12 = require('../controllers/doubt/authrsenior');
const authController13= require('../controllers/doubt/authssenior');
const authController14 = require('../controllers/doubt/authrrsenior');


//teacher
const authController15 = require('../controllers/doubt/authateacher');
const authController16= require('../controllers/doubt/authc1teacher');
const authController17 = require('../controllers/doubt/authrteacher');
const authController18 = require('../controllers/doubt/authsteacher');
const authController19 = require('../controllers/doubt/authrrteacher');



/************************************LOGIN AND SIGNUP******************************************************* */
router.post('/register',authController.register);
router.post('/login',authController2.login);
router.post('/editpro',authController3.editpro);
router.post('/ann',authController4.ann);


/******************************************DOUBT PAGE************************************ */

//peer
router.post('/annpeer',authController5.annpeer);
router.post('/comm1',authController6.comm1);
router.post('/commr',authController7.commr);
router.post('/sort',authController8.sortt);
router.post('/rr',authController9.rr);


//senior
router.post('/annsenior',authController10.annsenior);
router.post('/comm1senior',authController11.comm1senior);
router.post('/commrsenior',authController12.commrsenior);
router.post('/sortsenior',authController13.sorttsenior);
router.post('/rrsenior',authController14.rrsenior);


//teacher
router.post('/annteacher',authController15.annteacher);
router.post('/comm1teacher',authController16.comm1teacher);
router.post('/commrteacher',authController17.commrteacher);
router.post('/sortteacher',authController18.sorttteacher);
router.post('/rrteacher',authController19.rrteacher);


module.exports = router;