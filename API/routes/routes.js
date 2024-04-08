const express=require('express');
const router=express.Router();
const upload=require('../multer/multer'); 
const uploadPostulantes=require('../multer/multerPostulantes')


const {agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante,traerAdmins,borrarAdmin,traerProgramasAdmin,eliminarPrograma,traerPostulantes,borrarPostulante,nuevaPass,verificacionUsuario,enviarPass,enviarS3Url} = require('../controllers/controllers')

router.post('/agregarAdmin',verificacionUsuario,agregarAdmin);
router.post('/login',login);
router.post('/agregarPrograma',verificacionUsuario,upload.single('imagen'),agregarPrograma);
router.get('/traerProgramas',traerProgramas);
router.post('/agregarPostulante',verificacionUsuario,uploadPostulantes,agregarPostulante);
router.post('/traerAdmins',traerAdmins);
router.delete('/borrarAdmin',verificacionUsuario,borrarAdmin);
router.get('/traerProgramasAdmin',traerProgramasAdmin);
router.delete('/eliminarPrograma',verificacionUsuario,eliminarPrograma);
router.post('/traerPostulantes',traerPostulantes);
router.delete('/borrarPostulante',verificacionUsuario,borrarPostulante); 
router.post('/nuevaPass',verificacionUsuario,nuevaPass);
router.post('/enviarPass',enviarPass);


module.exports=router;