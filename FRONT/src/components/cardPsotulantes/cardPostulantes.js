import { Fragment } from 'react';
import './cardPostulantes.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'


export default function CardPostulantes({inData}) {
    
    
    
    return(
        <Fragment>

            <section class='contenedorCardPostulantes'>
                <section class='gridCardPostulantes'>
                    <h6 class='datoPostulante'>{inData.nombre+' '+inData.apellido}</h6>
                    <h6 class='datoPostulante'>{inData.dni}</h6>
                    <h6 class='datoPostulante'>{inData.facultad}</h6>
                    <h6 class='datoPostulante'>{inData.email}</h6>
                    <h6 class='datoPostulante'>{inData.gestor}</h6>
                    <span class='datoPsotulante' id='iconPostulane'><FontAwesomeIcon icon={faTrashCan} id='iconAdmin' /></span>
                </section>
             
            </section>
        </Fragment>
    )
}