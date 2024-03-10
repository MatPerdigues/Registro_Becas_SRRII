import { Fragment } from 'react';
import './postulantes.css';
import CardPostulantes from '../cardPsotulantes/cardPostulantes';
import { useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck,faXmark,faFileExcel} from '@fortawesome/free-solid-svg-icons'
import { useDownloadExcel } from 'react-export-table-to-excel';




export default function Postulantes() {

    let [respuesta,setRespuesta]=useState([]);
    let aval = localStorage.getItem('aval');
    let avalOri = localStorage.getItem('avalORI');
    let invitacion = localStorage.getItem('invitacion');
    let cv = localStorage.getItem('cv');
    let[nompostulante,setNompostulante] = useState(''); 
    let[idpostulante,setIdpostulante] = useState(''); 
    let resBorrarPostulante = '';
    let programa = localStorage.getItem('programa');
    let adminNivel = localStorage.getItem('adminNivel');


  


    
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
                "Authorization": `Bearer ${localStorage.getItem("token")}` 
              
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


        
        if(resBorrarPostulante.message==='jwt malformed'){

            alert('La sesión ha sido cerrada');
            window.location.href='../'
        }else{

            if(resBorrarPostulante==='Sesión expirada'){
                alert(resBorrarPostulante);
                window.location.href='../'
            } else{
                alert(resBorrarPostulante);
                document.getElementById('tarjetaEliminarPost').style.display='none';
                document.getElementById('contornoAdmin').style.display='none';
                window.location.reload();
            }
        }


    }

    const {onDownload} = useDownloadExcel({
        currentTableRef: document.getElementById('contenedorPostulantes'),
        filename: 'Postulantes',
        sheet: 'Postulantes'
    })
 

    return(
        <Fragment>
            <main>

            <section class='contornoAdmin' id='contornoAdmin'></section>

                <h4 class='tituloAdmins'>{programa}</h4>

                <div>
                    <table class='tablaAdmin' id='tablaPostulantes1' >
                        <tr>
                            <th class='datoAdmin' id='datoPostulante'>Nombre y apellido</th>
                            <th class='datoAdmin' id='datoPostulante'>DNI</th>
                            <th class='datoAdmin' id='datoPostulante'>Unidad Académica</th>
                            <th class='datoAdmin' id='datoPostulante'>Coreo electrónico</th>
                            <th class='datoAdmin' id='datoPostulante'>Registrado por</th>
                            <th class='datoAdmin' id='datoPostulante'>Fecha</th>

                            {aval==='true'?
                            <th class='datoAdmin' id='descargaAval'>Aval</th>
                            :''}
                            {avalOri==='true'?
                            
                            <th class='datoAdmin' id='descargaAvalOri'>Aval ORI</th>
                            :''}
                            {invitacion==='true'?
                            
                            <th class='datoAdmin' id='descargaInvitacion'>Invitación</th>
                            :''}
                            {cv==='true'?
                            
                            <th class='datoAdmin' id='descargaCv'>CV</th>
                            :''}

                            {adminNivel != 1?
                            <th class='datoAdmin' id='iconPostulantes'></th>
                            :''}
                            
                        </tr>
                    </table>
                </div>
                
                 <section class="contenedorPostulantes" id='contenedorPostulantes'>
                    {respuesta.map((datoMap)=>{                            
                        return <CardPostulantes key={datoMap.id} inData={datoMap} aval={aval} avalOri={avalOri} invitacion={invitacion} cv={cv} actualizarnombre={actualizarnombre}/>
                    })}
                </section>

                 <div class='divExcel'>
                    <button type="button" class="btn btn-success" id='excel' onClick={onDownload}><FontAwesomeIcon icon={faFileExcel} id='iconExcel'/></button>
                </div> 

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