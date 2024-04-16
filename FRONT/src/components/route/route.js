import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../home/home';
import Admin_2 from '../admin_2/admin_2';
import Admin_1 from '../admin_1/admin_1';
import Programas from '../programas/programas';
import FormPostulante from '../formPostulante/formPostulante';
import Administradores from '../administradores/administradores';
import Postulantes from '../postulantes/postulantes';
import Pass from '../formPass/formPass';
import User from '../user/user';
import RecPass from '../recPass/recPass';
import Plantila from '../plantilla/plantilla';

let log = sessionStorage.getItem('log');



export default function Ruteo() {


return(


    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          {log==='true'?
          <Route path='/' element={<Home/>}></Route>
          :''}
          {log==='true'?
          <Route path='/admin2' element={<Admin_2/>}></Route>
          :''}
          {log==='true'?
          <Route path='/admin1' element={<Admin_1/>}></Route>
          :''}
          {log==='true'?
          <Route path='/programas' element={<Programas/>}></Route>
          :''}
          {log==='true'?
          <Route path='/formPostulante' element={<FormPostulante/>}></Route>
          :''}
          {log==='true'?
          <Route path='/administradores' element={<Administradores/>}></Route>
          :''}
          {log==='true'?
          <Route path='/postulantes' element={<Postulantes/>}></Route>
          :''}
          {log==='true'?
          <Route path='/pass' element={<Pass/>}></Route>
          :''}
          {log==='true'?
          <Route path='/user' element={<User/>}></Route>
          :''}
          {log==='true'?
          <Route path='/convocatoria' element={<Plantila/>}></Route>
          :''}
          <Route path='/newPass' element={<RecPass/>}></Route>
      
      </Routes>
    </BrowserRouter>
          


       
      
          
     
  








      
          
  
     

   


 

   
      


)

}