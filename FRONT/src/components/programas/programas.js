import './programas.css';
import { Fragment } from "react";
import Card from '../card/card';
import { useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faIdCard,faEnvelope,faUser,faXmark,faCheck} from '@fortawesome/free-solid-svg-icons'


export default function Programas() {
    
    let [consulta,setConsulta]=useState([]);
    //let [respuesta,setRespuesta]=useState([]);
    let respuesta = "";
    
    
    const traerProgramas= async()=>{
        
        let programas= await fetch('http://localhost:3200/traerProgramas')
        
        .then((res)=>res.json())
        .then(data=>{setConsulta(data)})
        .catch(error => console.log("Se ha producido un error... " +error));
            return programas;
        }


    useEffect(()=>{
        traerProgramas();
        console.log(consulta)
    },[])


    const ocultar= event=>{
        document.getElementById("formSumarPostulante").style.display="none";
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

            <section class="contenedorTarjetas">
                {consulta.map((dato)=>{                            
                    return <Card key={dato.id} info={dato}/>
                })}
                
            </section>

            <form class="formSumarPostulante" id='formSumarPostulante' onSubmit={(event)=>{agregarPostulante(event)}}>
                <div>
                    <h4 id='titulo-login' class="h4Postulante">Complete la información del postulante</h4>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser}/></span>
                    <input type="text" class="form-control" placeholder="Nombre y apellido..." aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faIdCard}/></span>
                    <input type="number" class="form-control" placeholder="DNI (solo números)..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope}/></span>
                    <input type="text" class="form-control" placeholder="E-mail..." aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div id='div-btns' class="btns-sumPostulante">
                        <button type='button' id='btn-submit1'><FontAwesomeIcon icon={faXmark} onClick={ocultar}/></button>
                        <button type="submit" id='btn-submit'><FontAwesomeIcon icon={faCheck}/></button>
                    </div>
            </form>


           
            
        </Fragment>

    )
}