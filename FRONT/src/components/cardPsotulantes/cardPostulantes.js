import { Fragment, useState } from 'react';
import './cardPostulantes.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";
import FileDownload from "js-file-download";




export default function CardPostulantes({inData,aval,avalOri,invitacion,cv}) {

    let[respuesta,setRespuesta]=useState('');
    
    const download =async (e)=>{

        e.preventDefault();

        let archivo = ''
        
        if(e.currentTarget.id === 'descargaInvitacion'){
            archivo = `${inData.invitacion}`
        }

        if(e.currentTarget.id === 'descargaAval'){
            archivo = `${inData.aval}`
        }

        if(e.currentTarget.id === 'descargaAvalOri'){
            archivo = `${inData.avalORI}`
        }

        if(e.currentTarget.id === 'descargaCv'){
            archivo = `${inData.cv}`
        }


        localStorage.setItem('nomArchivo',archivo.split('/').pop())


        


        const form = JSON.stringify({
            "carpeta":localStorage.getItem('nombreCorto'),
            "archivo":localStorage.getItem('nomArchivo')
        })

/*         const response = await fetch('http://localhost:3200/descargar') */

        const response = await fetch('http://localhost:3200/descargar',{
            method:"POST",
            body:form,
            headers:{
                'Content-Type':'application/json',
                /*  "Authorization": `Bearer ${localStorage.getItem("token")}` */
              
            }
        })


        
        .then((res)=>res.blob())
        .then(data => {
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(data);
            a.download = localStorage.getItem('nomArchivo');
            a.click();
          });

        console.log(respuesta);
        

/* 
        Axios({
            url:"http://localhost:3200/descargar",
            
            method:'POST',
            body: form,

            responseType:"blob",
            })

        .then((res)=>{
            
            FileDownload(res.data,localStorage.getItem('nomArchivo'));
        }) */
    }
    
    

    return(
        <Fragment>

            <section class='contenedorCardPostulantes'>
                <section class='gridCardPostulantes'>
                    <h6 class='datoPostulante'>{inData.nombre+' '+inData.apellido}</h6>
                    <h6 class='datoPostulante'>{inData.dni}</h6>
                    <h6 class='datoPostulante'>{inData.facultad}</h6>
                    <h6 class='datoPostulante'>{inData.email}</h6>
                    <h6 class='datoPostulante'>{inData.gestor}</h6>
                    {aval==='true'?
                    <h6 class='datoPostulante' id='descargaAval' onClick={(e)=>download(e)}>Descargar</h6>
                    :''}
                    {avalOri==='true'?
                    <h6 class='datoPostulante' id='descargaAvalOri' onClick={(e)=>download(e)}>Descargar</h6>
                    :''}
                    {invitacion==='true'?
                    
                    <h6 class='datoPostulante' id='descargaInvitacion' onClick={(e)=>download(e)}>Descargar</h6>
                    
                    :''}
                    {cv==='true'?
                    <h6 class='datoPostulante' id='descargaCv' onClick={(e)=>download(e)}>Descargar</h6>
                    :''}
                    <span class='datoPsotulante' id='iconPostulane'><FontAwesomeIcon icon={faTrashCan} id='iconAdmin' /></span>
                </section>
             
            </section>
        </Fragment>
    )
}