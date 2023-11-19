import './programas.css';
import { Fragment } from "react";
import Card from '../card/card';
import { useState,useEffect} from 'react';



export default function Programas() {

    
        localStorage.setItem("aval",'true');
        localStorage.setItem("invitacion",'true');
        localStorage.setItem("cv",'true');
        localStorage.setItem("avalORI",'true');

    
    let [consulta,setConsulta]=useState([]);
    
    
    const traerProgramas= async()=>{
        
        let programas= await fetch('http://localhost:3200/traerProgramas')
        
        .then((res)=>res.json())
        .then(data=>{setConsulta(data)})
        .catch(error => console.log("Se ha producido un error... " +error));
            return programas;
        }


    useEffect(()=>{
        traerProgramas();
            
    },[])



    
    
    return(

        <Fragment>

            <section class="contenedorTarjetas">
                {consulta.map((dato)=>{                            
                    return <Card key={dato.id} info={dato}/>
                })}
             </section>

             
        </Fragment>

    )
}