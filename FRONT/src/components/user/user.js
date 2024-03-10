import { Fragment } from 'react';
import './user.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark,faUserTie} from '@fortawesome/free-solid-svg-icons';



export default function User(){

    let nombre= localStorage.getItem('nombre');
    let apellido= localStorage.getItem('apellido');
    let mail= localStorage.getItem('mail');
    let facultad = localStorage.getItem('facultad');
    let usuario = localStorage.getItem('gestor');



    return(
        <Fragment>
            <section class='tarjetaUser'>
                <section class='secSuperior'>
                    <div id='borderUser'><FontAwesomeIcon icon={faUserTie} id='iconUser'/></div>
                </section>
                <section class='secInferior'>
                    <table class='tablaUser'>
                        <tr>
                            <td class='datoUser1'>Nombre y Apellido</td>
                            <td class='datoUser'>{nombre} {apellido}</td>
                        </tr>
                        <tr>
                            <td class='datoUser1'>Unidad académica</td>                            
                            <td class='datoUser'>{facultad}</td>
                        </tr>
                        <tr>
                            <td class='datoUser1'>Nombre de usuario</td>
                            <td class='datoUser'>{usuario}</td>
                        </tr>
                        <tr>
                            <td class='datoUser1'>Correo electrónico</td>
                            <td class='datoUser'>{mail}</td>
                        </tr>
                    </table>
                </section>
            </section>


            
        </Fragment>
    )
}