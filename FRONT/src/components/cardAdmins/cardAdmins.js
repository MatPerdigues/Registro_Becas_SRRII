import './cardAdmins.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'


export default function CardAdmins({info,idContorno,idTarjetaEliminar, actDatos}) {

    const storage  = () =>{

        document.getElementById(`${idContorno}`).style.display='block';

        document.getElementById(`${idTarjetaEliminar}`).style.display='block';



        localStorage.setItem('adminId',info.id);
        localStorage.setItem('adminFac',info.unidad_academica);
        localStorage.setItem('adminNombre',info.nombre);
        localStorage.setItem('adminApellido',info.apellido);

        actDatos()
    
    }

    return(
        
        <Fragment>
            <section class='datosAdmin'>
                <h6 class='datoAdmin'>{info.nombre} {info.apellido}</h6>
                <h6 class='datoAdmin'>{info.unidad_academica}</h6>
                <h6 class='datoAdmin'>{`${info.mail}`}</h6>
                <h6 class='datoAdmin'>{info.usuario}</h6>
                <h6 class='datoAdmin' id='datoNivel'>{info.nivel}</h6>
                <span class='datoAdmin' id='datoAccion'><FontAwesomeIcon icon={faTrashCan} id='iconAdmin' onClick={storage} /></span>
            </section>


        </Fragment>
    )

}