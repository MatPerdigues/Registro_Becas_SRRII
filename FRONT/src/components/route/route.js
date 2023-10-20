import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../home/home';
import Admin_2 from '../admin_2/admin_2';
import Admin_1 from '../admin_1/admin_1';


export default function Ruteo() {
return(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/admin2' element={<Admin_2/>}></Route>
          <Route path='/admin1' element={<Admin_1/>}></Route>
        </Routes>
    
    </BrowserRouter>
)

}