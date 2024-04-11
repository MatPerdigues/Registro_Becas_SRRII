import { Fragment } from 'react';
import './administradores.css';
import { useState,useEffect } from 'react';
import CardAdmins from '../cardAdmins/cardAdmins';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark,faCheck} from '@fortawesome/free-solid-svg-icons'
const API = process.env.REACT_APP_BACKEND_URL; //Se define la url de los enpoints




export default function Administradores() {



    let [nombreAdmin,setNombreAdmin] = useState('');
    let [apellidoAdmin,setApellidoAdmin] = useState('');
    let [facultadAdmin, setFacultadAdmin] = useState('');

    let resBorrarAdmin='';


    let [consulta,setConsulta]=useState([]);

    const ocultar = ()=>{
        document.getElementById('tarjetaEliminar').style.display='none';
        document.getElementById('contornoEliminar').style.display='none';
    }
    
    
    const traerAdmins= async()=>{

        let adminNivel = sessionStorage.getItem('adminNivel')
        
        const form = JSON.stringify({
            "adminNivel":adminNivel
        })
        
        
            let programas= await fetch(API+"/traerAdmins",{
            //let programas= await fetch("http://localhost:3200/traerAdmins",{
          
            method:"POST",
            body:form,
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}` 
            }
        }
        
        )
        
        .then((res)=>res.json())
        .then(data=>{setConsulta(data)})
        .catch(error => console.log("Se ha producido un error... " +error));
    
    }


     useEffect(()=>{
        traerAdmins();
            
    },[]) 



    const actDatos = ()=>{
        setNombreAdmin(sessionStorage.getItem('adminNombre'))
        setApellidoAdmin(sessionStorage.getItem('adminApellido'))
        setFacultadAdmin(sessionStorage.getItem('adminFac'))
        
    }


    
    const borrarAdmin = async(event)=>{
        event.preventDefault();
        const form = JSON.stringify({
            "adminId":sessionStorage.getItem('adminId')
        })

        const response = await fetch(API+'/borrarAdmin',{
        //const response = await fetch('http://localhost:3200/borrarAdmin',{
            method:"DELETE",
            body:form,
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}` 
              
            }
        })

        .then((res)=>res.json())
        .then((data)=>{resBorrarAdmin=data})

        
        if(resBorrarAdmin.message==='jwt malformed'){

            alert('La sesión ha sido cerrada');
            window.location.href='../'
        }else{

            if(resBorrarAdmin==='Sesión expirada'){
                alert(resBorrarAdmin);
                window.location.href='../'
            } else{
                alert(resBorrarAdmin);
                document.getElementById('tarjetaEliminar').style.display='none';
                document.getElementById('contornoEliminar').style.display='none';
        
                window.location.reload();
                
            }
        }

    }




    return(
        <Fragment>
            <main>
                
                    <section class='contornoEliminar' id='contornoEliminar'></section>
                    <section class='tarjetaEliminar' id='tarjetaEliminar'>
                        <h5 class='h5Eliminar'>¿Seguro desea eliminar a {nombreAdmin} {apellidoAdmin} como administrador/a de {facultadAdmin}?</h5>
                        <div id='div-btns'>
                            <button type='button' id='btn-submit1'><FontAwesomeIcon icon={faXmark} onClick={ocultar}/></button>
                            <button type="submit" class='btnEliminar'><FontAwesomeIcon icon={faCheck} onClick={borrarAdmin}/></button>
                        </div>
                    </section>

                    <h4 class='tituloAdmins'>Seleccione el/la Administrador/a que desea eliminar</h4>
                    


                    <table class='tablaAdmin' id='tablaCardAdmin'>
                        <tr>
                            <th class='thTablaAdmin'>Nombre y Apellido</th>
                            <th class='thTablaAdmin'>Unidad Académica</th>
                            <th class='thTablaAdmin'>Correo electrónico</th>
                            <th class='thTablaAdmin'>Usuario</th>
                            <th class='thTablaAdmin' id='thNivel'>Nivel</th>
                            <th class='thTablaAdmin' id='thAccion'></th>
                        </tr>
                    </table>


                    <section class='mapAdmins'>
                        {consulta.map((dato)=>{   

                            if(dato.nivel > 0) {
                                return <CardAdmins key={dato.id} info={dato} idContorno={'contornoEliminar'} idTarjetaEliminar={'tarjetaEliminar'} actDatos={actDatos}/>
                        }
                        })}
                    </section>
                
            </main>
        </Fragment>
    )
}