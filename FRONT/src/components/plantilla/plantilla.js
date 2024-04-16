import { Fragment } from 'react';
import './plantilla.css';
import {useEffect,useState} from "react";
const API = process.env.REACT_APP_BACKEND_URL;


export default function Plantila (){

    let respuesta='';
    

    const [nombreProg, setNomProg] = useState('');


    const traerConvocatoria = async()=>{

        let programaId=sessionStorage.getItem('programaId');

        const form = JSON.stringify({
            "programaId":programaId,
            
        })

        //const response = await fetch('http://localhost:3200/traerConvocatoria',{
        const response = await fetch(API+"/traerConvocatoria",{
            method:"POST",
            body:form,
            headers:{
                'Content-Type':'application/json',
                //"Authorization": `Bearer ${sessionStorage.getItem("token")}` 
              
            }
        })

        .then((res)=>res.json())
        .then((data)=>{respuesta=data})
        .catch(error => alert("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));

     

        setNomProg(respuesta.nombre);


    }

    useEffect(()=>{
        traerConvocatoria();
            
    },[]) 

   



    return(
        <Fragment>
            <h4 class='h4Plantilla'>{nombreProg}</h4>
        </Fragment>
    )
}