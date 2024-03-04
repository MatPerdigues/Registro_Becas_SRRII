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
        window.location.href='../';
    }

    return(
        <Fragment>



            <section class='containerLlave'> 
                <button type="button" id='btnLlave' class="btn-admin" ><FontAwesomeIcon icon={faBars} id='iconLlave'/>
                    <div class='roller'>
                        <div class='divIconRoller1'><FontAwesomeIcon icon={faUserTie}id='iconRoller1'/></div>
                        <div class='divIconRoller2' onClick={redirigir}><FontAwesomeIcon icon={faKey}id='iconRoller2'/></div>
                        <div class='divIconRoller3'  onClick={elimToken}><FontAwesomeIcon icon={faPowerOff} id='iconRoller3'/></div>
                            


                    </div>
                </button>
            </section>
          


            
        </Fragment>
    )

}