import { Fragment } from 'react';
import './postulantes.css';
import CardPostulantes from '../cardPsotulantes/cardPostulantes';
import { useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck,faXmark,faFileExcel} from '@fortawesome/free-solid-svg-icons'
import { useDownloadExcel } from 'react-export-table-to-excel';
const API = process.env.REACT_APP_BACKEND_URL;




export default function Postulantes() {

    let [respuesta,setRespuesta]=useState([]);
    let aval = sessionStorage.getItem('aval');
    let avalOri = sessionStorage.getItem('avalORI');
    let invitacion = sessionStorage.getItem('invitacion');
    let cv = sessionStorage.getItem('cv');
    let[nompostulante,setNompostulante] = useState(''); 
    let[idpostulante,setIdpostulante] = useState(''); 
    let resBorrarPostulante = '';
    let programa = sessionStorage.getItem('programa');
    let adminNivel = sessionStorage.getItem('adminNivel');
    const [esconder, setEsconder] = useState(true);

    setTimeout(() => setEsconder(false), 1000);

    
     const traerPostulantes= async()=>{
        
        let programaId = sessionStorage.getItem('programaId');
        let facultad = sessionStorage.getItem('facultad');
        let adminNivel = sessionStorage.getItem('adminNivel')
        
        const form = JSON.stringify({
            "programaId":programaId,
            "facultad":facultad,
            "adminNivel":adminNivel
        })

        const response = await fetch(API+"/traerPostulantes",{
        //const response = await fetch("http://localhost:3200/traerPostulantes",{
            method:"POST",
            body:form,
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}` 
              
            }
        })

        .then((res)=>res.json())
        .then(data=>{setRespuesta(data)})
        .catch(error => alert("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));
    }
     



     useEffect(()=>{
        traerPostulantes();
            
    },[]) 




    const actualizarnombre = () => {
        setNompostulante(sessionStorage.getItem('nomPostulante'));
        setIdpostulante(sessionStorage.getItem('idPostulante'))
    }
        




    const cerrarCuadro = ()=>{
        document.getElementById('tarjetaEliminarPost').style.display='none';
        document.getElementById('contornoAdmin').style.display='none';
    }




     const borrarPostulante = async(event)=>{
        event.preventDefault();
        const form = JSON.stringify({
            "idPostulante":sessionStorage.getItem('idPostulante'),

        })

        const response = await fetch(API+'/borrarPostulante',{
        //const response = await fetch('http://localhost:3200/borrarPostulante',{
            method:"DELETE",
            body:form,
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}` 
              
            }
        })

        .then((res)=>res.json())
        .then((data)=>{resBorrarPostulante=data})
        .catch(error => alert("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));

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

           

            <section class='contenedorSpinner' id='contenedorSpinner'>
                <div class="spinner" id='spinner'></div>
                <div><h6 class='h6spinner'>Conectando, esto puede demorar hasta 60 segundos...</h6></div>
             </section>

            {esconder===false?
                <h4 class='tituloAdmins' id='tituloPostulantes'>{programa}</h4>
            :''}


            {esconder===false?

                <div>
                    <table class='tablaAdmin' id='tablaPostulantes1' >
                        <tr>
                            <th class='datoAdmin' id='datoPostulante'>Nombre y apellido</th>
                            <th class='datoAdmin' id='datoPostulante'>DNI</th>
                            <th class='datoAdmin' id='datoPostulante'>Unidad Académica</th>
                            <th class='datoAdmin' id='datoPostulante'>Coreo electrónico</th>
                            <th class='datoAdmin' id='datoPostulante'>Registrado por</th>
                            <th class='datoAdmin' id='datoPostulante'>Fecha</th>

                            {aval==='true' && esconder===false?
                            <th class='datoAdmin' id='descargaAval'>Aval</th>
                            :''}
                            {avalOri==='true' && esconder===false?
                            
                            <th class='datoAdmin' id='descargaAvalOri'>Aval ORI</th>
                            :''}
                            {invitacion==='true' && esconder===false?
                            
                            <th class='datoAdmin' id='descargaInvitacion'>Invitación</th>
                            :''}
                            {cv==='true' && esconder===false?
                            
                            <th class='datoAdmin' id='descargaCv'>CV</th>
                            :''}

                            {adminNivel !== 1 && esconder===false?
                            <th class='datoAdmin' id='iconPostulantes'></th>
                            :''}
                            
                        </tr>
                    </table>
                </div>

            :''}

            {esconder===false?
                
                 <section class="contenedorPostulantes" id='contenedorPostulantes'>
                    {respuesta.map((datoMap)=>{                            
                        return <CardPostulantes key={datoMap.id} inData={datoMap} aval={aval} avalOri={avalOri} invitacion={invitacion} cv={cv} actualizarnombre={actualizarnombre}/>
                    })}
                </section>
            :''}

            
            {esconder===false?
                 <div class='divExcel' id='divExcel'>
                    <button type="button" class="btn btn-success" id='excel' onClick={onDownload}><FontAwesomeIcon icon={faFileExcel} id='iconExcel'/></button>
                </div> 
            :''}

            

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


