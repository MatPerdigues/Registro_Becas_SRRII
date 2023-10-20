import './admin_2.css';
import { Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus,faTrashCan,faPenToSquare,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'




export default function Admin_2() {
    return(
        <Fragment>

            <section id="sec-btn-admin">
                <button type="button" id='btn-admin' class="btn-admin">
                    <FontAwesomeIcon icon={faSquarePlus} id='icon-login'/>
                    <span id='span-admin'>Nuevo Registro</span>
                </button>
                <button type="button" id='btn-admin1' class="btn-admin" >
                    <FontAwesomeIcon icon={faTrashCan} id='icon-login'/>
                    <span id='span-admin'>Borrar Registro</span>
                </button>
                <button type="button" id='btn-admin2' class="btn-admin">
                    <FontAwesomeIcon icon={faPenToSquare} id='icon-login'/>
                    <span id='span-admin3'>Editar Registro</span>
                </button>
                <button type="button" id='btn-admin3' class="btn-admin">
                    <FontAwesomeIcon icon={faMagnifyingGlass} id='icon-login'/>
                    <span id='span-admin4'>Visualizar Registros</span>
                </button>
                
            </section>

        </Fragment>
    )
}
