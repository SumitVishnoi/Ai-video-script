import { Navigate, Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useContext } from "react"
import { UserDataContext } from "./context/UserContext"


function App() {
  const {userData} = useContext(UserDataContext)


  return (
   <div>
      <Routes>
        <Route path='/register' element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Register />)}/>
        <Route path='/login' element={userData ? (<Navigate to={location.state?.from || "/"}/>) : (<Login />)}/>
        
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login" state={{from: location.pathname}}/>}/>
      </Routes>
    
   </div>
  )
}

export default App
