const dbConnection = require('../config/dataBase');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const PASS_SEGURA = process.env.PASS_SEGURA;
const fs = require('fs');
const BACKEND = process.env.REACT_APP_BACKEND_URL;
const { S3Client,PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const AWS =require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId:process.env.S3ACCESKEY,
    secretAccessKey:process.env.S3SECRETKEY,
    bucketRegion:process.env.S3BUCKET_REGION
});

const s3Client = new S3Client({
    credentials:{
        accessKeyId:process.env.S3ACCESKEY,
        secretAccessKey:process.env.S3SECRETKEY,
    },
    region:process.env.S3BUCKET_REGION
})



const agregarAdmin=async(req,res)=>{
    const{nombre,apellido,unidad_academica,nivel,mail,usuario,password}=req.body;

    
    const passEncript = await bcrypt.hash(password,10);

    dbConnection.query(`SELECT * FROM admins WHERE usuario="${usuario}"`,(error,data)=>{
       
        if(error){
            console.log(error);
           
            res.send({mensaje:error})
            
                
        }else{
            if(data.length>0){
                
                res.send({mensaje:`Ya existe un Admin con ese usuario`})
            }else{
                dbConnection.query("INSERT INTO admins (nombre,apellido,unidad_academica,nivel,mail,usuario,password) VALUES (?,?,?,?,?,?,?)",[nombre,apellido,unidad_academica,nivel,mail,usuario,passEncript],(error,data)=>{
                    if(error){
                        
                        res.send({mensaje:error});
                    }else{
                         res.send({mensaje:`Administrador/a registrado/a correctamente. Se ha enviado un correo electrónico a la dirección ${mail} con los datos de acceso.`});
                        
                    }
                })
            }
        }})}





const login = (req,res)=>{
    const{usuario,password}=req.body;

    
    dbConnection.query("SELECT * FROM admins WHERE usuario=?",[usuario],async(error,data)=>{
        if(error){

            
                if(error === "Error: Can't add new command when connection is in closed state"){
                    
                    res.send({mensaje:'Se ha cerreado la conexión con el servidor'});
                    dbConnection.end();
                    
                
                }else{
                    
                    res.send({mensaje:error})
                    dbConnection.end();
                }

                     
        }else{
            if(data.length==0){
                res.send({
                    mensaje:"Usuario no registrado"
                });
            }else{
                let info=data[0];
                const passOk=await bcrypt.compare(password,info.password);
                if(passOk){
                    //jwt.sign({usuario},PASS_SEGURA,{expiresIn:'10m'},(error,token)=>{
                      jwt.sign({usuario},PASS_SEGURA,{expiresIn:'30m'},(error,{token})=>{  
                       
                    
                        if(error){
                            res.send({
                                mensaje:error})
                        }else{                            
                            res.send({
                                mensaje:("Usuario logeado correctamente!"),
                                claveToken:token,
                                nivel:info.nivel,
                                facultad:info.unidad_academica,
                                gestor:info.usuario,
                                nombre:info.nombre,
                                apellido:info.apellido,
                                mail:info.mail
                            }) 
                        
                        }
                    })
                }else{
                    res.send({
                        mensaje:"Contraseña incorrecta"
                    })
                }
            }
            }
        })
        }






    const agregarPrograma= async (req,res)=>{
        const{nombre,nombreCorto,vencimiento,vencimientoPublic,aval,invitacion,cv,avalORI}=req.body;
        const imgS3=req.file.buffer;
        
        const ext=req.file.originalname.split(".").pop(); 
        const filename=`img-${Date.now()}.${ext}`; 


        const params = {
            Bucket: process.env.S3BUCKET_NAME,
            Key: `programas/${nombreCorto}/imagenes/${filename}`,
            Body: imgS3,
            ContentType: req.file.mimeType
        }

        const commandPut = new PutObjectCommand(params);

        

        await s3Client.send(commandPut) 


        const img=` https://s3.sa-east-1.amazonaws.com/registro.becas.srrii.uba/programas/${nombreCorto}/imagenes/` + filename;

        
        dbConnection.query("INSERT INTO programas (imagen,nombre,nombreCorto,vencimiento,vencimientoPublic,aval,invitacion,cv,avalORI) VALUES (?,?,?,?,?,?,?,?,?)",[img,nombre,nombreCorto,vencimiento,vencimientoPublic,aval,invitacion,cv,avalORI],(error,data)=>{
            if(error){
                console.log(error);
                res.json({
                    mensaje:error.sqlMessage});
            }else{

                res.json({
                    mensaje:`Programa cargado correctamente!`});
                
            }
        }
        )}
   

       
        


