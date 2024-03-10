import { Fragment } from 'react';
import './llave.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faKey,faUserTie,faPowerOff,faBars} from '@fortawesome/free-solid-svg-icons';



export default function Llave(){

    const redirigir = ()=>{
        window.location.href='../pass';
    }

 

    const elimToken = ()=>{
        localStorage.setItem('token',0);
        localStorage.removeItem("aval");
        localStorage.removeItem("programa");
        localStorage.removeItem("nombreCorto");
        localStorage.removeItem("adminId");
        localStorage.removeItem("gestor");
        localStorage.removeItem("adminFac");
        localStorage.removeItem("idPostulante");
        localStorage.removeItem("invitacion");
        localStorage.removeItem("nomPostulante");
        localStorage.removeItem("programaId");
        localStorage.removeItem("adminApellido");
        localStorage.removeItem("facultad");
        localStorage.removeItem("elimAvalOri");
        localStorage.removeItem("elimAval");
        localStorage.removeItem("adminNombre");
        localStorage.removeItem("cv");
        localStorage.removeItem("avalORI");
        localStorage.removeItem("elimInvitacion");
        localStorage.removeItem("nomArchivo");
        localStorage.removeItem("adminNivel");
        localStorage.removeItem("elimCv");
        localStorage.removeItem("nombre");
        localStorage.removeItem("apellido");
        localStorage.removeItem("mail");
        window.location.href='../';
    }

    const verUsuario = ()=>{
        window.location.href='../user';

    }

    return(
        <Fragment>



            <section class='containerLlave'> 
                <button type="button" id='btnLlave' class="btn-admin" ><FontAwesomeIcon icon={faBars} id='iconLlave'/>
                    <div class='roller'>
                        <div class='divIconRoller1' onClick={verUsuario}><FontAwesomeIcon icon={faUserTie}id='iconRoller1'/></div>
                        <div class='divIconRoller2' onClick={redirigir}><FontAwesomeIcon icon={faKey}id='iconRoller2'/></div>
                        <div class='divIconRoller3'  onClick={elimToken}><FontAwesomeIcon icon={faPowerOff} id='iconRoller3'/></div>
                        
                            


                    </div>
                </button>
            </section>
          


            
        </Fragment>
    )

}