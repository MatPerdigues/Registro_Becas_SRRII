const express=require('express');
const router=express.Router();
const upload=require('../multer/multer'); 
const uploadPostulantes=require('../multer/multerPostulantes')


const {agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante,traerAdmins,borrarAdmin,traerProgramasAdmin,eliminarPrograma,traerPostulantes,descargar,borrarPostulante} = require('../controllers/controllers')

router.post('/agregarAdmin',agregarAdmin);
router.post('/login',login);
router.post('/agregarPrograma',upload.single('imagen'),agregarPrograma);
router.get('/traerProgramas',traerProgramas);
router.post('/agregarPostulante',uploadPostulantes,agregarPostulante);
router.post('/traerAdmins',traerAdmins);
//router.get('/traerAdmins',traerAdmins);
router.delete('/borrarAdmin',borrarAdmin);
router.get('/traerProgramasAdmin',traerProgramasAdmin);
router.delete('/eliminarPrograma',eliminarPrograma);
router.post('/traerPostulantes',traerPostulantes);
router.post('/descargar',descargar)
router.delete('/borrarPostulante',borrarPostulante); 


module.exports=router;