const traerProgramas = (req,res)=>{
    dbConnection.query('SELECT * FROM programas',(error,data)=>{
        if(error){
            res.send(error);
        }else{
            res.send(data);
        }
    })
}





const agregarPostulante=(req,res)=>{

    const{nombre,apellido,dni,email,facultad,programa,nombreCorto,programaId,fecha_registro,year_registro,gestor}=req.body;


    let aval=''
    let avalORI=''
    let invitacion=''
    let cv=''

    const subirArchivo = async(archivo,buffer)=>{

        const params = {
            Bucket: process.env.S3BUCKET_NAME,
            Key: `programas/${nombreCorto}/archivos/${archivo}`,
            Body: buffer,
            ContentType: req.files.mimeType
        }
        const commandPut = new PutObjectCommand(params);
        await s3Client.send(commandPut)
    }
    
    
    if(req.files.aval===undefined){
        aval='N/A'
    } else {

        const ext=req.files.aval[0].originalname.split(".").pop(); 
        const archivo=`aval-${apellido}-${Date.now()}.${ext}`;
        const buffer=req.files.aval[0].buffer;

              
        subirArchivo(archivo,buffer);
        
        //aval ='http://localhost:3200/public/' + req.files.aval[0].filename;
        aval =`https://s3.sa-east-1.amazonaws.com/registro.becas.srrii.uba/programas/${nombreCorto}/archivos/${archivo}`;
    
    };

    
    
     if(req.files.avalORI===undefined){
        avalORI = 'N/A'
    } else {
        
        const ext=req.files.avalORI[0].originalname.split(".").pop(); 
        const archivo=`avalORI-${apellido}-${Date.now()}.${ext}`;
        const buffer=req.files.avalORI[0].buffer;

              
        subirArchivo(archivo,buffer);
       
            
        avalORI=`https://s3.sa-east-1.amazonaws.com/registro.becas.srrii.uba/programas/${nombreCorto}/archivos/${archivo}`;
    };



    if(req.files.invitacion===undefined){
        invitacion = 'N/A'
    } else {

        const ext=req.files.invitacion[0].originalname.split(".").pop(); 
        const archivo=`invitacion-${apellido}-${Date.now()}.${ext}`;
        const buffer=req.files.invitacion[0].buffer;

              
        subirArchivo(archivo,buffer);
        
        invitacion=`https://s3.sa-east-1.amazonaws.com/registro.becas.srrii.uba/programas/${nombreCorto}/archivos/${archivo}`;
    };

    
    
    if(req.files.cv===undefined){
        cv = 'N/A'
    } else {

        const ext=req.files.cv[0].originalname.split(".").pop(); 
        const archivo=`CV-${apellido}-${Date.now()}.${ext}`;
        const buffer=req.files.cv[0].buffer;

              
        subirArchivo(archivo,buffer);
        
        cv=`https://s3.sa-east-1.amazonaws.com/registro.becas.srrii.uba/programas/${nombreCorto}/archivos/${archivo}`;
    };
    
    
    
    dbConnection.query("INSERT INTO postulaciones (nombre,apellido,dni,email,facultad,programa,programaId,fecha_registro,año_registro,gestor,aval,avalORI,invitacion,cv) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellido,dni,email,facultad,programa,programaId,fecha_registro,year_registro,gestor,aval,avalORI,invitacion,cv],(error,data)=>{
        if(error){
            res.json({
                mensaje:'Hubo un error'+' '+error
            })
        }else{
                  
            res.json({
                mensaje:"Postulante registrado/a correctamente"
            });
            
        }
    })
} 
 



