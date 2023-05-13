import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useAuthContext } from './hoooks/useAuthContext'
import { BrowserRouter} from 'react-router-dom'
import { Navigate } from 'react-router-dom'  //this is not useNavigate hook, this is just Navigate that is imported from react
import React from 'react'
//import pages and components
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login' 
import Navbar from './components/Navbar'  


export default function  App() {

  //we were able to destructure the authIsready because we can get that from our context and then do not forget that we returned that when we spread the state
const { authIsReady, user  } = useAuthContext()
return (
  <div className='app'>
    {/* the code below is saying that do not render the component unless firebase is ready so the displayName will show together with the rendering of the component  */}
    {authIsReady && (
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar/>}>
            <Route index path='/' element={user ? <Home/> : <Navigate replace to={"/login"}/>} />
            <Route path='/login'  element={!user ? <Login/>  : <Navigate replace to={"/"}/>} />
            <Route path='/signup' element={!user? <Signup/> : <Navigate replace to={"/"}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    )}
  </div>
)

}
