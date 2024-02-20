import { Fragment } from 'react';
import './administradores.css';
import { useState,useEffect } from 'react';
import CardAdmins from '../cardAdmins/cardAdmins';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark,faCheck} from '@fortawesome/free-solid-svg-icons'


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

        let adminNivel = localStorage.getItem('adminNivel')
        
        const form = JSON.stringify({
            "adminNivel":adminNivel
        })
        
        let programas= await fetch('http://localhost:3200/traerAdmins',{
            method:"POST",
            body:form,
            headers:{
                'Content-Type':'application/json',
                /* "Authorization": `Bearer ${localStorage.getItem("token")}` */
            }
        }
        
        )
        
        .then((res)=>res.json())
        .then(data=>{setConsulta(data)})
        .catch(error => console.log("Se ha producido un error... " +error));
            return programas;
        }


    useEffect(()=>{
        traerAdmins();
            
    },[])

    const actDatos = ()=>{
        setNombreAdmin(localStorage.getItem('adminNombre'))
        setApellidoAdmin(localStorage.getItem('adminApellido'))
        setFacultadAdmin(localStorage.getItem('adminFac'))
        
    }


    
    const borrarAdmin = async(event)=>{
        event.preventDefault();
        const form = JSON.stringify({
            "adminId":localStorage.getItem('adminId')
        })

        const response = await fetch('http://localhost:3200/borrarAdmin',{
            method:"DELETE",
            body:form,
            headers:{
                'Content-Type':'application/json',
                /* "Authorization": `Bearer ${localStorage.getItem("token")}` */
              
            }
        })

        .then((res)=>res.json())
        .then((data)=>{resBorrarAdmin=data})

        alert(resBorrarAdmin)
       
        document.getElementById('tarjetaEliminar').style.display='none';
        document.getElementById('contornoEliminar').style.display='none';

        window.location.reload();
       

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
                    
{/*                     <section class='subtituloAdmins'>
                        <div class='catAdmins'><h5>Nombre y apellido</h5></div>
                        <div class='catAdmins'><h5>Unidad Académica</h5></div>
                        <div class='catAdmins'><h5>Correo electrónico</h5></div>
                        <div class='catAdmins'><h5>Usuario</h5></div>
                        <div class='catAdmins' id='nivelAdmin'><h5>Nivel</h5></div>
                    </section> */}

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