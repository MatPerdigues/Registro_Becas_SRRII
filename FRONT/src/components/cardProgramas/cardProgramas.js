import { Fragment } from 'react';
import './cardProgramas.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'


export default function CardProgramas({info,setEsconder,idTarjetaEliminar}) {

    const deletePrograma = ()=>{

        setEsconder(true);

        document.getElementById(`${idTarjetaEliminar}`).style.display='block';

        localStorage.setItem('programaId',info.id);

        localStorage.setItem('nombreCorto',info.nombreCorto);
       

    }



    return(
        <Fragment>
            <section class='datosProgramas'>
                <div id='nombreProgramaAdmin'>{info.nombre}</div>
                <div id='iconProgramaAdmin'><FontAwesomeIcon id='imgIconPrograma' icon={faTrashCan} onClick={deletePrograma}/></div>
            </section>
        </Fragment>
    )
}