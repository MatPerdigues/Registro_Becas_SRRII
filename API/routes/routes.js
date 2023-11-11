const express=require('express');
const router=express.Router();
const upload=require('../multer/multer'); 
const uploadPostulantes=require('../multer/multerPostulantes')


const {agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante,traerAdmins,borrarAdmin,traerProgramasAdmin} = require('../controllers/controllers')

router.post('/agregarAdmin',agregarAdmin);
router.post('/login',login);
router.post('/agregarPrograma',upload.single('imagen'),agregarPrograma);
router.get('/traerProgramas',traerProgramas);
router.post('/agregarPostulante',uploadPostulantes,agregarPostulante);
router.get('/traerAdmins',traerAdmins);
router.get('/traerAdmins',traerAdmins);
router.delete('/borrarAdmin',borrarAdmin);
router.get('/traerProgramasAdmin',traerProgramasAdmin);

module.exports=router;