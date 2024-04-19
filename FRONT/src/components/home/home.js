
import './home.css';
import {Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey,faUser,faCheck,faXmark,faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react';
import emailjs from '@emailjs/browser';
const API = process.env.REACT_APP_BACKEND_URL;



export default function Home() {

   
    
    
    let dato='';
    let baseClave='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?,;-_¡!¿*%&$/()[]{}|@><';
    let lengthClave=8;
    const[nombre,setNombre]=useState('');
    const[usuario,setUsuario]=useState('');
    const[mail,setMail]=useState('');

   
    

    const contorno = ()=>{
 
        document.getElementById(`contornoEliminar`).style.display='block';
        document.getElementById(`tarjetaPass1`).style.display='block';
        //document.getElementById('form-login').style.display='none';
        document.getElementById('sec-datos-login').style.display='none';
    }

    const spinner = ()=>{
        document.getElementById('form-login').style.display='none';
        //document.getElementById(`contornoLogin`).style.display='flex';
        document.getElementById(`contenedorSpinner`).style.display='block';
    }

    const ocultar=()=>{
        document.getElementById(`contornoEliminar`).style.display='none';
        document.getElementById(`tarjetaPass1`).style.display='none';
        document.getElementById('form-login').style.display='flex';
        document.getElementById('sec-datos-login').style.display='block';
    }


    
    
    const login = async(event)=>{
        event.preventDefault()

               
         const formLogin = JSON.stringify({
            "usuario":event.target[0].value,
            "password":event.target[1].value,
            
        })

       

        spinner();
        
        //const response = await fetch("http://localhost:3200/login",{
        const response = await fetch(API+"/login",{
        method:"POST",
        body:formLogin,
        headers:{
            //"Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        .then((data)=>{dato=data})
        .catch(error => alert("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));
        


         if(dato.mensaje === "Usuario logeado correctamente!"){

            sessionStorage.setItem('log','true');

            if(dato.nivel === '1' || dato.nivel === '0'){

                window.location.href='../admin1';

            } else{

                window.location.href='../programas';

            }

            sessionStorage.setItem('gestor',dato.gestor);
            sessionStorage.setItem('adminNivel',dato.nivel);
            sessionStorage.setItem("facultad",dato.facultad)
            sessionStorage.setItem('token',dato.claveToken);
            sessionStorage.setItem('nombre',dato.nombre);
            sessionStorage.setItem('apellido',dato.apellido);
            sessionStorage.setItem('mail',dato.mail);
    
            

        } else{
            alert(dato.mensaje);
            window.location.reload();
        }
 
        
     }

 

    const limpiar = event=> {
    document.getElementById("form-login").reset()
    }





    const loginPass = async(event)=>{
        
        event.preventDefault();

        let clave='';
        let usuario = event.target[0].value;
        
        const serviceId = 'service_3o1n3ps';
        const templateId = 'template_vw32n8k';
        const publicKey= '5yzZimEw4Rf97xil4';

        let exp_pass = new Date();
        exp_pass.setMinutes(exp_pass.getMinutes()+30);

        for(let x=0; x < lengthClave; x++){
            let random = Math.floor(Math.random() * baseClave.length);
            clave = clave + baseClave.charAt(random);
        }
          
        
        const formLogin = JSON.stringify({
            "usuario":usuario,
            "password":clave,
            "exp_pass":exp_pass
        })

  
        //const response = await fetch("http://localhost:3200/enviarPass",{
        const response = await fetch(API+"/enviarPass",{
        method:"POST",
        body:formLogin,
        headers:{
           // "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        .then((data)=>{dato=data})
        .catch(error => alert("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));

        console.log(dato);

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
    
    
            alert(`Se ha enviado un correo electrónico a la dirección ${dato.mail}`);
    
            window.location.reload();
    
            
            document.getElementById("form-pass1").reset();
    
            document.getElementById("tarjetaPass1").style.display="none";
            document.getElementById("contornoEliminar").style.display="none";
    
        }else{
            alert(dato.mensaje);
            window.location.reload();
        }
    }


    


    return (
        <Fragment>
            
            <section class='contornoEliminar' id='contornoEliminar'></section>

             <section class='contenedorSpinner' id='contenedorSpinner'>
                <div class="spinner" id='spinner'></div>
                <div><h6 class='h6spinner'>Conectando, esto puede demorar hasta 60 segundos...</h6></div>
             </section>
            

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
