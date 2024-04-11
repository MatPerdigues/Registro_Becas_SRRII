import { Fragment } from 'react'
import './recPass.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey,faCheck,faXmark,faUser} from '@fortawesome/free-solid-svg-icons'
const API = process.env.REACT_APP_BACKEND_URL;



export default function RecPass(){


    const recuperarPass = async(event)=>{
        event.preventDefault();

        let dato = '';
        let usuario=event.target[0].value;
        let password=event.target[1].value;
        let nuevaPass1 = event.target[2].value;
        let nuevaPass2 = event.target[3].value;
        
        if(nuevaPass1.length<6 || nuevaPass2.length<6){
            document.getElementById("form-pass1").reset()
            return(alert('Error: la nueva contraseña debe contener al menos 6 caracteres'))
            
        }
        
        if(nuevaPass1===nuevaPass2){
            let nuevaPass=nuevaPass1;
        
            const form = JSON.stringify({
                "usuario":usuario,
                "password":password,
                "nuevaPass":nuevaPass             
                
            })

                const response = await fetch(API+"/recuperarPass",{
                //const response = await fetch("http://localhost:3200/recuperarPass",{

                    method:"POST",
                    body:form,
                    headers:{
                       //"Authorization": `Bearer ${localStorage.getItem("token")}`,
                        
                        'Content-Type':'application/json'
                    }})
            
                    .then((res)=>res.json())
                    .then((data)=>{dato=data})
    
                    alert(dato.mensaje);
                    document.getElementById("form-pass1").reset()

            }else{
                alert ('La nueva contraseña debe coincidir en ambos campos');
                document.getElementById("form-pass1").reset()
            } 

            
        
    }


    return(

        <Fragment>
            <section class='form_contanier'>
                
                               
                    <form id='form-pass1' method='POST' onSubmit={(event)=>{recuperarPass(event)}}>
                        <section id='sec-datos-pass'>
                            <h4 id='titulo-login'>Actualizar contraseña</h4>
                            <div>
                                <div class="input-group mb-3" id='input-login3'>
                                    <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faUser}/></span>
                                    <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Ingrese su nombre de usuario...' name="user"/>
                                </div>
                                <div class="input-group mb-3" id='input-login1'>
                                    <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faKey}/></span>
                                    <input type="password" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Ingrese la contraseña proporcionada...' name="user"/>
                                </div>
                                <div class="input-group mb-3" id='input-login2'>
                                    <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faKey}/></span>
                                    <input type="password" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Ingrese la nueva contraseña...' name='password'/>
                                </div>
                                <div class="input-group mb-3" id='input-login2'>
                                    <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faKey}/></span>
                                    <input type="password" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Repita la nueva contraseña...' name='password'/>
                                </div>
                            </div>
                            <div id='div-btns'>
                                <button type="submit" id='btn-submit'><FontAwesomeIcon icon={faCheck}/></button>
                            </div>


                        </section>
                    </form>

             
            </section>

        </Fragment>

    )


}


