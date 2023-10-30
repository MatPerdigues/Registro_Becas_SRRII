const express=require('express');
const router=express.Router();
const upload=require('../multer/multer') 

const {agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante} = require('../controllers/controllers')

router.post('/agregarAdmin',agregarAdmin);
router.post('/login',login);
router.post('/agregarPrograma',upload.single('imagen'),agregarPrograma);
router.get('/traerProgramas',traerProgramas);
router.post('/agregarPostulante',agregarPostulante);

module.exports=router;