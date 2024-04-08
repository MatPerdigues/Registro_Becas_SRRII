import './admin_1.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus,faTrashCan,faPenToSquare,faMagnifyingGlass,faXmark,faCheck,faUserPlus,faUserMinus} from '@fortawesome/free-solid-svg-icons'
import { useRef, useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import CardProgramas from '../cardProgramas/cardProgramas';
import Llave from '../llave/llave';
const API = process.env.REACT_APP_BACKEND_URL;





export default function Admin_1() {



    let dato="";
    let baseClave='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?,;-_¡!¿*%&$/()[]{}|@><';
    let lengthClave=8;
    const form = useRef();
    const[nombre,setNombre]=useState('');
    const[usuario,setUsuario]=useState('');
    const[mail,setMail]=useState('');
    const[img,setImg]=useState(null);
    const[consulta, setConsulta]=useState('');
    let[esconder,setEsconder]=useState(true);
    let resEliminarPrograma = '';
    let adminNivel = localStorage.getItem("adminNivel");
    let url = '';
    
    
    const handleChange=(event)=>{
        setImg(event.target.files[0]);
    }

    const aplicarContorno = ()=>{
        document.getElementById("contornoAdmin").style.display="flex";
        document.getElementById("contornoAdmin").style.zIndex="0";
        document.getElementById('btn-admin').style.zIndex='-1'
        document.getElementById('btn-admin1').style.zIndex='-1'
        document.getElementById('btn-admin3').style.zIndex='-1'
        document.getElementById('btn-admin4').style.zIndex='-1'
        document.getElementById('btn-admin5').style.zIndex='-1'
        document.getElementById('btnLlave').style.zIndex='-1'
    }

    const quitarContorno=()=>{
        document.getElementById("contornoAdmin").style.display="none";
        document.getElementById('btn-admin').style.zIndex='0'
        document.getElementById('btn-admin1').style.zIndex='0'
        document.getElementById('btnLlave').style.zIndex='0'
        document.getElementById('btn-admin3').style.zIndex='0'
        document.getElementById('btn-admin4').style.zIndex='0'
        document.getElementById('btn-admin5').style.zIndex='0'
    }

    

    const mostrar=event=>{

        aplicarContorno();

        

        console.log(event.currentTarget.id)
        if(event.currentTarget.id==="btn-admin"){
            document.getElementById("form-info").style.display="block";
            document.getElementById("form-admin").style.display="none";
           
        }

        if(event.currentTarget.id==="btn-admin4"){
            document.getElementById("form-admin").style.display="block";
            document.getElementById("form-info").style.display="none";
           
         
        }

        if(event.currentTarget.id==="btn-admin1"){
            setEsconder(false);
           
            document.getElementById("form-info").style.display="none";
            document.getElementById("form-admin").style.display="none";
            
        }

        if(event.currentTarget.id==="btnLlave"){
            
            document.getElementById("tarjetaPass").style.display="block";
        }

    }
 
    

    const ocultar=event=>{

        quitarContorno();
        
       
        if(event.currentTarget.id==="btn-cerrar-info"){
            document.getElementById("form-info").reset();
            document.getElementById("form-info").style.display="none";
        }
        
        if(event.currentTarget.id==="btn-cerrar-admin"){
            document.getElementById("form-admin").reset();
            document.getElementById("form-admin").style.display="none";
        }

        if(event.currentTarget.id==="btn-XeliminarPrograma"){
            document.getElementById("tarjetaEliminarPrograma").style.display="none";
            setEsconder(true);
            
        }

        if(event.currentTarget.id==="btn-XeliminarPrograma1"){
            setEsconder(true);
            
            document.getElementById("form-info").style.display="none";
            document.getElementById("form-admin").style.display="none";
        }

        if(event.currentTarget.id==="btnXpass"){
            
            document.getElementById("tarjetaPass").style.display="none";
        }
    }


    const enviarMail = (nombre,usuario,mail,clave)=>{

        const serviceId = "service_3o1n3ps";
        const templateId = "template_i2okhu7";
        const publicKey= "5yzZimEw4Rf97xil4";


        const templateParams={
            nombre:nombre,
            usuario:usuario,
            mail:mail,
            clave:clave

        }

        emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email sent successfully!', response);

        setNombre('');
        setMail('');
        setUsuario('');
        })
        .catch((error) => {
        console.error('Error sending email:', error);
        });


    }
    
    


    const agregarAdmin = async(event)=>{


        event.preventDefault();

        let clave='';

        for(let x=0; x < lengthClave; x++){
            let random = Math.floor(Math.random() * baseClave.length);
            clave = clave + baseClave.charAt(random);
        }
        




        let nombre = event.target[0].value;
        let apellido = event.target[1].value;
        let unidad_academica = event.target[2].value;
        let nivel = event.target[3].value;
        let mail = event.target[4].value;
        let usuario = event.target[5].value;
       

        
        const formSumarAdmin = JSON.stringify({
            "nombre":nombre,
            "apellido":apellido,
            "unidad_academica":unidad_academica,
            "nivel":nivel,
            "mail":mail,
            "usuario":usuario,
            "password":clave
   
        })     

    

        
        const response = await fetch(API+"/agregarAdmin",{    
        //const response = await fetch("http://localhost:3200/agregarAdmin",{  


        method:"POST",
        body:formSumarAdmin,
        headers:{
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        .then((data)=>{dato=data})

        console.log(dato);


        if(dato.message==='jwt malformed'){

            alert('La sesión ha sido cerrada');
            window.location.href='../'
        }else{

            if(dato==='Sesión expirada'){
                alert(dato);
                window.location.href='../'
            } else{

                if(dato===`Administrador/a registrado/a correctamente. Se ha enviado un correo electrónico a la dirección ${mail} con los datos de acceso.`){

                    enviarMail(nombre,usuario,mail,clave);

                    alert(dato);

                    window.location.reload();
                    
                } else{

                    alert(dato);
                    
                    window.location.reload();
                }
            }
        }
        


    }



    const agregarPrograma = async(event)=>{
        event.preventDefault();
        

        let check1 = document.getElementById("item1-documentación");
        let check2 = document.getElementById("item2-documentación");
        let check3 = document.getElementById("item3-documentación");
        let check4 = document.getElementById("item4-documentación");
        


        let formatoFecha = event.target[2].value.split("-")
        let dia = formatoFecha[2];
        let mes = formatoFecha[1];
        let year = formatoFecha[0];
        let vencimientoPublic = dia+'-'+mes+'-'+year;



        let nombreCarpeta = event.target[1].value;
        let testCarpeta = nombreCarpeta.search(/\s/ig);
        if(testCarpeta>0){
            return(alert('Error: el nombre corto del Programa no debe contener espacios'))
        }

        
        const form = new FormData();
        form.append('imagen',img);
        form.append("nombre",event.target[0].value);
        form.append("nombreCorto",event.target[1].value);
        form.append("vencimiento",event.target[2].value);
        form.append("vencimientoPublic",vencimientoPublic);
        form.append("aval",check1.checked);
        form.append("invitacion",check2.checked);
        form.append("cv",check3.checked);
        form.append("avalORI",check4.checked);  
        


        //const response= await fetch('http://localhost:3200/agregarPrograma',{
        const response= await fetch(API+'/agregarPrograma',{
            method:'POST',
            body: form,
            headers:{
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }

            })
            .then((res)=>res.json())
            .then((data)=>{dato=data})

            

            if(dato.message==='jwt malformed'){

                alert('La sesión ha sido cerrada');
                window.location.href='../'
            }else{

                if(dato==='Sesión expirada'){
                    alert(dato);
                    window.location.href='../'
                } else{
                    alert(dato.mensaje);
                    window.location.reload();
                }
            }

        
        } 

    const visitarAdmins = ()=>{
        window.location.href='../administradores'
    }

    const verRegistros = ()=>{
        window.location.href='../programas'
    }



    const traerProgramasAdmin= async()=>{
        
        //let programas= await fetch("http://localhost:3200/traerProgramasAdmin")
        let programas= await fetch(API+"/traerProgramasAdmin")
        .then((res)=>res.json())
        .then(data=>{setConsulta(data)})
        .catch(error => console.log("Se ha producido un error... " +error));
            return programas;
        }


    useEffect(()=>{
        traerProgramasAdmin();
            
    },[])






    const eliminarPrograma = async() => {
        let programaId = localStorage.getItem('programaId');
        let nombreCorto = localStorage.getItem('nombreCorto');
       
        const form = JSON.stringify({
            "programaId":programaId,
            "nombreCorto":nombreCorto
        })

        //const response = await fetch('http://localhost:3200/eliminarPrograma',{
        const response = await fetch(API+"/eliminarPrograma",{
            method:"DELETE",
            body:form,
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}` 
              
            }
        })

        .then((res)=>res.json())
        .then((data)=>{resEliminarPrograma=data})


        if(resEliminarPrograma.message==='jwt malformed'){

            alert('La sesión ha sido cerrada');
            window.location.href='../'
        }else{

            if(resEliminarPrograma==='Sesión expirada'){
                alert(resEliminarPrograma);
                window.location.href='../'
            } else{
                alert(resEliminarPrograma);
                window.location.reload();
            }
        }

        

    }

    const redirigirPass = ()=>{
        window.location.href='../pass'
    }

    



    return(

        <Fragment>

       
                
                <section class='contornoAdmin' id='contornoAdmin'></section>

                    <Llave aplicarContorno={mostrar}/>
                     <section id="sec-btn-admin">
                        <button type="button" id='btn-admin' class="btn-admin" onClick={mostrar}>
                            <FontAwesomeIcon icon={faSquarePlus} id='icon-login'/>
                            <span id='span-admin'>Generar Programa</span>
                        </button>
                        <button type="button" id='btn-admin1' class="btn-admin" onClick={mostrar}>
                            <FontAwesomeIcon icon={faTrashCan} id='icon-login'/>
                            <span id='span-admin'>Borrar Programa</span>
                        </button>

                        <button type="button" id='btn-admin3' class="btn-admin" onClick={verRegistros}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} id='icon-login'/>
                            <span id='span-admin4'>Visualizar Registros</span>
                        </button>
                        <button type="button" id='btn-admin4' class="btn-admin"  onClick={mostrar}>
                            <FontAwesomeIcon icon={faUserPlus} id='icon-login'/>
                            <span id='span-admin4'>Generar Admin</span>
                        </button>
                        <button type="button" id='btn-admin5' class="btn-admin"  onClick={visitarAdmins}>
                            <FontAwesomeIcon icon={faUserMinus} id='icon-login'/>
                            <span id='span-admin4'>Eliminar Admin</span>
                        </button>
                </section>

                


            <form id='form-info'method='POST' class="form-programa" encType="multipart/form-data" onSubmit={(event)=>{agregarPrograma(event)}}>
                <section id="sec1-form-info">
                    <p class='titulo-form-admin'>Complete los datos del Programa</p>
                    
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre del Programa...' name="nombre"/>
                    </div>
            
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre corto...' name="nombreCorto"/>
                    </div>
                    
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default">Vencimiento UBA</span>
                        <input type="date" required class="form-control" id='vtoUBA' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Vencimiento UBA...' name="nomCient"/>
                    </div>
                    
                    <div class="mb-3" id='file-form-info'>
                        <label for="formFile" class="form-label" id='label-formFile'>Imagen</label>
                        <input class="form-control" type="file" id="formFile" name='imagen' onChange={handleChange} required/>
                    </div> 

                    <div class="documentacion" id='documentacion'>
                        <p id='p-documentacion'>Documentación requerida</p>
                        <div>
                            <input type="checkbox" class="item-documentación" id='item1-documentación' />
                            <label for="item1-documentación" class="label-documentacion">Aval Decano</label>
                        </div>
                        <div>
                            <input type="checkbox" class="item-documentación" id='item4-documentación' />
                            <label for="item4-documentación" class="label-documentacion">Aval ORI</label>
                        </div>
                        <div>
                            <input type="checkbox" class="item-documentación" id='item2-documentación' />
                            <label for="item2-documentación" class="label-documentacion">Carta de invitación</label>
                        </div>
                        <div>
                            <input type="checkbox" class="item-documentación" id='item3-documentación' />
                            <label for="item3-documentación" class="label-documentacion">Currículum</label>
                        </div>
                    </div>                    
                </section>                
                <div class='div-btns-info'>
                    <button type='button' id='btn-cerrar-info' class="btn-cerrar-info" onClick={ocultar}><FontAwesomeIcon icon={faXmark}/></button>
                    <button type="submit" id='btn-submit0' class="btn-submit"><FontAwesomeIcon icon={faCheck} /></button>
                </div>
                
            </form>


            <form id='form-admin'method='POST' class="form-admin" ref={form} onSubmit={(event)=>{agregarAdmin(event)}}>
                <section id="sec1-form-info">
                    <p class='titulo-form-admin'>Ingrese los datos del nuevo administrador</p>
                    
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre...' name="nombre" onChange={(event) => setNombre(event.target.value)}/>
                    </div>
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Apellido...' name="apellido"/>
                    </div>
                    <div class="input-group">
                    <span class="input-group-text" ></span>
    
                        <select class="form-select" required>
                            <option selected value=''>Unidad académica...</option>
                            <option value="Agronomía">Agronomía</option>
                            <option value="Arquitectura, Diseño y Urbanismo">Arquitectura, Diseño y Urbanismo</option>
                            <option value="Ciencias Económicas">Ciencias Económicas</option>
                            <option value="Ciencias Exactas y Naturales">Ciencias Exactas y Naturales</option>
                            <option value="Ciencias Sociales">Ciencias Sociales</option>
                            <option value="Ciencias Veterinarias">Ciencias Veterinarias</option>
                            <option value="Derecho">Derecho</option>
                            <option value="Farmacia y Bioquímica">Farmacia y Bioquímica</option>
                            <option value="Filosofía y Letras">Filosofía y Letras</option>
                            <option value="Ingeniería">Ingeniería</option>
                            <option value="Medicina">Medicina</option>
                            <option value="Odontología">Odontología</option>
                            <option value="Psicología">Psicología</option>
                            <option value="Rectorado">Rectorado</option>
                        </select>
                    </div>
                    <div class="input-group" id='nivel'>
                        <span class="input-group-text" ></span>
                        <select class="form-select" required>
                            <option selected value=''>Nivel de administrador...</option>

                            {adminNivel == 0?
                            <option value="1">1 (Admin Rectorado)</option>
                            :""}
                            <option value="2">2 (Admin Facultad)</option>
                        </select>
                    </div>
                    <div class="input-group mb-3" id='email'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="email" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='E-mail...'  name="mail" onChange={(event) => setMail(event.target.value)}/>
                    </div>
                    <div class="input-group mb-3" id='usuario'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre de usuario...' name="usuario" onChange={(event) => setUsuario(event.target.value)}/>
                    </div>
                                       
                </section>                
                <div class='div-btns-info-admin'>
                    <button type='button' id='btn-cerrar-admin' class="btn-cerrar-info" onClick={ocultar}><FontAwesomeIcon icon={faXmark}/></button>
                    <button type="submit" id='btn-submit0' class="btn-submit"><FontAwesomeIcon icon={faCheck} /></button>
                </div>
            </form>

            {esconder===false?
            <section class='mapProgramasAdmin' id='mapProgramasAdmin'>    
                <h4 class='tituloProgramas'>Seleccione el Programa que desea eliminar</h4>

                <section class="contenedorProgramas">
                    {consulta.map((dato)=>{                            
                        return <CardProgramas key={dato.id} info={dato} idTarjetaEliminar={'tarjetaEliminarPrograma'} setEsconder={setEsconder}/>
                    })}
                 </section> 
                 <button type='button' id='btn-XeliminarPrograma1' onClick={ocultar}><FontAwesomeIcon icon={faXmark} /></button>
            </section>

            : ''}

            <section class='tarjetaEliminar' id='tarjetaEliminarPrograma'>
                <h5 class='h5Eliminar'>Esta acción eliminará también los archivos vinculados al Programa</h5>
                <div id='div-btns'>
                    <button type='button' id='btn-XeliminarPrograma' onClick={ocultar}><FontAwesomeIcon icon={faXmark} /></button>
                    <button type="submit" class='btnEliminar'><FontAwesomeIcon icon={faCheck} onClick={eliminarPrograma}/></button>
                </div>
            </section>

            <section class='tarjetaEliminar' id='tarjetaPass'>
                <h5 class='h5Eliminar'>¿Desea actualizar su contraseña?</h5>
                <div id='div-btns'>
                    <button type='button' id='btnXpass' onClick={ocultar}><FontAwesomeIcon icon={faXmark} /></button>
                    <button type="submit" class='btnEliminar' onClick={redirigirPass}><FontAwesomeIcon icon={faCheck} /></button>
                </div>
            </section>
        

        </Fragment> 


    )
}
