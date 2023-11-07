const dbConnection = require('../config/dataBase');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const PASS_SEGURA = process.env.PASS_SEGURA;
const fs = require('fs');





const agregarAdmin=async(req,res)=>{
    const{nombre,apellido,unidad_academica,nivel,mail,usuario,password}=req.body;

    const passEncript = await bcrypt.hash(password,10);

    dbConnection.query(`SELECT * FROM admins WHERE usuario="${usuario}"`,(error,data)=>{
        if(error){
            res.send(error);
        }else{
            if(data.length>0){
                res.json("Ya existe un Admin con ese usuario")
            }else{
                dbConnection.query("INSERT INTO admins (nombre,apellido,unidad_academica,nivel,mail,usuario,password) VALUES (?,?,?,?,?,?,?)",[nombre,apellido,unidad_academica,nivel,mail,usuario,passEncript],(error,data)=>{
                    if(error){
                        res.send(error);
                    }else{
                         res.json(`Administrador/a registrado/a correctamente. Se ha enviado un correo electrónico a la dirección ${mail} con los datos de acceso.`);
                        
                    }
                })
            }
        }})}


const login = (req,res)=>{
    const{usuario,password}=req.body;
    
    dbConnection.query("SELECT * FROM admins WHERE usuario=?",[usuario],async(error,data)=>{
        if(error){
            res.send("Error en el servidor " + error)
            }else{
                if(data.length==0){
                    res.send({
                        mensaje:"Usuario no registrado"
                    });
                }else{
                    let info=data[0];
                    const passOk=await bcrypt.compare(password,info.password);

                    if(passOk){

                        jwt.sign({usuario},PASS_SEGURA,{expiresIn:'10m'},(error,token)=>{
                        
                        
                            if(error){
                                res.send(error)
                            }else{                            
                                res.send({
                                    mensaje:("Usuario logeado correctamente!"),
                                    claveToken:token,
                                    nivel:info.nivel,
                                    facultad:info.unidad_academica	
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
        aval ='http://localhost:3200/public/' + req.files.aval[0].filename;
        
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

    
    const{nombre,apellido,dni,email,facultad,programa,fecha_registro,year_registro}=req.body;
    
    
    dbConnection.query("INSERT INTO postulaciones (nombre,apellido,dni,email,facultad,programa,fecha_registro,año_registro,aval,avalORI,invitacion,cv) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellido,dni,email,facultad,programa,fecha_registro,year_registro,aval,avalORI,invitacion,cv],(error,data)=>{
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



module.exports={agregarAdmin,login,agregarPrograma,traerProgramas,agregarPostulante};