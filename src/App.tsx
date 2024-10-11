import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Leetcode from './components/Leetcode'
import Navbar from './components/Navbar'

function App() {
  return (
    <div id='APP'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/:uid' element={<Leetcode/>}/>
      </Routes>
    </div>
  )
}

export default App
