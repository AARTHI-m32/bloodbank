import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const VolunteerForm = () => { 
  const { campId } = useParams();
  const userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        id: userId,
        fullName: '',
        dob: '',
        phoneNumber: '',
        email: '',
        role: '',
        agreement: false,
        camp: campId 
    });
  
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://bloodbank-exwj.onrender.com/add-volunteer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
              alert("Thank you for volunteering!!")
                console.log(result.message);
                window.location = "/volunter";
                
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('There was an error submitting the form', error);
        }
    };

    return (
      <div id="vform">
            <h2 id="vhead">Volunteer Registration</h2>
        <form onSubmit={handleSubmit}>
            <label className='Vlabel'>Full Name</label>
            <input id="vname" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required/><br/><br/>
            
            <label className='Vlabel'>Date of Birth</label>
            <input id="vdob" type="date" name="dob" value={formData.dob} onChange={handleChange} required/><br/><br/>
            
            <label className='Vlabel'>Phone Number</label>
            <input id="vphone" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/><br/><br/>
            
            <label className='Vlabel'>Email Address</label>
            <input id="vemail" type="email" name="email" value={formData.email} onChange={handleChange} required/><br/><br/>
            
            <label className='Vlabel' htmlFor="roles">Preferred Volunteer Roles:</label><br/>
            <input className='Vlabelr' type="radio" id="registration" name="role" value="registration" checked={formData.role === 'registration'} onChange={handleChange}/>
            <label  htmlFor="registration">Registration</label><br/>
            <input className='Vlabelr' type="radio" id="donor_assistance" name="role" value="donor_assistance" checked={formData.role === 'donor_assistance'} onChange={handleChange}/>
            <label  htmlFor="donor_assistance">Donor Assistance</label><br/>
            <input className='Vlabelr' type="radio" id="refreshments" name="role" value="refreshments" checked={formData.role === 'refreshments'} onChange={handleChange}/>
            <label  htmlFor="refreshments">Refreshments</label><br/>
            <input className='Vlabelr' type="radio" id="setup_cleanup" name="role" value="setup_cleanup" checked={formData.role === 'setup_cleanup'} onChange={handleChange}/>
            <label  htmlFor="setup_cleanup">Setup/Cleanup</label><br/><br/>
            <input className='Vlabel'type="checkbox" id="agreement" name="agreement" checked={formData.agreement} onChange={handleChange} required/>
            <label  htmlFor="agreement">I agree to adhere to the guidelines and responsibilities forth by the blood donation camp organizers.</label><br/><br/>
            
            <button id="volbut" type="submit">Volunteer</button><br/><br/>
        </form>
        </div>
    );
};

export default VolunteerForm;