const traerAdmins = (req,res)=>{

    const{adminNivel}=req.body;
  

    if(adminNivel == 0){

        dbConnection.query('SELECT * FROM admins',(error,data)=>{
            if(error){
                res.send(error);
            }else{
                res.send(data);
            }
        })
    } else {

        dbConnection.query('SELECT * FROM admins WHERE nivel=2',(error,data)=>{
            if(error){
                res.send(error);
            }else{
                res.send(data);
            }
        })

    }
}


const borrarAdmin = (req,res)=>{
    const{adminId}=req.body;

    dbConnection.query(`DELETE FROM admins WHERE id="${adminId}"`,(error,data)=>{

       

         if(error){
            res.send("Hubo un error" + error)
        }else{
            res.json(`Admin eliminado/a correctamente!`);
        } 
    })
}


const traerProgramasAdmin = (req,res)=>{
    dbConnection.query('SELECT * FROM programas',(error,data)=>{
        if(error){
            res.send(error);
        }else{
            res.send(data);
        }
    })
}


const eliminarPrograma = async (req,res)=>{

    let listObjetos = [];
    const{programaId,nombreCorto}=req.body;
    
    const params = {
        Bucket: 'registro.becas.srrii.uba',
        Prefix: `programas/${nombreCorto}/`,
    };  

    s3.listObjectsV2(params,(error,data)=>{
        if(error){console.log(error)
        }else{
  
            for(let x = 0; x < data.Contents.length; x++){
                listObjetos.push(data.Contents[x].Key)
            }


             for(let y = 0; y < listObjetos.length; y++){
                let paramsDelete = ({
                    Bucket:`registro.becas.srrii.uba`,
                    Key:`${listObjetos[y]}`
                })

                 const command = new DeleteObjectCommand(paramsDelete);

                 s3Client.send(command) 

                 s3.deleteObject(paramsDelete, (error,data)=> {
                    if(error){
                        console.log(error)
                    }
                })
            }
        }})
    
    listObjetos = [];    
      
    dbConnection.query(`DELETE FROM programas WHERE id="${programaId}"`,(error,data)=>{
     

         if(error){
            res.send("Hubo un error" + error)
        }else{
            res.json(`Programa eliminado correctamente!`);
        } 
    })    
} 



const traerPostulantes = (req,res)=>{

    const{programaId,facultad,adminNivel}=req.body;

    if(adminNivel==0 || adminNivel ==1){


        dbConnection.query(`SELECT * FROM postulaciones WHERE programaId = ${programaId}`,(error,data)=>{
            if(error){
                res.json("Hubo un error" + error);
            }else{
                res.json(data);
            }
        })
        

    } else {

        

        dbConnection.query(`SELECT * FROM postulaciones WHERE facultad = "${facultad}" AND programaId = ${programaId}`,(error,data)=>{
            if(error){
                res.json("Hubo un error" + error);
            }else{
                res.json(data);
            }
        })
    }




}

const descargar = (req,res)=>{

    const{carpeta,archivo}=req.body;
    
    //res.download(`./archivos/${carpeta}/${archivo}`);
    res.download(`https://s3.sa-east-1.amazonaws.com/registro.becas.srrii.uba/archivos/${carpeta}/${archivo}`)
}

    
    
    
    

const borrarPostulante = (req,res)=>{
    const{idPostulante}=req.body;

     dbConnection.query(`DELETE FROM postulaciones WHERE id="${idPostulante}"`,(error,data)=>{

        if(error){
           res.send("Hubo un error" + error)
       }else{
           res.json(`Registro eliminado correctamente`);
       } 
   })
}

   




