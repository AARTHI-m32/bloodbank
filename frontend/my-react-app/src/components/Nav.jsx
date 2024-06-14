import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) {
      setUserName(name);
    }
  }, []);

    return(
        <div id="divn">
       <span id="divnh">BloodBuddy</span>
       <div id="divnl">
         <Link to="/home" class="divna">Home</Link>  
         <Link to="/camp" class="divna">Volunteer</Link>     
         <Link to="/donor" class="divna">Need a Donor</Link>
         <Link to="/details" id="navspace" class="divna">Donation Records</Link>
         {/* <Link to="/profile"><button id="divnbut">(name)?Profile:name</button></Link> */}
         <Link to="/profile">
          <button id="divnbut">
            {userName ? userName : 'Profile'}
          </button>
        </Link>
       </div>
        </div>
    )
}
export default Nav;