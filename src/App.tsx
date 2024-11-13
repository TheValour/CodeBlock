import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Leetcode from './components/Leetcode'
import Navbar from './components/util/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Main from './components/room/Main'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div id='APP'>
      <Analytics/>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/user/:uid' element={<Leetcode/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App
