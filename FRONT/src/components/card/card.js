import './card.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass,faUserPlus} from '@fortawesome/free-solid-svg-icons'




export default function Card({info}) {

    let adminNivel = localStorage.getItem("adminNivel");
    
    
    const establecerPrograma=event=>{
        let programa = info.nombre;
        
        localStorage.setItem("programa",info.nombre);
        localStorage.setItem("aval",info.aval);
        localStorage.setItem("invitacion",info.invitacion);
        localStorage.setItem("cv",info.cv);
        localStorage.setItem("avalORI",info.avalORI);
        localStorage.setItem("nombreCorto",info.nombreCorto);
        localStorage.setItem("programaId",info.id);
        window.location.href='../formPostulante';

    }

        const buscarPostulante = ()=>{
            localStorage.setItem('programaId',info.id);
            localStorage.setItem("aval",info.aval);
            localStorage.setItem("invitacion",info.invitacion);
            localStorage.setItem("cv",info.cv);
            localStorage.setItem("avalORI",info.avalORI);
            localStorage.setItem("nombreCorto",info.nombreCorto);
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
                     <img src={info.imagen} alt='imagen Programa'/>
                 </div>
                 <div class="opcionesPrograma">

                {adminNivel != 1?
                    
                     <button type="button" id='sumPostulante' class="btn-admin" onClick={establecerPrograma}>
                        <FontAwesomeIcon icon={faUserPlus} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button>
                : ''}
                    <button type="button" id='buscarPostulante' class="btn-admin" onClick={buscarPostulante}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button>
                 </div>
             </section> 

             
            
             
           
        </Fragment>
    )
}