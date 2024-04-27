import { Fragment } from 'react';
import './postulantes.css';
import CardPostulantes from '../cardPsotulantes/cardPostulantes';
import { useState,useEffect,useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck,faXmark,faFileExcel} from '@fortawesome/free-solid-svg-icons'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const API = process.env.REACT_APP_BACKEND_URL;





export default function Postulantes() {

    const tableRef = useRef(null);
    let [respuesta,setRespuesta]=useState(false);
    let aval = sessionStorage.getItem('aval');
    let avalOri = sessionStorage.getItem('avalORI');
    let invitacion = sessionStorage.getItem('invitacion');
    let cv = sessionStorage.getItem('cv');
    let[nompostulante,setNompostulante] = useState(''); 
    let[idpostulante,setIdpostulante] = useState(''); 
    let resBorrarPostulante = '';
    let programa = sessionStorage.getItem('programa');
    let adminNivel = sessionStorage.getItem('adminNivel');
    let[errorCon,setErrorCon]=useState('');
/*     const [esconder, setEsconder] = useState(true);

    setTimeout(() => setEsconder(false), 1000); */



        
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
        .catch(error => setErrorCon("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));


        
        if(errorCon){
            alert(errorCon);
            window.location.href='../'
        }    
     }
     

     useEffect(()=>{
        //setTimeout(() => traerPostulantes(), 1000);
        traerPostulantes()
            
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
        .catch(error => setErrorCon("Ha fallado la conexión con el servidor. Intentelo nuevamente en unos instantes"));
        
        if(errorCon){
            alert(errorCon);
            window.location.href='../'
        }

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


/*     
     const {onDownload} = useDownloadExcel({
        currentTableRef: document.getElementById('contenedorPostulantes'),
        filename: 'Postulantes',
        sheet: 'Postulantes'
    })
     
 */




     
     return(
        <Fragment>
            <main>

           

            <section class='contornoAdmin' id='contornoAdmin'></section>

           
            {respuesta===false?
            <section class='contenedorSpinner' id='contenedorSpinner1'>
                <div class="spinner" id='spinner'></div>
                <div><h6 class='h6spinner'>Conectando...</h6></div>
             </section>
            :''}

            {respuesta?
                <h4 class='tituloAdmins' id='tituloPostulantes'>{programa}</h4>
            :''}


            {respuesta?

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

                            {adminNivel !== 1?
                            <th class='datoAdmin' id='iconPostulantes'></th>
                            :''}
                            
                        </tr>
                    </table>
                </div>

            :''}

             {respuesta? 
                
            <section class="contenedorPostulantes" id='contenedorPostulantes' ref={tableRef}>
                {respuesta.map((datoMap)=>{                            
                    return <CardPostulantes key={datoMap.id} inData={datoMap} aval={aval} avalOri={avalOri} invitacion={invitacion} cv={cv} actualizarnombre={actualizarnombre}/>
                })}
            </section>
            :''} 

            
            {respuesta?
            <div class='divExcel' id='divExcel'>
                 {/* <button type="button" class="btn btn-success" id='excel' onClick={onDownload}><FontAwesomeIcon icon={faFileExcel} id='iconExcel'/></button>  */}
                 <DownloadTableExcel filename="users table" sheet="users" currentTableRef={tableRef.current}>
                    <button type="button" class="btn btn-success" id='excel'><FontAwesomeIcon icon={faFileExcel} id='iconExcel'/></button> 
                </DownloadTableExcel>
               
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


