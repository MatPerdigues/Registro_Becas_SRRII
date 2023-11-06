const multer=require('multer');




const storage=multer.diskStorage({

   
    destination:(req,file,cb)=>{ 

        const pathDocument='./archivos';
        cb(null,pathDocument);
    },

    filename:(req,file,cb)=>{
        
        const ext=file.originalname.split(".").pop();


        if(file.fieldname==='aval'){
            const filename=`Aval-${Date.now()}.${ext}`;
            cb(null,filename);
        }

        if(file.fieldname==='invitacion'){
            const filename=`Invitacion-${Date.now()}.${ext}`;
            cb(null,filename);
        }

        if(file.fieldname==='cv'){
            const filename=`CV-${Date.now()}.${ext}`;
            cb(null,filename);
        }

        if(file.fieldname==='avalORI'){
            const filename=`AvalORI-${Date.now()}.${ext}`;
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