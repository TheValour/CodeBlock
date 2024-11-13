import ReactCountryFlag from "react-country-flag";
import {getCountryCode} from "../../constant/utilFuc"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

type RoomUserProps = {
  currUser: {
    name: string;
    ranking: string; 
    avatar: string; 
    username: string; 
    country: string | null;
    gitHub: string | null;
    twitter: string | null;
    linkedIN: string | null;
    website: string | null;
  };
}

const UserProfile: React.FC<RoomUserProps> = ({ currUser }) => {
  const response = getCountryCode(currUser.country || "India") || "IN"; 
  
  return (
    <div className="bg-blue-400 text-white w-1/4 FLEX flex-col">
      <div>
        <img src={currUser.avatar} alt={currUser.username} />         
        <span className="block w-full text-center font-bold text-xl">@ {currUser.username}</span>
      </div>
      <div>
        {currUser.country && 
          <span>           
            <ReactCountryFlag countryCode={response} />
          </span>
        }

        <span className="ml-2">{currUser.name}</span>
      </div>
      <div>
        <p className="w-full text-center text-blue-700 text-2xl">{currUser.ranking} </p>
        <p className="w-full text-center ">Overall Rating</p>
      </div>
      <div >
        {currUser.linkedIN && <a href={currUser.linkedIN} target="_blank">
          <FontAwesomeIcon icon={faLinkedinIn } className="bg-black"/>
        </a>}
        {currUser.gitHub && <a href={currUser.gitHub} target="_blank">
          <FontAwesomeIcon icon={faGithub } className="bg-black"/>
        </a>}
        {currUser.website && <a href={currUser.website} target="_blank">
          <FontAwesomeIcon icon={faGlobe} className="bg-black"/>
        </a>}
      </div>
      
    </div>
  )
}
export default UserProfile;
