import IMG from '../assits/mkdir.png'

export default function Navbar() {
  return (
    <div className="H10 BG_BLACK border-b text-white flex justify-between p-12">
        <div className="FLEX flex-col">
            <img src={IMG} alt="logo" className='size-10'/>
            <span>Codeblock</span>
        </div>
        <button>login</button>
    </div>
  )
}
