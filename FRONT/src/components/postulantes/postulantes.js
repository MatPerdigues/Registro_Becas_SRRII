import { Fragment } from 'react';
import './postulantes.css';
import CardPostulantes from '../cardPsotulantes/cardPostulantes';
import { useState,useEffect} from 'react';
import Axios from "axios";
import FileDownload from "js-file-download";


export default function Postulantes() {

    let [respuesta,setRespuesta]=useState([]);
    let aval = localStorage.getItem('aval');
    let avalOri = localStorage.getItem('avalORI');
    let invitacion = localStorage.getItem('invitacion');
    let cv = localStorage.getItem('cv');


    
    const traerPostulantes= async()=>{
        
        let programaId = localStorage.getItem('programaId');
        let facultad = localStorage.getItem('facultad')
        
        const form = JSON.stringify({
            "programaId":programaId,
            "facultad":facultad
        })

        const response = await fetch('http://localhost:3200/traerPostulantes',{
            method:"POST",
            body:form,
            headers:{
                'Content-Type':'application/json',
                /* "Authorization": `Bearer ${localStorage.getItem("token")}` */
              
            }
        })


        
        .then((res)=>res.json())
        .then(data=>{setRespuesta(data)})
        .catch(error => console.log("Se ha producido un error... " +error));
           
        }

    useEffect(()=>{
        traerPostulantes();
            
    },[])




/*     const download =(e)=>{
        
        if(e.currentTarget.id==='descargaInvitacion'){

        }


        e.preventDefault();
        Axios({
            url:"http://localhost:3200/descargar",
            method:'GET',
            responseType:"blob"

        })

        .then((res)=>{
            
            FileDownload(res.data,"downloaded.pdf")
        })
    } */



    return(
        <Fragment>
            <main>

                <section class='gridPostulantes'> 
                    <div class='catPostulantes' id="nombrePostulante">Nombre y apellido</div>
                    <div class='catPostulantes' id="dniPostulante">DNI</div>
                    <div class='catPostulantes' id="facultadPostulante">Unidad Académica</div>  
                    <div class='catPostulantes' id="emilPostulante">Correo electrónico</div>
                    <div class='catPostulantes' id="gestorPostulante">Registrado por</div>
                    {aval==='true'?
                    <div class='catPostulantes' id="avalPostuñanye">Aval</div>
                    :''}
                    {avalOri==='true'?
                    <div class='catPostulantes' id="avalOri">Aval ORI</div>
                    :''}
                    {invitacion==='true'?
                    <div class='catPostulantes' id="invitacionPostulante">Invitación</div>
                    :''}
                    {cv==='true'?
                    <div class='catPostulantes' id="cvPostulante">CV</div>
                    :''}

                    <div class='catPostulantes' id="iconPost"></div>
                </section>

               <section class="contenedorPostulantes">
                    {respuesta.map((datoMap)=>{                            
                        return <CardPostulantes key={datoMap.id} inData={datoMap} aval={aval} avalOri={avalOri} invitacion={invitacion} cv={cv}/>
                    })}
                </section>

            </main> 

        </Fragment>
    )
}