const nuevaPass = (req,res)=>{
    
    const{usuario,password,nuevaPass}=req.body;
    
    dbConnection.query("SELECT * FROM admins WHERE usuario=?",[usuario],async(error,data)=>{
        if(error){
            
            res.send("Error en el servidor " + error)
            }else{
                if(data.length==0){
                   
                    res.json({
                        mensaje:"Usuario no registrado"
                    });
                }else{
                  
                    let info=data[0];
                    const passOk=await bcrypt.compare(password,info.password);

                    if(passOk){
                        
                        const passEncript = await bcrypt.hash(nuevaPass,10);
                        
                        dbConnection.query(
                            `UPDATE admins SET password ="${passEncript}" WHERE usuario=?`,[usuario],async(error,data)=>{
                            if(error){
                                
                                res.json("Error al actualizar la contraseña" + error)
                            
                            }else{
                                
                                
                                res.json({
                                            mensaje:"Contraseña actualizada correctamente"
                                        });
                                    }
                                    
                                })
                    
                    }else{
                       
                        res.json({
                            mensaje:"Contraseña incorrecta"
                })
            }
        }
    }
    })}

    
    
    
    
    
    
    const verificacionUsuario=(req,res,next)=>{
        const authToken=req.headers.authorization;
        
        const token=authToken.split(" ").pop(); //debido a que al mostrar por consola el token se entrega con "bearer" al principio, se utiliza el split y el pop para quedarnos solo con la última parte (token)
        //console.log(authToken);
  
        jwt.verify(token,PASS_SEGURA,(error,data)=>{ //process.env.PASS_SEGURA
            if(error){
                if(error.name=="TokenExpiredError"){return res.json("Sesión expirada")}
                /* res.send(error); */
                else{res.json(error)}
            }else{

                          
                next();
            }
        })
    
    }



    
    

    const enviarPass = (req,res)=>{
        const{password,usuario,exp_pass}=req.body;

        dbConnection.query("SELECT * FROM admins WHERE usuario=?",[usuario],async(error,data)=>{

            if(error){
                res.json({
                    mensaje:"Error en el servidor" + error
                })
            }else{
                if(data.length==0){
                    res.json({
                        mensaje:"Usuario no registrado"
                    }) 
                }else{
                    let info = data[0];
                    const passEncript = await bcrypt.hash(password,10);
                    
                    dbConnection.query(
                        `UPDATE admins SET pass_temporal = "${passEncript}", exp_pass = "${exp_pass}" WHERE usuario=?`,[usuario],(error,data)=>{
                        if(error){
                            res.json({
                                mensaje:"Error en el envío de la contraseña" + error
                            });
                        
                        }else{
                            
                            res.json({
                                        mensaje:"Contraseña actualizada correctamente",
                                        nombre:info.nombre,
                                        mail:info.mail,
                                        usuario:info.usuario

                                    });
                                }
                                
                            })
                        }
                    }
        
                })
            }




    const recuperarPass = async(req,res)=>{
        const{password,usuario,nuevaPass}=req.body;

        dbConnection.query("SELECT * FROM admins WHERE usuario=?",[usuario],async(error,data)=>{

            if(error){
                res.json({
                    mensaje:"Error en el servidor" + error
                })
            }else{
                if(data.length==0){
                    res.json({
                        mensaje:"Usuario no registrado"
                    }) 
                }else{
                    let info=data[0];
                    const passOk=await bcrypt.compare(password,info.pass_temporal);
                    let fechaActual = new Date();
                    let fechaDB = new Date(info.exp_pass);
                    const passEncript = await bcrypt.hash(nuevaPass,10);

                    if(passOk){
                        if(fechaActual<fechaDB){

                            dbConnection.query(
                                `UPDATE admins SET password ="${passEncript}" WHERE usuario=?`,[usuario],(error,data)=>{
                                if(error){
                                    
                                    res.json({
                                        mensaje:"Error al actualizar la contraseña" + error})
                                
                                }else{
                                    res.json({
                                        mensaje:"Contraseña actualizada correctamente"
                                    })
                                }
                            
                            })



                        }else{
                            res.json({
                                mensaje:"La contraseña generada por el sistema ha expirado"})
                        }

                    }else{
                        res.json({
                            mensaje:"La contraseña generada por el sistema no es correcta"})
                    }

                    
                }
            }
        })}


    const traerConvocatoria = async(req,res)=>{
        const{programaId}=req.body;

        console.log(programaId)

        dbConnection.query("SELECT * FROM programas WHERE id=?",[programaId],async(error,data)=>{
            if(error){
                res.json({mensaje:error})
            }else{
               
                let info=data[0];
                console.log(info.nombre)
                res.json({nombre:info.nombre})
                
            }

        }
    )
}


module.exports={agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante,traerAdmins,borrarAdmin,traerProgramasAdmin,eliminarPrograma,traerPostulantes,descargar,borrarPostulante,nuevaPass,verificacionUsuario,enviarPass,recuperarPass,traerConvocatoria};