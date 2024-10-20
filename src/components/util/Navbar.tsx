import { Link, Outlet } from 'react-router-dom'
import IMG from '../../assits/mkdir.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const {user, signOutUser} = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <div className="H10 BG_BLACK border-b text-white flex justify-between p-12 box-border">
          <Link className="FLEX flex-col" to='/'>
            <img src={IMG} alt="logo" className='size-10'/>
            <span>Codeblock</span>
          </Link>
          <div>
            {user ? <Link to='/main'>{user.displayName}</Link> :<Link to='/login'>login</Link>}
            {user && <Link to='/' onClick={signOutUser} className='ml-6'>Logout</Link>}
          </div>
      </div>
      <Outlet/>
    </>
  )
}
