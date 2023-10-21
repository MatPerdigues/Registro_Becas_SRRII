const express=require('express');
const router=express.Router();
//const upload=require('../multer/multer') 

const {agregarAdmin,login} = require('../controllers/controllers')

router.post('/agregarAdmin',agregarAdmin);
router.post('/login',login);

module.exports=router;