import { useState } from "react"
import { Link } from "react-router-dom"

function Home() {
  const [user, setUser] = useState('');

  return (
    <div className='w-screen H90 bg-slate-300 FLEX'>
      <input type="text" 
        name="" id="" className='rounded-lg h-8 p-2' 
        value={user} 
        onChange={e => setUser(e.target.value)}
      />
    <Link to={`/user/${user}`} className='bg-green-500 h-8 p-2'>
      Go
    </Link>
    </div>
  )
}

export default Home
