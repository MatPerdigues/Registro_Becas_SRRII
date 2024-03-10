import './home.css';
import {Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey,faUser,faCheck,faXmark,faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react';
import emailjs from '@emailjs/browser';


export default function Home() {

    
    
    let dato='';
    let baseClave='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?,;-_¡!¿*%&$/()[]{}|@><';
    let lengthClave=8;
    const[nombre,setNombre]=useState('');
    const[usuario,setUsuario]=useState('');
    const[mail,setMail]=useState('');

   
    

    const contorno = ()=>{
        document.getElementById(`contornoAdmin`).style.display='block';
        document.getElementById(`tarjetaPass1`).style.display='block';
    }

    const ocultar=()=>{
        document.getElementById(`contornoAdmin`).style.display='none';
        document.getElementById(`tarjetaPass1`).style.display='none';
    }


    
    
    const login = async(event)=>{
        event.preventDefault()
        
        const formLogin = JSON.stringify({
            "usuario":event.target[0].value,
            "password":event.target[1].value,
            
        })
        
        const response = await fetch("http://localhost:3200/login",{
        method:"POST",
        body:formLogin,
        headers:{
           // "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        .then((data)=>{dato=data})
        .catch(error => console.log("Se ha producido un error... " +error));

        console.log(dato.mensaje);

         if(dato.mensaje === "Usuario logeado correctamente!"){

            if(dato.nivel === '1' || dato.nivel === '0'){

                window.location.href='../admin1';

            } else{

                window.location.href='../programas';

            }

            localStorage.setItem('gestor',dato.gestor);
            localStorage.setItem('adminNivel',dato.nivel);
            localStorage.setItem("facultad",dato.facultad)
            localStorage.setItem('token',dato.claveToken);
            localStorage.setItem('nombre',dato.nombre);
            localStorage.setItem('apellido',dato.apellido);
            localStorage.setItem('mail',dato.mail);
    
            

        } else{
            alert(dato.mensaje);
        }

        document.getElementById("form-login").reset();  
     }


     


       
    const limpiar = event=> {
    document.getElementById("form-login").reset()
    }





    const loginPass = async(event)=>{
        
        event.preventDefault();

        let clave='';
        let usuario = event.target[0].value;

        for(let x=0; x < lengthClave; x++){
            let random = Math.floor(Math.random() * baseClave.length);
            clave = clave + baseClave.charAt(random);
        }
        
        event.preventDefault();

        const serviceId = "service_3o1n3ps";
        const templateId = "template_i2okhu7";
        const publicKey= "5yzZimEw4Rf97xil4";

        
        const formLogin = JSON.stringify({
            "usuario":usuario,
            "password":clave
          
            
        })

  
        const response = await fetch("http://localhost:3200/enviarPass",{
        method:"POST",
        body:formLogin,
        headers:{
           // "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        .then((data)=>{dato=data})

        if(dato.mensaje=='Contraseña actualizada correctamente'){
            
            
            const templateParams={
                nombre:dato.nombre,
                usuario:dato.usuario,
                mail:dato.mail,
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
    
    
            alert(`Se ha enviado una nueva contraseña a la dirección ${dato.mail}`);
    
            
    
            
            document.getElementById("form-pass1").reset();
    
            document.getElementById("tarjetaPass1").style.display="none";
            document.getElementById("contornoAdmin").style.display="none";
    
        }else{
            alert(dato.mensaje);
        }
    }


    


    return (
        <Fragment>
            
            <section class='contornoAdmin' id='contornoAdmin'></section>
             
             <form id='form-login'method='POST' onSubmit={(event)=>{login(event)}}>  
            
       
                <section id='sec-datos-login'>
                    <h4 id='titulo-login'>Ingrese sus datos de acceso</h4>
                    <div>
                        <div class="input-group mb-3" id='input-login1'>
                            <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faUser}/></span>
                            <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre de usuario...' name="user"/>
                        </div>
                        <div class="input-group mb-3" id='input-login2'>
                            <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faKey}/></span>
                            <input type="password" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Contraseña...' name='password'/>
                        </div>
                    </div>
                    <div id='div-btns'>
                        <button type='button' id='btn-submit1'><FontAwesomeIcon icon={faXmark} onClick={limpiar}/></button>
                        <button type="submit" id='btn-submit'><FontAwesomeIcon icon={faCheck}/></button>
                    </div>
                    <section class='secRecuperacion' onClick={contorno}>
                        <div class='divIconRecuperacion'><FontAwesomeIcon icon={faPaperPlane} /></div>
                        <div class='divRecuperacion'><h6 class='h6Recuperacion'>Recuperar contraseña</h6></div>

                    </section>
            
                </section>
            </form>

            <section class='tarjetaEliminar' id='tarjetaPass1'>
          
                    <h5 class='h5Eliminar'>Ingrese su nombre de usuario</h5>
                        <form id='form-pass1'method='POST' onSubmit={(event)=>{loginPass(event)}}>
                            <div class="input-group mb-3" id='input-pass1'>
                                <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faUser}/></span>
                                <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre de usuario...' name="user"/>
                            </div>
                            <div id='div-btns'>
                                <button type='button' id='btnXpass' onClick={ocultar}><FontAwesomeIcon icon={faXmark} /></button>
                                <button type="submit" class='btnEliminar'><FontAwesomeIcon icon={faCheck} /></button>
                            </div>
                        </form>
              
            </section>
            
                
        </Fragment>
    )
}
