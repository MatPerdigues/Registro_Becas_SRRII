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
    let [consulta,setConsulta]=useState('');
    const [esconder, setEsconder] = useState(true);
    setTimeout(() => setEsconder(false), 1000);
    let[errorCon,setErrorCon]=useState('');


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
        .catch(error => setErrorCon("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));
        
        if(errorCon){
            alert(errorCon);
            window.location.href='../'
        }
    
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
        .catch(error => alert("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));

        
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

                    {consulta==''?
                    <section class='contenedorSpinner' id='contenedorSpinner1'>
                        <div class="spinner" id='spinner'></div>
                        <div><h6 class='h6spinner'>Conectando...</h6></div>
                     </section>
                    :''}


                    
                
                    <section class='contornoEliminar' id='contornoEliminar'></section>
                    <section class='tarjetaEliminar' id='tarjetaEliminar'>
                        <h5 class='h5Eliminar'>¿Seguro desea eliminar a {nombreAdmin} {apellidoAdmin} como administrador/a de {facultadAdmin}?</h5>
                        <div id='div-btns'>
                            <button type='button' id='btn-submit1'><FontAwesomeIcon icon={faXmark} onClick={ocultar}/></button>
                            <button type="submit" class='btnEliminar'><FontAwesomeIcon icon={faCheck} onClick={borrarAdmin}/></button>
                        </div>
                    </section>

                                 
                    
                    {consulta!=''?

                    <table class='tablaAdmin' id='tablaCardAdmin'>
                        <tr>
                            <th class='thTablaAdmin' id='nomAdmin'>Nombre y Apellido</th>
                            <th class='thTablaAdmin' id='facAdmin'>Unidad Académica</th>
                            <th class='thTablaAdmin' id='mailAdmin'>Correo electrónico</th>
                            <th class='thTablaAdmin' id='usuarioAdmin'>Usuario</th>
                            <th class='thTablaAdmin' id='thNivel'>Nivel</th>
                            <th class='thTablaAdmin' id='thAccion'></th>
                        </tr>
                    </table>
                    :''}

                    
                    {consulta!=''?

                    <section class='mapAdmins'>
                        {consulta.map((dato)=>{   

                            if(dato.nivel > 0) {
                                return <CardAdmins key={dato.id} info={dato} idContorno={'contornoEliminar'} idTarjetaEliminar={'tarjetaEliminar'} actDatos={actDatos}/>
                        }
                        })}
                    </section>

                    :''}

                    
                
                </main>

            
        </Fragment>
    )
}