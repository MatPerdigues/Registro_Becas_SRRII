import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../home/home';
import Admin_2 from '../admin_2/admin_2';
import Admin_1 from '../admin_1/admin_1';
import Programas from '../programas/programas';
import FormPostulante from '../formPostulante/formPostulante';
import Administradores from '../administradores/administradores';
import Postulantes from '../postulantes/postulantes';



export default function Ruteo() {
return(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/admin2' element={<Admin_2/>}></Route>
          <Route path='/admin1' element={<Admin_1/>}></Route>
          <Route path='/programas' element={<Programas/>}></Route>
          <Route path='/formPostulante' element={<FormPostulante/>}></Route>
          <Route path='/administradores' element={<Administradores/>}></Route>
          <Route path='/postulantes' element={<Postulantes/>}></Route>

        </Routes>
    
    </BrowserRouter>
)

}