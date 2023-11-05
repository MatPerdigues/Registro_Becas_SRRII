const express=require('express');
const router=express.Router();
const upload=require('../multer/multer'); 
const uploadPostulantes=require('../multer/multerPostulantes')


const {agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante,imprimirArchivos} = require('../controllers/controllers')

router.post('/agregarAdmin',agregarAdmin);
router.post('/login',login);
router.post('/agregarPrograma',upload.single('imagen'),agregarPrograma);
router.get('/traerProgramas',traerProgramas);
//router.post('/agregarPostulante',upload.single('imagen'),agregarPostulante);

router.post('/agregarPostulante',uploadPostulantes,agregarPostulante);

module.exports=router;