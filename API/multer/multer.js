const multer=require('multer');


//const storage=multer.diskStorage({



const storage=multer.memoryStorage({

    

    
/*      destination:(req,file,cb)=>{ 
        const pathDocument='./imagenes';
        cb(null,pathDocument);
    },  */

    filename:(req,file,cb)=>{
        const ext=file.originalname.split(".").pop(); 

        console.log(req.file.fieldname)

        if(file.fieldname==='imagen'){            
            const filename=`img-${Date.now()}.${ext}`; 
            cb(null,filename);
        }
        // else{
        //     const filename=`convocatoria-${Date.now()}.${ext}`; 
        //     cb(null,filename);
        // }
    },
});

const uploadPrograma=multer({storage:storage});



//module.exports=upload

module.exports=uploadPrograma.fields([
    {name:'imagen'},
    // {name:'convocatoria'}


])