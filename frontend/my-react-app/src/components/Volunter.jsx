import Nav from "./Nav"
import { Link } from "react-router-dom"
const Volunteer = () => {

    return(
       
        <div id="campdiv">
             <Nav/>
              
              <div id="cvhead">
              <h1 id="ch1">Become A Volunteer!!!</h1>
              <h2 id="ch2">Volunteers do not necessarily have the time; they just have the heart</h2>
              
              <div>
                <img id="cimg" src="https://www.accessclinical.com/wp-content/uploads/2021/10/The-Cytomegalovirus-blood-donation-process-is-extremely-safe-at-Access-Clinical-scaled.jpg"/>
              </div>
              <p id="pcamp">Volunteering is an act of selflessness that transforms communities and touches lives. It is about stepping up to make a difference,
               driven not by obligation but by the genuine desire to help others. In a blood donation camp, volunteers are the heartbeat of the operation,
                providing vital support, comfort, and care to donors and ensuring the event runs smoothly. It takes courage to step out of your comfort zone, 
                to give your time and energy for the wellbeing of others. As a volunteer, you are not just offering a service; you are a beacon of hope and
                 compassion. Join us in this noble cause your presence can save lives and inspire others to do the same.
               Together, we can make a powerful impact and create a ripple effect of kindness and generosity. Be the change volunteer today.Join us at our 
               upcoming blood donation camps to save lives and make a difference in our community.<br/><br/>
               <Link to="/camp" ><button id="campbut">Look for blood donation camps</button></Link>
               </p><br/>
               </div>

               <div>
                <img id="limg" src="https://img.freepik.com/premium-vector/blood-donation-icon-design-blood-donor-volunteer-vector-design_22857-769.jpg"/>
                <h1 id="clast">Our work is possible because of people like you</h1>
            </div>
             
            <div id="feed">
                <br/>
           <h2 id="cparth">What Donors feel about Donating</h2>
            <div id="camppart">
                
                <div className="camppart-info">
                    <p className="part-text">"A life-changing experience. The staff was professional, and the process was smooth and easy.
                     I was impressed by how well everything was managed, from the registration to the donation process. Highly recommend participating!"</p>
                    <p className="part-auth">- Deepak kumar</p>
                </div>
                <div className="camppart-info">
                    <p className="part-text">"I was a first-time donor, and the camp made me feel at ease. The environment was friendly, and everything was well-explained, which helped alleviate my initial nervousness.
                     I'll definitely come back and encourage others to do the same!"</p>
                    <p className="part-auth">- Gayathri Shankar</p>
                </div>
                <div className="camppart-info">
                    <p className="part-text">"The camp was incredibly well-organized, and the atmosphere was amazing. I  felt great contributing to a noble cause. The staff's dedication 
                    and the camaraderie among participants made the experience unforgettable"</p>
                    <p className="part-auth">- Aranindh KA</p>
                </div>
                <div className="camppart-info">
                    <p className="part-text">"Volunteering at the camp was fulfilling. The team was supportive, and the entire event was a huge success. The enthusiasm and commitment of everyone involved were truly 
                    inspiring. Can't wait to join the next one!"</p>
                    <p className="part-auth">- Srimathi S</p>
                </div>
            </div>
            </div>

              </div>
    )
}
export default Volunteer