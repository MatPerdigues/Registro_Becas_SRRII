const dbConnection = require('../config/dataBase');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const PASS_SEGURA = process.env.PASS_SEGURA;
const fs = require('fs');
const BACKEND = process.env.REACT_APP_BACKEND_URL;





const agregarAdmin=async(req,res)=>{
    const{nombre,apellido,unidad_academica,nivel,mail,usuario,password}=req.body;

    
    const passEncript = await bcrypt.hash(password,10);

    dbConnection.query(`SELECT * FROM admins WHERE usuario="${usuario}"`,(error,data)=>{
       
        if(error){
           
            res.send(
                error);
        }else{
            if(data.length>0){
                
                res.json(
                    `Ya existe un Admin con ese usuario`)
            }else{
                dbConnection.query("INSERT INTO admins (nombre,apellido,unidad_academica,nivel,mail,usuario,password) VALUES (?,?,?,?,?,?,?)",[nombre,apellido,unidad_academica,nivel,mail,usuario,passEncript],(error,data)=>{
                    if(error){
                        
                        res.send(
                            error);
                    }else{
                         res.json(
                            `Administrador/a registrado/a correctamente. Se ha enviado un correo electrónico a la dirección ${mail} con los datos de acceso.`);
                        
                    }
                })
            }
        }})}


const login = (req,res)=>{
    const{usuario,password}=req.body;

    
    dbConnection.query("SELECT * FROM admins WHERE usuario=?",[usuario],async(error,data)=>{
        if(error){
            res.send({
                mensaje:"Error en el servidor " + error})
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
                          jwt.sign({usuario},PASS_SEGURA,{expiresIn:'30m'},(error,token)=>{  
                           
                        
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


const agregarPrograma=(req,res)=>{
    const{nombre,nombreCorto,vencimiento,vencimientoPublic,aval,invitacion,cv,avalORI}=req.body;

    let dir = `./archivos/${nombreCorto}`;

    fs.mkdirSync(dir, { recursive: true });

   const img='http://localhost:3200/public/' + req.file.filename;

    dbConnection.query("INSERT INTO programas (nombre,nombreCorto,vencimiento,vencimientoPublic,imagen,aval,invitacion,cv,avalORI) VALUES (?,?,?,?,?,?,?,?,?)",[nombre,nombreCorto,vencimiento,vencimientoPublic,img,aval,invitacion,cv,avalORI],(error,data)=>{
        if(error){
            res.send(error);
        }else{
                  
            res.json(`Programa cargado correctamente!`);
            
        }
    })
}        


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

    let aval=''
    let avalORI=''
    let invitacion=''
    let cv=''



    if(req.files.aval===undefined){
        aval='N/A'
    } else {
        //aval ='http://localhost:3200/public/' + req.files.aval[0].filename;
        aval =BACKEND + req.files.aval[0].filename;
        
    };

    if(req.files.avalORI===undefined){
        avalORI = 'N/A'
    } else {
        avalORI='http://localhost:3200/public/' + req.files.avalORI[0].filename;
    };

    if(req.files.invitacion===undefined){
        invitacion = 'N/A'
    } else {
        invitacion='http://localhost:3200/public/' + req.files.invitacion[0].filename;
    };

    if(req.files.cv===undefined){
        cv = 'N/A'
    } else {
        cv='http://localhost:3200/public/' + req.files.cv[0].filename;
    };

    
    const{nombre,apellido,dni,email,facultad,programa,programaId,fecha_registro,year_registro,gestor}=req.body;

  
    
    
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


const eliminarPrograma = (req,res)=>{
    const{programaId,nombreCorto}=req.body;
    

    let dir = `./archivos/${nombreCorto}`;

    fs.rm(dir, { recursive: true, force: true }, err => {
        if (err) {
          throw err;
        }
        
      });
    
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


    
    res.download(`./archivos/${carpeta}/${archivo}`);
}


const borrarPostulante = (req,res)=>{
    const{idPostulante,nombreCorto,elimAval,elimAvalOri,elimInvitacion,elimCv}=req.body;

    let dir = `./archivos/${nombreCorto}/${elimAval}`;
    let dir1 = `./archivos/${nombreCorto}/${elimAvalOri}`;
    let dir2 = `./archivos/${nombreCorto}/${elimInvitacion}`;
    let dir3 = `./archivos/${nombreCorto}/${elimCv}`;



    fs.rm(dir, { recursive: true, force: true }, err => {
        if (err) {
          throw err;
        }
    })

    fs.rm(dir1, { recursive: true, force: true }, err => {
        if (err) {
          throw err;
        }
    })

    fs.rm(dir2, { recursive: true, force: true }, err => {
        if (err) {
          throw err;
        }
    })

    fs.rm(dir3, { recursive: true, force: true }, err => {
        if (err) {
          throw err;
        }
    })



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
        const{password,usuario}=req.body;
        


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
                        `UPDATE admins SET password ="${passEncript}" WHERE usuario=?`,[usuario],(error,data)=>{
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


module.exports={agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante,traerAdmins,borrarAdmin,traerProgramasAdmin,eliminarPrograma,traerPostulantes,descargar,borrarPostulante,nuevaPass,verificacionUsuario,enviarPass};