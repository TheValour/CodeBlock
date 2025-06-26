import { useState } from "react"
import { Link } from "react-router-dom"
import './Home.css'

function Home() {
  const [user, setUser] = useState('');

  return (
    <div id="HOME" className='w-screen H90 bg-slate-300 FLEX flex-col'>
      <div className="mb-16">
        <h1 className="text-3xl text-center font-bold"> <span className="text-green-600">Leetcode</span> Profile Viewer </h1>
        <h3>view the <span className="text-yellow-400">progress</span> of a user with the help of different data.</h3>
      </div>
      
      <div className="w-screen FLEX mb-16">
        <input type="text" 
          name="" id="" className='rounded-lg h-10 p-4 w-1/5 mr-6 text-gray-700 border-2 border-blue-800' 
          value={user} 
          onChange={e => setUser(e.target.value)}
          placeholder="Enter user Id"
          />
        <Link to={`/user/${user}`} className='bg-blue-900 w-20 h-10 py-4 px-6 rounded-md FLEX'>
          Find 
        </Link>
      </div>
      
      <div className="features">
        <span className="feature feature1">
          <h2 className="text-lg">🔍 Search User</h2>
          <p className="text-sm text-slate-300">find the leecode account details..</p>
        </span>
        <span className="feature feature2">
          <h2 className="text-lg">🔰 Sign up to save ID</h2>
          <p className="text-sm text-slate-300">can login to connect the LC accound and view the accound details </p>
        </span>
        <span className="feature feature3">
          <h2 className="text-lg">🖥️ Create Room</h2>
          <p className="text-sm text-slate-300">can create room and add friend's id's to see there progress </p>
        </span>
       </div>
    
       <a className=" absolute right-12 bottom-8 BORDERGREEN" href="https://github.com/TheValour" target="_blank"> by TheValour 🎃 ⟶</a>
    </div>
  )
}

export default Home
