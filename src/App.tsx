import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Leetcode from './components/Leetcode'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/user/:uid' element={<Leetcode/>}/>
    </Routes>
  )
}

export default App
