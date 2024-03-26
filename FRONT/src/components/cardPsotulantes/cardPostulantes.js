import { Fragment} from 'react';
import './cardPostulantes.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan,faDownload} from '@fortawesome/free-solid-svg-icons'




export default function CardPostulantes({inData,aval,avalOri,invitacion,cv,actualizarnombre}) {
    
    let adminNivel = localStorage.getItem("adminNivel");

    

    let linkAval = inData.aval;
    let linkAvalOri = inData.avalORI;
    let linkInvitacion = inData.invitacion;
    let linkCv = inData.cv;

    const descarga = ()=>{
        
        console.log('funciona la funcion')
        
        
    }
    
    const elimPostulante = ()=>{
            let nomPostulante = inData.nombre;
            let apePostulante = inData.apellido;
            localStorage.setItem('idPostulante', inData.id);
            localStorage.setItem('nomPostulante', `${nomPostulante} ${apePostulante}`);
            localStorage.setItem('elimAval',inData.aval.split('/').pop());
            localStorage.setItem('elimAvalOri',inData.avalORI.split('/').pop());
            localStorage.setItem('elimInvitacion',inData.invitacion.split('/').pop());
            localStorage.setItem('elimCv',inData.cv.split('/').pop());
            actualizarnombre();
            document.getElementById('contornoAdmin').style.display='flex';
            document.getElementById('tarjetaEliminarPost').style.display='block';
          }
    

    return(
        <Fragment>

            <section class='contenedorCardPostulantes'>
               

                <table class='tablaAdmin' id='tablaPostulantes'>
                    <tr class='trAdmin'>
                        <td class='datoAdmin' id='datoPostulante'>{inData.nombre+' '+inData.apellido}</td>
                        <td class='datoAdmin' id='datoPostulante'>{inData.dni}</td>
                        <td class='datoAdmin' id='datoPostulante'>{inData.facultad}</td>
                        <td class='datoAdmin' id='datoPostulante'>{inData.email}</td>
                        <td class='datoAdmin' id='datoPostulante'>{inData.gestor}</td>
                        <td class='datoAdmin' id='datoPostulante'>{inData.fecha_registro}</td>

                        {aval==='true'?

                        

                        <td class='datoAdmin' id='descargaAval' ><a class='linkDescarga' href={linkAval} ><FontAwesomeIcon icon={faDownload} id='iconDescargaAval' onClick={descarga}/></a></td>
                        :''}

                        {avalOri==='true'?
                        <td class='datoAdmin' id='descargaAvalOri'><a class='linkDescarga' href={linkAvalOri} ><FontAwesomeIcon icon={faDownload} id='iconDescargaAvalOri'/></a></td>
                        :''}

                        {invitacion==='true'?
                        <td class='datoAdmin' id='descargaInvitacion'><a class='linkDescarga' href={linkInvitacion} ><FontAwesomeIcon icon={faDownload} id='iconDescargaInvitacion'/></a></td>
                        :''}

                        {cv==='true'?
                        <td class='datoAdmin' id='descargaCv'><a class='linkDescarga' href={linkCv} ><FontAwesomeIcon icon={faDownload} id='iconDescargaCv'/></a></td>
                        :''}

                        
                        {adminNivel!=1?
                        <td class='datoAdmin' id='iconPostulane'><FontAwesomeIcon icon={faTrashCan} id='iconAdmin' onClick={elimPostulante}/></td>
                        :''}


                    </tr>
                </table>
             
            </section>
        </Fragment>
    )

}