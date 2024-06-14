import { Link } from "react-router-dom"
import Nav from "./Nav"
import { useState,useEffect } from "react";
const Home =() => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) {
      setUserName(name);
    }
  }, []);

  return(
    <div>
     
      <div id="divn">
       <span id="divnh">BloodBuddy</span>
       <div id="divnl">
         <Link to="/home" class="divna">Home</Link>
         {/* <a href="#h2div" class="divna">About Us</a> */}
         <Link to="/donor" class="divna">Need a Donor</Link>
         <Link to="/details" class="divna">Donation Records</Link>
         <Link to="/volunter" class="divna">Volunteer</Link>
         <Link to="/profile">
          <button id="divnbut">
            {userName ? userName : 'Profile'}
          </button>
        </Link>
       </div>
        </div>
    <div id="hdiv"> 
        <div id="pdiv">
            <p id="hp">In the pulse of every heartbeat lies the potential to save a life. With our blood donor app, be the lifeline someone desperately needs. Join us in the noble cause of giving.</p>
            <Link to="/login"><button class="hbut">Login</button></Link>
            <Link to="/register"><button class="hbut">SignUp</button></Link>
            
        </div>
        <img id="himg" src="./images/home1.png"></img>
    </div>
    <div id="h2div">
     <h2 style={{textAlign:"center"}}>Donation Process</h2>
     <h4 style={{textAlign:"center"}}>The steps involved in donation process from registering to donating blood</h4>
     <div id="h2p1">
      <div id="h2p11">
      <p>Registration</p>
        <img src="./images/pro1.png" class="h2img"></img>
        
      <p>Fill out a registration form with personal details.
Submit identification documents if required.
Provide accurate medical history information.
Receive confirmation of registration and donor ID.</p>
      </div>
     </div>

     <div id="h2p2">
      <div id="h2p11">
      <p>Health Screening</p>
        <img src="./images/pro2.avif" class="h2img"></img>
        
      <p>Answer health-related questions during a brief interview.
Undergo physical assessment by healthcare staff.
Check vital signs such as blood pressure and pulse.
Confirm eligibility based on health criteria.</p>
      </div>
     </div>

     <div id="h2p3">
      <div id="h2p11">
      <p>Donation Appointment</p>
        <img src="./images/pro3.jpg" class="h2img"></img>
        
      <p>Schedule an appointment online or by phone.
Choose a convenient time and location for donation.
Walk in during operating hours if preferred.
Arrive at the blood bank or donation center on time</p>
      </div>
     </div>

     <div id="h2p4">
      <div id="h2p11">
      <p>Donation  Process</p>
        <img src="./images/pro4.jpg" class="h2img"></img>
        
      <p>Relax in a comfortable donation area.
Clean the donation site on your arm.
Donate blood using sterile equipment.
Receive post-donation refreshments and rest.</p>
      </div>
     </div>
   
    </div>

   <div id="h3div">
    <p >Blood donation is a selfless act that saves lives. Every donation is a lifeline for those in need,<br/> providing hope and healing to patients facing medical challenges. Join us today.</p>
    <p style={{color:"white"}}>For Administrative queries : Blood Cell,National Health Mission,Ministry of Health & Family Welfare,New Delhi-110011.</p>
    <p style={{color:"white"}}>Email : bloodbuddy@gmaiil.com</p>
    <p style={{color:"white"}}>Contact Number : +91 9324232312</p>
     <p >&copy; 2024 BloodBuddy. All Rights Reserved.</p>
    </div> 
    </div>
  )
}
export default Home