import { Fragment } from 'react';
import './postulantes.css';
import CardPostulantes from '../cardPsotulantes/cardPostulantes';
import { useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck,faXmark} from '@fortawesome/free-solid-svg-icons'



export default function Postulantes() {

    let [respuesta,setRespuesta]=useState([]);
    let aval = localStorage.getItem('aval');
    let avalOri = localStorage.getItem('avalORI');
    let invitacion = localStorage.getItem('invitacion');
    let cv = localStorage.getItem('cv');
    let[nompostulante,setNompostulante] = useState(''); 
    let[idpostulante,setIdpostulante] = useState(''); 
    let resBorrarPostulante = '';
  


    
    const traerPostulantes= async()=>{
        
        let programaId = localStorage.getItem('programaId');
        let facultad = localStorage.getItem('facultad');
        let adminNivel = localStorage.getItem('adminNivel')
        
        const form = JSON.stringify({
            "programaId":programaId,
            "facultad":facultad,
            "adminNivel":adminNivel
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


    const actualizarnombre = () => {
        setNompostulante(localStorage.getItem('nomPostulante'));
        setIdpostulante(localStorage.getItem('idPostulante'))
    }

    const cerrarCuadro = ()=>{
        document.getElementById('tarjetaEliminarPost').style.display='none';
        document.getElementById('contornoAdmin').style.display='none';
    }



     const borrarPostulante = async(event)=>{
        event.preventDefault();
        const form = JSON.stringify({
            "idPostulante":localStorage.getItem('idPostulante'),
            "nombreCorto":localStorage.getItem('nombreCorto'),
            "elimAval":localStorage.getItem('elimAval'),
            "elimAvalOri":localStorage.getItem('elimAvalOri'),
            "elimInvitacion":localStorage.getItem('elimInvitacion'),
            "elimCv":localStorage.getItem('elimCv')
        })

        const response = await fetch('http://localhost:3200/borrarPostulante',{
            method:"DELETE",
            body:form,
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}` 
              
            }
        })

        .then((res)=>res.json())
        .then((data)=>{resBorrarPostulante=data})

        alert(resBorrarPostulante)
       
        document.getElementById('tarjetaEliminarPost').style.display='none';
        document.getElementById('contornoAdmin').style.display='none';

        window.location.reload();
       
    }
 




    return(
        <Fragment>
            <main>

            <section class='contornoAdmin' id='contornoAdmin'></section>

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
                        return <CardPostulantes key={datoMap.id} inData={datoMap} aval={aval} avalOri={avalOri} invitacion={invitacion} cv={cv} actualizarnombre={actualizarnombre}/>
                    })}
                </section>

                <section class='tarjetaEliminar' id='tarjetaEliminarPost'>
                    <h5 class='h5Eliminar'>¿Seguro desea eliminar el registro de {nompostulante}?</h5>
                    <div id='div-btns'>
                        <button type='button' id='btnXPostulantes' onClick={cerrarCuadro}><FontAwesomeIcon icon={faXmark}/></button>
                        <button type="submit" class='btnEliminar' onClick={borrarPostulante}><FontAwesomeIcon icon={faCheck}/></button>
                    </div>
                </section>

            </main> 

        </Fragment>
    )
}