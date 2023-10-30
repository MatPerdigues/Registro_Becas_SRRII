const multer=require('multer');


const storage=multer.diskStorage({

    
    destination:(req,file,cb)=>{ 
        const pathDocument='./imagenes';
        cb(null,pathDocument);
    },

    filename:(req,file,cb)=>{
        const ext=file.originalname.split(".").pop(); 
        const filename=`img-${Date.now()}.${ext}`; 
        cb(null,filename);
    },
});

const upload=multer({storage});

module.exports=upload;