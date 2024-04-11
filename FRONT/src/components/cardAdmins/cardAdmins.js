import './cardAdmins.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'


export default function CardAdmins({info,idContorno,idTarjetaEliminar, actDatos}) {

    const storage  = () =>{

        document.getElementById(`${idContorno}`).style.display='block';

        document.getElementById(`${idTarjetaEliminar}`).style.display='block';



        sessionStorage.setItem('adminId',info.id);
        sessionStorage.setItem('adminFac',info.unidad_academica);
        sessionStorage.setItem('adminNombre',info.nombre);
        sessionStorage.setItem('adminApellido',info.apellido);

        actDatos()
    
    }

    return(
        
        <Fragment>


            <table class='tablaAdmin'>
                <tr class='trAdmin'>
                    <td class='datoAdmin'>{info.nombre} {info.apellido}</td>
                    <td class='datoAdmin'>{info.unidad_academica}</td>
                    <td class='datoAdmin'>{`${info.mail}`}</td>
                    <td class='datoAdmin'>{info.usuario}</td>
                    <td class='datoAdmin' id='datoNivel'>{info.nivel}</td>
                    <td class='datoAdmin' id='datoAccion'><FontAwesomeIcon icon={faTrashCan} id='iconAdmin' onClick={storage} /></td>
                </tr>
            </table>


        </Fragment>
    )

}