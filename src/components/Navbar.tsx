import IMG from '../assits/mkdir.png'

export default function Navbar() {
  return (
    <div className="H10 BGGRAY text-white flex justify-between px-10">
        <div className="FLEX flex-col">
            <img src={IMG} alt="logo" className='size-10'/>
            <span>Codeblock</span>
        </div>
        <button>login</button>
    </div>
  )
}
