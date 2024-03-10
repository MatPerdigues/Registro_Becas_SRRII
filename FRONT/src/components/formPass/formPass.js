import { Fragment } from 'react';
import './formPass.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey,faPaperPlane,faCheck,faXmark} from '@fortawesome/free-solid-svg-icons'

export default function Pass () {

    let dato = '';
    let nivel = localStorage.getItem('adminNivel')


    const limpiarPass = event=> {
         document.getElementById("form-pass").reset();
         if(nivel==2){
            window.location.href='../programas';
        }else{
            window.location.href='../admin1';
        }

        }



    const loginPass = async(event)=>{
    
        event.preventDefault();

        let nivel = localStorage.getItem('adminNivel');
        let usuario = localStorage.getItem('gestor');
        let password=event.target[0].value;
        let nuevaPass1 = event.target[1].value;
        let nuevaPass2 = event.target[2].value;
        
        if(nuevaPass1===nuevaPass2){
            let nuevaPass=nuevaPass1;

            const formLogin = JSON.stringify({
                "usuario":usuario,
                "password":password,
                "nuevaPass":nuevaPass
                
            })

            const response = await fetch("http://localhost:3200/nuevaPass",{
                method:"POST",
                body:formLogin,
                headers:{
                   "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    
                    'Content-Type':'application/json'
                }})
        
                .then((res)=>res.json())
                .then((data)=>{dato=data})


                alert(dato.mensaje);
                document.getElementById("form-pass").reset()

                if(dato.mensaje==="Contraseña actualizada correctamente"){
                    if(nivel==2){
                        window.location.href='../programas';
                    }else{
                        window.location.href='../admin1';
                    }
                }  
             


        } else{
            alert ('La nueva contraseña debe coincidir en ambos campos');
            document.getElementById("form-pass").reset()

        }


    }    



    


    return(
        <Fragment>

            
            <form id='form-pass'method='POST' onSubmit={(event)=>{loginPass(event)}}>

                
                <section id='sec-datos-pass'>
                <h4 id='titulo-login'>Actualizar contraseña</h4>
                    
                    <div>
                        <div class="input-group mb-3" id='input-login1'>
                            <span class="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faKey}/></span>
                            <input type="password" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Ingrese su contraseña...' name="user"/>
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
                        <button type='button' id='btn-submit1'onClick={limpiarPass}><FontAwesomeIcon icon={faXmark} /></button>
                        <button type="submit" id='btn-submit' ><FontAwesomeIcon icon={faCheck}/></button>
                    </div>

            
                </section>
            </form>


        </Fragment>
    )
}