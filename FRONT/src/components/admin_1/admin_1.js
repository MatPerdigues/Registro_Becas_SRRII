import './admin_1.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus,faTrashCan,faPenToSquare,faMagnifyingGlass,faXmark,faCheck,faUserPlus,faUserMinus} from '@fortawesome/free-solid-svg-icons'
import { useRef, useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import CardProgramas from '../cardProgramas/cardProgramas';





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
    
    
    const handleChange=(event)=>{
        setImg(event.target.files[0]);
    }

    const aplicarContorno = ()=>{
        document.getElementById("contornoAdmin").style.display="flex";
        document.getElementById('btn-admin').style.zIndex='-1'
        document.getElementById('btn-admin1').style.zIndex='-1'
        document.getElementById('btn-admin2').style.zIndex='-1'
        document.getElementById('btn-admin3').style.zIndex='-1'
        document.getElementById('btn-admin4').style.zIndex='-1'
        document.getElementById('btn-admin5').style.zIndex='-1'
    }

    const quitarContorno=()=>{
        document.getElementById("contornoAdmin").style.display="none";
        document.getElementById('btn-admin').style.zIndex='0'
        document.getElementById('btn-admin1').style.zIndex='0'
        document.getElementById('btn-admin2').style.zIndex='0'
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
            console.log('deberia aparece la info')
            document.getElementById("form-info").style.display="none";
            document.getElementById("form-admin").style.display="none";
            
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
    }
    
    


    const agregarAdmin = async(event)=>{

         let clave='';

        for(let x=0; x < lengthClave; x++){
            let random = Math.floor(Math.random() * baseClave.length);
            clave = clave + baseClave.charAt(random);
        }
        
        event.preventDefault();

        const serviceId = "service_3o1n3ps";
        const templateId = "template_i2okhu7";
        const publicKey= "5yzZimEw4Rf97xil4";

       

        
        const formSumarAdmin = JSON.stringify({
            "nombre":event.target[0].value,
            "apellido":event.target[1].value,
            "unidad_academica":event.target[2].value,
            "nivel":event.target[3].value,
            "mail":event.target[4].value,
            "usuario":event.target[5].value,
            "password":clave
            //generarPassword()
        })
        
        const response = await fetch("http://localhost:3200/agregarAdmin",{
        method:"POST",
        body:formSumarAdmin,
        headers:{
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        .then((data)=>{dato=data})

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


        alert(dato);

        quitarContorno();

        
        document.getElementById("form-admin").reset();

        document.getElementById("form-admin").style.display="none";

    }



    const agregarPrograma = async(event)=>{
        event.preventDefault();
        

        let check1 = document.getElementById("item1-documentación");
        let check2 = document.getElementById("item2-documentación");
        let check3 = document.getElementById("item3-documentación");
        let check4 = document.getElementById("item4-documentación");
        

        console.log(check1.checked)
        console.log(check2.checked)
        console.log(check3.checked)

        console.log(img);
        

        let formatoFecha = event.target[2].value.split("-")
        let dia = formatoFecha[2];
        let mes = formatoFecha[1];
        let year = formatoFecha[0];
        let vencimientoPublic = dia+'-'+mes+'-'+year;


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

               


    const response= await fetch('http://localhost:3200/agregarPrograma',{
        method:'POST',
        body: form,
        headers:{
           // "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
                     
        })
        .then((res)=>res.json())
        .then((data)=>{dato=data})
        console.log(dato);
        alert(dato);

        window.location.reload();

 
    
    } 

    const visitarAdmins = ()=>{
        window.location.href='../administradores'
    }



    const traerProgramasAdmin= async()=>{
        
        let programas= await fetch('http://localhost:3200/traerProgramasAdmin')
        
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

        const response = await fetch('http://localhost:3200/eliminarPrograma',{
            method:"DELETE",
            body:form,
            headers:{
                'Content-Type':'application/json',
                /* "Authorization": `Bearer ${localStorage.getItem("token")}` */
              
            }
        })

        .then((res)=>res.json())
        .then((data)=>{resEliminarPrograma=data})

        alert(resEliminarPrograma);

        window.location.reload();
        

    }

    



    return(

        <Fragment>

       
                
                <section class='contornoAdmin' id='contornoAdmin'></section>
                     <section id="sec-btn-admin">
                        <button type="button" id='btn-admin' class="btn-admin" onClick={mostrar}>
                            <FontAwesomeIcon icon={faSquarePlus} id='icon-login'/>
                            <span id='span-admin'>Nuevo Programa</span>
                        </button>
                        <button type="button" id='btn-admin1' class="btn-admin" onClick={mostrar}>
                            <FontAwesomeIcon icon={faTrashCan} id='icon-login'/>
                            <span id='span-admin'>Borrar Programa</span>
                        </button>
                        <button type="button" id='btn-admin2' class="btn-admin">
                            <FontAwesomeIcon icon={faPenToSquare} id='icon-login'/>
                            <span id='span-admin3'>Editar Programa</span>
                        </button>
                        <button type="button" id='btn-admin3' class="btn-admin">
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

                


            <form id='form-info'method='POST' class="form-programa" onSubmit={(event)=>{agregarPrograma(event)}}>
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
                            <option value="1">1</option>
                            <option value="2">2</option>
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
        

        </Fragment> 


    )
}
