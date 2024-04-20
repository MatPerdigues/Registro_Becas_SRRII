import './formPostulante.css';
import { Fragment } from 'react';
import { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faIdCard,faEnvelope,faUser,faXmark,faCheck,faPassport,faFileSignature,faFileLines} from '@fortawesome/free-solid-svg-icons'
const API = process.env.REACT_APP_BACKEND_URL;


export default function FormPostulante() {

    let aval =  sessionStorage.getItem("aval");
    let invitacion =  sessionStorage.getItem("invitacion");
    let cv =  sessionStorage.getItem("cv");
    let programa =  sessionStorage.getItem("programa");
    let avalORI =  sessionStorage.getItem("avalORI");
    let nombreCorto =  sessionStorage.getItem("nombreCorto");
    
    let respuesta = "";
    
    let archivoAval={};
    let archivoInvitacion={};
    let archivoCV={};
    let archivoAvalOri={};
    let[errorCon,setErrorCon]=useState('');




    
   

    const handleChangeAval=(event)=>{
        archivoAval=event.target.files[0];
        console.log(archivoAval)
    };

    const handleChangeInvitacion=(event)=>{
        archivoInvitacion=event.target.files[0];
        console.log(archivoInvitacion)
    };

    const handleChangeCV=(event)=>{
        archivoCV=event.target.files[0];
        console.log(archivoCV)
    };

    const handleChangeAvalORI=(event)=>{
        archivoAvalOri=event.target.files[0];
        console.log(archivoAvalOri)
    };
    
    
    
    const ocultar= event=>{
        window.location.href='../programas';
    }
    
    
    const agregarPostulante = async(event)=>{
        event.preventDefault();


        let dni = event.target[2].value;
        
        let result = dni.search(/[^0-9]/ig);

        if(result>0){
            return(alert('Error: el DNI debe contener solo números'))
        }


        const fecha = new Date();
        const yearActual = fecha.getFullYear();
        const hoy = fecha.getDate();
        const mesActual = fecha.getMonth() + 1;

        let fecha_registro = hoy+'-'+mesActual+'-'+yearActual;


     
        
        const formPostulante = new FormData();
            

            formPostulante.append("nombre",event.target[0].value);
            formPostulante.append("apellido",event.target[1].value);
            formPostulante.append("dni",event.target[2].value);
            formPostulante.append("email",event.target[3].value);
            formPostulante.append("facultad",sessionStorage.getItem("facultad"));
            formPostulante.append("programa", sessionStorage.getItem("programa"));
            formPostulante.append('programaId', sessionStorage.getItem('programaId'));
            formPostulante.append('gestor', sessionStorage.getItem('gestor'));
            formPostulante.append("fecha_registro",fecha_registro);
            formPostulante.append("year_registro",yearActual); 
            formPostulante.append("nombreCorto",nombreCorto); 
            formPostulante.append('aval',archivoAval);
            formPostulante.append('avalORI',archivoAvalOri);
            formPostulante.append('invitacion',archivoInvitacion);
            formPostulante.append('cv',archivoCV);
            
        
        
        
        const response = await fetch(API +"/agregarPostulante",{
        //const response = await fetch("http://localhost:3200/agregarPostulante",{
        method:"POST",
        body:formPostulante,
        headers:{
           "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            
           
        }})

        .then((res)=>res.json())        
        .then((data)=>{respuesta=data})
        .catch(error => setErrorCon("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));
        
        if(errorCon){
            alert(errorCon);
            window.location.href='../'
        }


        
        if(respuesta.message==='jwt malformed'){

            alert('La sesión ha sido cerrada');
            window.location.href='../'
        }else{

            if(respuesta==='Sesión expirada'){
                alert(respuesta);
                window.location.href='../'
            } else{
                alert(respuesta.mensaje);
                document.getElementById("formSumarPostulante").reset();

                window.location.href='../programas';
            }
        }


        
    }
        
        
    
    
    

    return(

        <Fragment>

            <h3 class='programaFormPostulante'>{programa}</h3>

            <form class="formSumarPostulante" id='formSumarPostulante' method='POST' encType="multipart/form-data" onSubmit={(event)=>{agregarPostulante(event)}}> 
                
                <h4 id='titulo-login' class="h4Postulante">Complete la información del postulante</h4>
                
                <div class="input-group mb-3" id='inputPostulante'>
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser}/></span>
                    <input type="text" class="form-control" placeholder="Nombre(s)..." aria-label="Username" aria-describedby="basic-addon1" required/>
                </div>
                <div class="input-group mb-3" id='inputPostulante'>
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser}/></span>
                    <input type="text" class="form-control" placeholder="Apellido..." aria-label="Username" aria-describedby="basic-addon1" required/>
                </div>
                 
                <div class="input-group mb-3" id='inputPostulante'>
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faPassport}/></span>
                    <input type="number" class="form-control" placeholder="DNI (solo números)..." aria-label="Username" aria-describedby="basic-addon1" required/>
                </div>
                
                <div class="input-group mb-3" id='inputPostulante'>
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope}/></span>
                    <input type="text" class="form-control" placeholder="E-mail..." aria-label="Username" aria-describedby="basic-addon1" required/>
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
                        <input class="form-control" type="file" id="formFile" name='aval' required onChange={handleChangeAval} accept=".pdf" />
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
                        <input class="form-control" type="file" id="formFile" required  name='avalORI' onChange={handleChangeAvalORI} accept=".pdf"/>
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
                        <input class="form-control" type="file" id="formFile" required name='invitacion' onChange={handleChangeInvitacion} accept=".pdf"/>
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
                        <input class="form-control" type="file" id="formFile" required name='cv' onChange={handleChangeCV} accept=".pdf"/>
                    </div>
                </section>

                :''} 


                
                <section id='div-btns' class="btns-sumPostulante">
                    <button type='button' id='btn-submit1'><FontAwesomeIcon icon={faXmark} onClick={ocultar}/></button>
                    <button type="submit" id='btn-submit1' class='btn-submit1' ><FontAwesomeIcon icon={faCheck}/></button>
                </section>

            </form>  

        </Fragment>

    )
}