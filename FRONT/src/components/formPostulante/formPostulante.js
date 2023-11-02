import './formPostulante.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faIdCard,faEnvelope,faUser,faXmark,faCheck,faPassport,faFileSignature,faFileLines} from '@fortawesome/free-solid-svg-icons'


export default function FormPostulante() {

    let aval =  localStorage.getItem("aval");
    let invitacion =  localStorage.getItem("invitacion");
    let cv =  localStorage.getItem("cv");
    let programa =  localStorage.getItem("programa");
    let avalORI =  localStorage.getItem("avalORI");


/*     if(aval==='false'){
        document.getElementById('avalPostulante').style.display='none'
    }

    if(invitacion==='false'){
        document.getElementById('invitacionPostulante').style.display='none'
    }

    if(cv==='false'){
        document.getElementById('cvPostulante').style.display='none'
    }
 */

    let respuesta = "";


    const ocultar= event=>{
        window.location.href='../programas';
    }
    
    
    const agregarPostulante = async(event)=>{
        event.preventDefault();

        const fecha = new Date();
        const yearActual = fecha.getFullYear();
        const hoy = fecha.getDate();
        const mesActual = fecha.getMonth() + 1;

        let fecha_registro = hoy+'-'+mesActual+'-'+yearActual;

        console.log(fecha_registro);
        
        const formLogin = JSON.stringify({
            "nombre":event.target[0].value,
            "dni":event.target[1].value,
            "email":event.target[2].value,
            "facultad":localStorage.getItem("facultad"),
            "programa": localStorage.getItem("programa"),
            "fecha_registro":fecha_registro,
            "año_registro":yearActual
            
        })
        
        const response = await fetch("http://localhost:3200/agregarPostulante",{
        method:"POST",
        body:formLogin,
        headers:{
           // "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        //.then(data=>{setRespuesta(data)})
        .then((data)=>{respuesta=data});

        console.log(respuesta)
        alert(respuesta.mensaje);

        document.getElementById("formSumarPostulante").reset();

        document.getElementById("formSumarPostulante").style.display="none"; 


    }






    return(

        <Fragment>

            <h3 class='programaFormPostulante'>{programa}</h3>

            <form class="formSumarPostulante" id='formSumarPostulante' onSubmit={(event)=>{agregarPostulante(event)}}>
                
                <h4 id='titulo-login' class="h4Postulante">Complete la información del postulante</h4>
                
                <div class="input-group mb-3" id='inputPostulante'>
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser}/></span>
                    <input type="text" class="form-control" placeholder="Nombre y apellido..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                 
                <div class="input-group mb-3" id='inputPostulante'>
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faPassport}/></span>
                    <input type="number" class="form-control" placeholder="DNI (solo números)..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                
                <div class="input-group mb-3" id='inputPostulante'>
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope}/></span>
                    <input type="text" class="form-control" placeholder="E-mail..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                {aval==='true'?

                <section id='avalPostulante'>
                    <section class="tituloDocumentacion">
                        <div class="div1-documentacion"></div>
                        <p class="pDocumentacion">Aval Decano/a</p>
                        <div class="div2-documentacion"></div>
                    </section>

                    <div class="mb-3" id='aval'>
                        <span class="input-group-text" id="iconFile"><FontAwesomeIcon icon={faFileLines}/></span>
                        <input class="form-control" type="file" id="formFile" required />
                    </div>
                </section>

                :''}


                {avalORI==='true'?

                <section id='avalORIPostulante'>
                    <section class="tituloDocumentacion">
                        <div class="div1-documentacion"></div>
                        <p class="pDocumentacion">Aval ORI</p>
                        <div class="div2-documentacion"></div>
                    </section>
                    <div class="mb-3" id='aval'>
                        <span class="input-group-text" id="iconFile"><FontAwesomeIcon icon={faFileLines}/></span>
                        <input class="form-control" type="file" id="formFile" required/>
                    </div>
                </section>

                :''}

                {invitacion==='true'?
                
                <section id='invitacionPostulante'>
                    <section class="tituloDocumentacion">
                        <div class="div1-documentacion"></div>
                        <p class="pDocumentacion">Invitación</p>
                        <div class="div2-documentacion"></div>
                    </section>

                    <div class="mb-3" id='aval'>
                        <span class="input-group-text" id="iconFile"><FontAwesomeIcon icon={faFileSignature}/></span>
                        <input class="form-control" type="file" id="formFile" required/>
                    </div>
                </section>

                :''}


                {cv==='true'?

                <section id='cvPostulante'>
                    <section class="tituloDocumentacion">
                        <div class="div1-documentacion"></div>
                        <p class="pDocumentacion">CV</p>
                        <div class="div2-documentacion"></div>
                    </section>
                    <div class="mb-3" id='aval'>
                        <span class="input-group-text" id="iconFile"><FontAwesomeIcon icon={faIdCard}/></span>
                        <input class="form-control" type="file" id="formFile" required/>
                    </div>
                </section>

                :''}


                
                <section id='div-btns' class="btns-sumPostulante">
                    <button type='button' id='btn-submit1'><FontAwesomeIcon icon={faXmark} onClick={ocultar}/></button>
                    <button type="submit" id='btn-submit'><FontAwesomeIcon icon={faCheck}/></button>
                </section>

            </form>  

        </Fragment>

    )
}