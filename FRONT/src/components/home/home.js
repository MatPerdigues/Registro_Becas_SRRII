import './home.css';
import {Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKey,faUser,faCheck,faXmark} from '@fortawesome/free-solid-svg-icons'

export default function Home() {

    let dato="";


    const login = async(event)=>{
        
        event.preventDefault();
        
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

        localStorage.setItem("facultad",dato.facultad)
        
        
                
        if(dato.mensaje === "Usuario logeado correctamente!"){
            
            if(dato.nivel === '1' || dato.nivel === '0'){
                
                window.location.href='../admin1';
                
            } else{
                
                window.location.href='../programas';
                
            }

            localStorage.setItem('gestor',dato.gestor);
            localStorage.setItem('adminNivel',dato.nivel);

        } else{
            alert(dato.mensaje);
        }
        
        document.getElementById("form-login").reset();

        

    }

    const limpiar = event=> { 
        
       
        document.getElementById("form-login").reset()}



    return (
        <Fragment>
            
             
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
            
                </section>
            </form>
            
                
        </Fragment>
    )
}
