const express=require('express');
const router=express.Router();
const upload=require('../multer/multer'); 
const uploadPostulantes=require('../multer/multerPostulantes')


const {agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante,traerAdmins,borrarAdmin,traerProgramasAdmin,eliminarPrograma,traerPostulantes,descargar,borrarPostulante,nuevaPass,verificacionUsuario} = require('../controllers/controllers')

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
router.post('/descargar',descargar)
router.delete('/borrarPostulante',verificacionUsuario,borrarPostulante); 
router.post('/nuevaPass',verificacionUsuario,nuevaPass);


module.exports=router;