import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../home/home'

export default function Ruteo() {
return(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
    
    </BrowserRouter>
)

}