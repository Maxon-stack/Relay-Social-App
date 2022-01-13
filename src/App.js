import React, {useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Container/Home'
import {getUserInfo} from './utilityFunctions/getUserInfo'

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = getUserInfo();
    if(!user) navigate('/login')
  }, [])
  return (
    <Routes>
      <Route path = 'login' element={<Login/>}/>
      <Route path = '/*' element={<Home/>}/>

    </Routes>
  )
}

export default App
