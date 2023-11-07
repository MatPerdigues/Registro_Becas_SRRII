import './card.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan,faMagnifyingGlass,faUserPlus} from '@fortawesome/free-solid-svg-icons'




export default function Card({info}) {




    const establecerPrograma=event=>{
        let programa = info.nombre;
        
        

        localStorage.setItem("programa",info.nombre);
        localStorage.setItem("aval",info.aval);
        localStorage.setItem("invitacion",info.invitacion);
        localStorage.setItem("cv",info.cv);
        localStorage.setItem("avalORI",info.avalORI);
        localStorage.setItem("nombreCorto",info.nombreCorto);

       

        window.location.href='../formPostulante';

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
                     <button type="button" id='sumPostulante' class="btn-admin" onClick={establecerPrograma}>
                        <FontAwesomeIcon icon={faUserPlus} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button>
                    <button type="button" id='borrarPostulante' class="btn-admin" >
                        <FontAwesomeIcon icon={faTrashCan} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button>
                    <button type="button" id='buscarPostulante' class="btn-admin" >
                        <FontAwesomeIcon icon={faMagnifyingGlass} id='iconPostulante'/>
                        <span id='span-admin'></span>
                    </button>
                 </div>
             </section>

             
            
             
           
        </Fragment>
    )
}