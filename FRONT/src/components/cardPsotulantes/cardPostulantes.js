import { Fragment} from 'react';
import './cardPostulantes.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan,faDownload} from '@fortawesome/free-solid-svg-icons'




export default function CardPostulantes({inData,aval,avalOri,invitacion,cv,actualizarnombre}) {

    let adminNivel = localStorage.getItem("adminNivel");
    
    const download =async (e)=>{

        e.preventDefault();



        let archivo = ''
        
        if(e.currentTarget.id === 'descargaInvitacion'){
            archivo = `${inData.invitacion}`
        }

        if(e.currentTarget.id === 'descargaAval'){
            archivo = `${inData.aval}`
        }

        if(e.currentTarget.id === 'descargaAvalOri'){
            archivo = `${inData.avalORI}`
        }

        if(e.currentTarget.id === 'descargaCv'){
            archivo = `${inData.cv}`
        }


        localStorage.setItem('nomArchivo',archivo.split('/').pop())
   


        const form = JSON.stringify({
            "carpeta":localStorage.getItem('nombreCorto'),
            "archivo":localStorage.getItem('nomArchivo')
        })



        const response = await fetch('http://localhost:3200/descargar',{
            method:"POST",
            body:form,
            headers:{
                'Content-Type':'application/json',
                /*  "Authorization": `Bearer ${localStorage.getItem("token")}` */
              
            }
        })


        
        .then((res)=>res.blob())
        .then(data => {
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(data);
            a.download = localStorage.getItem('nomArchivo');
            a.click();
          })
        
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
                        <td class='datoAdmin' id='descargaAval' onClick={(e)=>download(e)}><FontAwesomeIcon icon={faDownload} id='iconDescargaAvalOri'/></td>
                        :''}

                        {avalOri==='true'?
                        <td class='datoAdmin' id='descargaAvalOri' onClick={(e)=>download(e)}><FontAwesomeIcon icon={faDownload} id='iconDescargaAvalOri'/></td>
                        :''}

                        {invitacion==='true'?
                        <td class='datoAdmin' id='descargaInvitacion' onClick={(e)=>download(e)}><FontAwesomeIcon icon={faDownload} id='iconDescargaInvitacion'/></td>
                        :''}

                        {cv==='true'?
                        <td class='datoAdmin' id='descargaCv' onClick={(e)=>download(e)}><FontAwesomeIcon icon={faDownload} id='iconDescargaCv'/></td>
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