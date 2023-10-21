import './admin_1.css';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus,faTrashCan,faPenToSquare,faMagnifyingGlass,faXmark,faCheck,faUserPlus} from '@fortawesome/free-solid-svg-icons'


export default function Admin_1() {

    let dato="";
    let baseClave='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?,;-_¡!¿*%&$/()[]{}|@><';
    let lengthClave=8;
    




    const mostrar=event=>{

        console.log(event.currentTarget.id)
        if(event.currentTarget.id==="btn-admin"){
            document.getElementById("form-info").style.display="block";
            document.getElementById("form-admin").style.display="none";
        }

        if(event.currentTarget.id==="btn-admin4"){
            document.getElementById("form-admin").style.display="block";
            document.getElementById("form-info").style.display="none";
        }
    }


    const ocultar=event=>{
        if(event.currentTarget.id==="btn-cerrar-info"){
            document.getElementById("form-info").style.display="none";
        }
        if(event.currentTarget.id==="btn-cerrar-admin"){
            document.getElementById("form-admin").style.display="none";
        }
    }



    const agregarAdmin = async(event)=>{

        let clave='';

        for(let x=0; x < lengthClave; x++){
            let random = Math.floor(Math.random() * baseClave.length);
            clave = clave + baseClave.charAt(random);
        }
        
        event.preventDefault();
        
        const formSumarAdmin = JSON.stringify({
            "nombre":event.target[0].value,
            "apellido":event.target[1].value,
            "unidad_academica":event.target[2].value,
            "nivel":event.target[3].value,
            "mail":event.target[4].value,
            "usuario":event.target[5].value,
            "password":clave
            //generarPassword()
        })
        
        const response = await fetch("http://localhost:3200/agregarAdmin",{
        method:"POST",
        body:formSumarAdmin,
        headers:{
           // "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
            'Content-Type':'application/json'
        }})

        .then((res)=>res.json())
        .then((data)=>{dato=data})

        alert(dato);

        
        document.getElementById("form-admin").reset();

        document.getElementById("form-admin").style.display="none";

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
                <button type="button" id='btn-admin4' class="btn-admin"  onClick={mostrar}>
                    <FontAwesomeIcon icon={faUserPlus} id='icon-login'/>
                    <span id='span-admin4'>Generar Admin</span>
                </button>
                
            </section>

            <form id='form-info'method='POST' class="form-programa" >
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


            <form id='form-admin'method='POST' class="form-admin" onSubmit={(event)=>{agregarAdmin(event)}}>
                <section id="sec1-form-info">
                    <p class='titulo-form-admin'>Ingrese los datos del nuevo administrador</p>
                    
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre...' name="nombre"/>
                    </div>
                    <div class="input-group mb-3" id='input-admin1'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Apellido...' name="apellido"/>
                    </div>
                    <div class="input-group">
                    <span class="input-group-text" ></span>
    
                        <select class="form-select" required>
                            <option selected value=''>Unidad académica...</option>
                            <option value="Agronomía">Agronomía</option>
                            <option value="Arquitectura, Diseño y Urbanismo">Arquitectura, Diseño y Urbanismo</option>
                            <option value="Ciencias Económicas">Ciencias Económicas</option>
                            <option value="Ciencias Exactas y Naturales">Ciencias Exactas y Naturales</option>
                            <option value="Ciencias Sociales">Ciencias Sociales</option>
                            <option value="Ciencias Veterinarias">Ciencias Veterinarias</option>
                            <option value="Derecho">Derecho</option>
                            <option value="Farmacia y Bioquímica">Farmacia y Bioquímica</option>
                            <option value="Filosofía y Letras">Filosofía y Letras</option>
                            <option value="Ingeniería">Ingeniería</option>
                            <option value="Medicina">Medicina</option>
                            <option value="Odontología">Odontología</option>
                            <option value="Psicología">Psicología</option>
                            <option value="Rectorado">Rectorado</option>
                        </select>
                    </div>
                    <div class="input-group" id='nivel'>
                        <span class="input-group-text" ></span>
                        <select class="form-select" required>
                            <option selected value=''>Nivel de administrador...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div class="input-group mb-3" id='email'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="email" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='E-mail...' name="email"/>
                    </div>
                    <div class="input-group mb-3" id='usuario'>
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nombre de usuario...' name="usuario"/>
                    </div>
                                       
                </section>                
                <div class='div-btns-info-admin'>
                    <button type='button' id='btn-cerrar-admin' class="btn-cerrar-info" onClick={ocultar}><FontAwesomeIcon icon={faXmark}/></button>
                    <button type="submit" id='btn-submit0' class="btn-submit"><FontAwesomeIcon icon={faCheck} /></button>
                </div>
            </form>

        </Fragment>

    )
}
