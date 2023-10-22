const dbConnection = require('../config/dataBase');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const PASS_SEGURA = process.env.PASS_SEGURA;



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
                                    nivel:info.nivel
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


module.exports={agregarAdmin,login};