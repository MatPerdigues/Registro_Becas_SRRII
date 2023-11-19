import { Fragment } from 'react';
import './postulantes.css';
import CardPostulantes from '../cardPsotulantes/cardPostulantes';
import { useState,useEffect} from 'react';


export default function Postulantes() {

    let [respuesta,setRespuesta]=useState([]);

    
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

    console.log(respuesta);



    return(
        <Fragment>
            <main>

                <section class='gridPostulantes'> 
                    <div class='catPostulantes' id="nombrePostulante">Nombre y apellido</div>
                    <div class='catPostulantes' id="dniPostulante">DNI</div>
                    <div class='catPostulantes' id="facultadPostulante">Unidad Académica</div>  
                    <div class='catPostulantes' id="emilPostulante">Correo electrónico</div>
                    <div class='catPostulantes' id="gestorPostulante">Registrado por</div>
                    <div class='catPostulantes' id="iconPost"></div>
                </section>

               <section class="contenedorPostulantes">
                    {respuesta.map((datoMap)=>{                            
                        return <CardPostulantes key={datoMap.id} inData={datoMap}/>
                    })}
                </section>

            </main> 

        </Fragment>
    )
}