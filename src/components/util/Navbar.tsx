import { Link, Outlet } from 'react-router-dom'
import IMG from '../../assits/logo.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const {user, signOutUser} = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <div className="H10 BG_BLACK border-b text-white flex justify-between p-12 box-border">
          <Link className="FLEX flex-col" to='/'>
            <img src={IMG} alt="logo" className='size-28'/>
          </Link>
          <div className='flex'>
            {user && user.photoURL ? 
              <div className='FLEX'>
                <Link className="FLEX flex-col" to='/main'>
                  <img src={user.photoURL} alt="logo" className="size-10 circle-img" />
                  <span className='text-sm text-blue-400'>{user.displayName}</span>
                </Link> 
                <Link to='/' onClick={signOutUser} className='ml-6 text-red-400 p-1 rounded-md'>Logout</Link>
              </div>
              : 
              <Link to='/login'>Login</Link>
            }
          </div>
      </div>
      <Outlet/>
    </>
  )
}
