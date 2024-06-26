import './card.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faUserPlus, faDownload} from '@fortawesome/free-solid-svg-icons';





export default function Card({info}) {

    let adminNivel = sessionStorage.getItem("adminNivel");
    let linkConvocatoria = info.convocatoria;
    let fechaDb = info.vencimiento
    let bloqueo = null;
    let fechaVto=new Date(fechaDb);
    let diaVto=fechaVto.getDate()
    fechaVto.setDate(diaVto+1);
    fechaVto.setHours(23);
    fechaVto.setMinutes(59);
    let ctrlBloqueo = new Date()
    if(ctrlBloqueo>fechaVto){
        bloqueo=true;
        
       
      
    }else{
        bloqueo=false;

       
    }
    
    
    const establecerPrograma=event=>{
        let programa = info.nombre;           
        sessionStorage.setItem("programa",info.nombre);
        sessionStorage.setItem("aval",info.aval);
        sessionStorage.setItem("invitacion",info.invitacion);
        sessionStorage.setItem("cv",info.cv);
        sessionStorage.setItem("avalORI",info.avalORI);
        sessionStorage.setItem("nombreCorto",info.nombreCorto);
        sessionStorage.setItem("programaId",info.id);
        window.location.href='../formPostulante';

    }

    const buscarPostulante = ()=>{ 

        
        
        sessionStorage.setItem("programa",info.nombre);
        sessionStorage.setItem('programaId',info.id);
        sessionStorage.setItem("aval",info.aval);
        sessionStorage.setItem("invitacion",info.invitacion);
        sessionStorage.setItem("cv",info.cv);
        sessionStorage.setItem("avalORI",info.avalORI);
        sessionStorage.setItem("nombreCorto",info.nombreCorto);
        window.location.href='../postulantes';
        
    }

        



    return(
        <Fragment>
           
             <section class="tarjeta">
                 <div class="nombrePrograma">
                     <h5>{info.nombre}</h5>
                 </div>
                 <div class="vtoPrograma">
                     <h6>Vencimiento SRRII: {info.vencimientoPublic}</h6>
                 </div>
                 <div class="imgPrograma">
                     <img id='imagenPrograma' src={info.imagen} alt='imagen Programa'/> 
                    
                 </div>
                 <div class="opcionesPrograma">

                {adminNivel != 1 && bloqueo===false?
                    
                     <button type="button" id='sumPostulante' class="btn-programa" onClick={establecerPrograma}>
                        <FontAwesomeIcon icon={faUserPlus} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button>
                : ''}
                    <button type="button" id='buscarPostulante' class="btn-programa" onClick={buscarPostulante}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button>
                    <a class='linkDescarga' href={linkConvocatoria}><button type="button" id='descConvocatoria' class="btn-programa">
                        <FontAwesomeIcon icon={faDownload} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button></a>
                 </div>
             </section> 

             
            
             
           
        </Fragment>
    )
}
