import './programas.css';
import { Fragment } from "react";
import Card from '../card/card';
import Llave from '../llave/llave';
import { useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark,faCheck} from '@fortawesome/free-solid-svg-icons';
const API = process.env.REACT_APP_BACKEND_URL;



export default function Programas() {

    const aplicarContorno = ()=>{
        document.getElementById("contornoAdmin").style.display="flex";
    }

    const quitarContorno = ()=>{
        document.getElementById("contornoAdmin").style.display="none";
    }

    const mostrar = () =>{
        aplicarContorno();
        document.getElementById('tarjetaPass').style.display='block';
    }

    const ocultar = ()=>{
        quitarContorno();
        document.getElementById('tarjetaPass').style.display='none';

    }

    
        localStorage.setItem("aval",'true');
        localStorage.setItem("invitacion",'true');
        localStorage.setItem("cv",'true');
        localStorage.setItem("avalORI",'true');

    
    let [consulta,setConsulta]=useState([]);
    
    
    const traerProgramas= async()=>{
        
        //let programas= await fetch('http://localhost:3200/traerProgramas')
        let programas= await fetch(API+'/traerProgramas')
        
        .then((res)=>res.json())
        .then(data=>{setConsulta(data)})
        .catch(error => console.log("Se ha producido un error... " +error));
            return programas;
        }


    useEffect(()=>{
        traerProgramas();
            
    },[])


    const redirigirPass = ()=>{
        window.location.href='../pass'
    }

    
    
    return(

        <Fragment>

            <section class='contornoAdmin' id='contornoAdmin'></section>

            <Llave aplicarContorno={mostrar}/>

            <section class="contenedorTarjetas">
                {consulta.map((dato)=>{                            
                    return <Card key={dato.id} info={dato}/>
                })}
             </section>

             <section class='tarjetaEliminar' id='tarjetaPass'>
                <h5 class='h5Eliminar'>¿Desea actualizar su contraseña?</h5>
                <div id='div-btns'>
                    <button type='button' id='btn-XeliminarPrograma' onClick={ocultar}><FontAwesomeIcon icon={faXmark} /></button>
                    <button type="submit" class='btnEliminar' onClick={redirigirPass}><FontAwesomeIcon icon={faCheck} /></button>
                </div>
            </section>

             
        </Fragment>

    )
}