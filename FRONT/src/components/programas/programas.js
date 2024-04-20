import './programas.css';
import { Fragment } from "react";
import Card from '../card/card';
import Llave from '../llave/llave';
import { useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark,faCheck} from '@fortawesome/free-solid-svg-icons';
const API = process.env.REACT_APP_BACKEND_URL;



export default function Programas() {

    const [esconder, setEsconder] = useState(true);
    setTimeout(() => setEsconder(false), 1000);
    let[errorCon,setErrorCon]=useState('');

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


    sessionStorage.setItem("aval",'true');
    sessionStorage.setItem("invitacion",'true');
    sessionStorage.setItem("cv",'true');
    sessionStorage.setItem("avalORI",'true');
    
    let [consulta,setConsulta]=useState('');
    
    
    const traerProgramas= async()=>{
        
        //let programas= await fetch('http://localhost:3200/traerProgramas')
        let programas= await fetch(API+'/traerProgramas')
        
        .then ((res)=>res.json())
        .then(data=>{setConsulta(data)})
        .catch(error => setErrorCon("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));

        
        
        if(errorCon){
            alert(errorCon);
            window.location.href='../'
        }   

    }


    useEffect(()=>{
        //setTimeout(() => traerProgramas(), 1000);
        traerProgramas();
    },[])

    
        


    const redirigirPass = ()=>{
        window.location.href='../pass'
    }

    
    
    return(

        <Fragment>

                <section class='contornoAdmin' id='contornoAdmin'></section>

                <Llave aplicarContorno={mostrar}/>
 
                {consulta==''? 
                <section class='contenedorSpinner' id='contenedorSpinner3'>
                    <div class="spinner" id='spinner'></div>
                    <div><h6 class='h6spinner'>Conectando...</h6></div>
                 </section>
                :''} 

                {consulta!=''?

                <section class="contenedorTarjetas">
                    {consulta.map((dato)=>{                            
                        return <Card key={dato.id} info={dato}/>
                    })}
                 </section>

                 :''}

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