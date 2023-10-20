import './admin_1.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus,faTrashCan,faPenToSquare,faMagnifyingGlass,faXmark,faCheck} from '@fortawesome/free-solid-svg-icons'


export default function Admin_1() {


    const mostrar=event=>{

        console.log(event.currentTarget.id)
        if(event.currentTarget.id==="btn-admin"){
            document.getElementById("form-info").style.display="block";
        }
    }


    const ocultar=event=>{
        if(event.currentTarget.id==="btn-cerrar-info"){
            document.getElementById("form-info").style.display="none";
        }
    }




    return(

        <Fragment>

            <section id="sec-btn-admin">
                <button type="button" id='btn-admin' class="btn-admin" onClick={mostrar}>
                    <FontAwesomeIcon icon={faSquarePlus} id='icon-login'/>
                    <span id='span-admin'>Nuevo Programa</span>
                </button>
                <button type="button" id='btn-admin1' class="btn-admin" >
                    <FontAwesomeIcon icon={faTrashCan} id='icon-login'/>
                    <span id='span-admin'>Borrar Programa</span>
                </button>
                <button type="button" id='btn-admin2' class="btn-admin">
                    <FontAwesomeIcon icon={faPenToSquare} id='icon-login'/>
                    <span id='span-admin3'>Editar Programa</span>
                </button>
                <button type="button" id='btn-admin3' class="btn-admin">
                    <FontAwesomeIcon icon={faMagnifyingGlass} id='icon-login'/>
                    <span id='span-admin4'>Visualizar Registros</span>
                </button>
                
            </section>

            <form id='form-info'method='POST' class="form-programa">
                <section id="sec1-form-info">
                    <p class='titulo-form-admin'>Complete los datos del Programa</p>
                    
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre del Programa...' name="nombre"/>
                    </div>
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default">Vencimiento UBA</span>
                        <input type="date" required class="form-control" id='vtoUBA' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Vencimiento UBA...' name="nomCient"/>
                    </div>
                    
                    <div class="mb-3" id='file-form-info'>
                        <label for="formFile" class="form-label" id='label-formFile'>Imagen</label>
                        <input class="form-control" type="file" id="formFile" name='imagen' />
                    </div>                    
                </section>                
                <div class='div-btns-info'>
                    <button type='button' id='btn-cerrar-info' class="btn-cerrar-info" onClick={ocultar}><FontAwesomeIcon icon={faXmark}/></button>
                    <button type="submit" id='btn-submit0' class="btn-submit"><FontAwesomeIcon icon={faCheck} /></button>
                </div>
            </form>

        </Fragment>

    )
}
