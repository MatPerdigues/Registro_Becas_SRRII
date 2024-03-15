const multer=require('multer');
const BACKEND = process.env.REACT_APP_BACKEND_URL;


const storage=multer.diskStorage({
    
    destination:(req,file,cb)=>{ 
        
        let carpeta = req.body.nombreCorto;
                
        //const pathDocument= `./archivos/${carpeta}`;
        const pathDocument= BACKEND`/archivos/${carpeta}`;
        cb(null,pathDocument);
    },

    filename:(req,file,cb)=>{

        let apellido = req.body.apellido;
        
        const ext=file.originalname.split(".").pop();


        if(file.fieldname==='aval'){
            const filename=`Aval-${apellido}-${Date.now()}.${ext}`;
            cb(null,filename);
        }

        if(file.fieldname==='invitacion'){
            const filename=`Invitacion-${apellido}-${Date.now()}.${ext}`;
            cb(null,filename);
        }

        if(file.fieldname==='cv'){
            const filename=`CV-${apellido}-${Date.now()}.${ext}`;
            cb(null,filename);
        }

        if(file.fieldname==='avalORI'){
            const filename=`AvalORI-${apellido}-${Date.now()}.${ext}`;
            cb(null,filename);
        }

        

        }
        
    },

    
);



const uploadPostulantes=multer({storage:storage});





module.exports=uploadPostulantes.fields([
    {name:'aval'},
    {name:'avalORI'},
    {name:'invitacion'},
    {name:'cv'},

])